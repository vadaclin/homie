import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { getDb } from "$lib/server/db";

const COL_WOCHENMENU = "wochenmenu";

const WEEK_DAYS = [
  { key: "mo", label: "Montag", short: "Mo" },
  { key: "di", label: "Dienstag", short: "Di" },
  { key: "mi", label: "Mittwoch", short: "Mi" },
  { key: "do", label: "Donnerstag", short: "Do" },
  { key: "fr", label: "Freitag", short: "Fr" },
  { key: "sa", label: "Samstag", short: "Sa" },
  { key: "so", label: "Sonntag", short: "So" }
];

function getHaushaltId(cookies) {
  const haushalt = cookies.get("haushalt");
  return haushalt ? new ObjectId(haushalt) : null;
}

function getISOWeekInfo(date = new Date()) {
  const current = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  const dayNumber = current.getUTCDay() || 7;
  current.setUTCDate(current.getUTCDate() + 4 - dayNumber);

  const isoYear = current.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const isoWeek = Math.ceil(((current - yearStart) / 86400000 + 1) / 7);

  const monday = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  const mondayDay = monday.getUTCDay() || 7;
  monday.setUTCDate(monday.getUTCDate() - mondayDay + 1);

  const days = WEEK_DAYS.map((day, index) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + index);

    return {
      ...day,
      date: d.toISOString().slice(0, 10),
      displayDate: d.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit"
      })
    };
  });

  return {
    isoYear,
    isoWeek,
    days
  };
}

function makeMealId() {
  return randomUUID();
}

function normalizeMeals(item) {
  if (Array.isArray(item?.meals)) {
    return item.meals
      .filter((meal) => meal?.text?.toString().trim())
      .map((meal) => ({
        id: meal.id?.toString() || makeMealId(),
        text: meal.text.toString()
      }));
  }

  if (item?.gericht?.toString().trim()) {
    return [
      {
        id: "main",
        text: item.gericht.toString()
      }
    ];
  }

  return [];
}

function isValidDayKey(dayKey) {
  return WEEK_DAYS.some((day) => day.key === dayKey);
}

export async function load({ cookies }) {
  const haushalt = cookies.get("haushalt");
  if (!haushalt) redirect(303, "/");

  const db = await getDb();
  const haushaltId = new ObjectId(haushalt);

  const haushaltDoc = await db.collection("haushalte").findOne({
    _id: haushaltId
  });

  if (!haushaltDoc) redirect(303, "/");

  const weekInfo = getISOWeekInfo();

  await db.collection(COL_WOCHENMENU).deleteMany({
    haushaltId,
    $or: [
      { isoYear: { $lt: weekInfo.isoYear } },
      {
        isoYear: weekInfo.isoYear,
        isoWeek: { $lt: weekInfo.isoWeek }
      }
    ]
  });

  const [einkaufItems, baldLeer, todos, wochenmenuItems] = await Promise.all([
    db
      .collection("einkaufsliste")
      .find({ haushaltId, done: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray(),

    db
      .collection("vorrat")
      .find({ haushaltId, menge: "1" })
      .sort({ name: 1 })
      .toArray(),

    db
      .collection("todos")
      .find({ haushaltId, done: false })
      .sort({ createdAt: -1 })
      .toArray(),

    db
      .collection(COL_WOCHENMENU)
      .find({
        haushaltId,
        isoYear: weekInfo.isoYear,
        isoWeek: weekInfo.isoWeek
      })
      .toArray()
  ]);

  const menuByDay = Object.fromEntries(
    wochenmenuItems.map((item) => [
      item.dayKey,
      {
        id: item._id.toString(),
        meals: normalizeMeals(item)
      }
    ])
  );

  return {
    haushaltsname: haushaltDoc.haushaltsname ?? "Haushalt",
    haushaltCode: haushaltDoc.code ?? "",
    isWG: haushaltDoc.isWG ?? false,
    name: cookies.get("name") ?? null,

    einkaufItems: einkaufItems.map((i) => ({
      id: i._id.toString(),
      name: i.name
    })),

    baldLeer: baldLeer.map((i) => ({
      id: i._id.toString(),
      name: i.name,
      kategorie: i.kategorie
    })),

    todos: todos.map((i) => ({
      id: i._id.toString(),
      text: i.text,
      done: i.done
    })),

    weekInfo: {
      isoYear: weekInfo.isoYear,
      isoWeek: weekInfo.isoWeek,
      days: weekInfo.days.map((day) => ({
        ...day,
        meals: menuByDay[day.key]?.meals ?? []
      }))
    }
  };
}

export const actions = {
  addTodo: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const text = (await request.formData()).get("text")?.toString().trim();
    if (!text) return;

    const db = await getDb();

    await db.collection("todos").insertOne({
      haushaltId,
      text,
      done: false,
      createdAt: new Date()
    });

    return { success: true };
  },

  toggleTodo: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const id = (await request.formData()).get("id")?.toString();
    if (!id) return;

    const db = await getDb();

    await db.collection("todos").deleteOne({
      _id: new ObjectId(id),
      haushaltId
    });

    return { success: true };
  },

  deleteTodo: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const id = (await request.formData()).get("id")?.toString();
    if (!id) return;

    const db = await getDb();

    await db.collection("todos").deleteOne({
      _id: new ObjectId(id),
      haushaltId
    });

    return { success: true };
  },

  saveMenuMeal: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const form = await request.formData();

    const dayKey = form.get("dayKey")?.toString().trim();
    const mealId = form.get("mealId")?.toString().trim();
    const date = form.get("date")?.toString().trim();
    const text = form.get("text")?.toString().trim() ?? "";
    const isoYear = parseInt(form.get("isoYear")?.toString() ?? "", 10);
    const isoWeek = parseInt(form.get("isoWeek")?.toString() ?? "", 10);

    if (!dayKey || !isValidDayKey(dayKey)) return;
    if (!mealId || !date || !isoYear || !isoWeek) return;

    const db = await getDb();

    const existing = await db.collection(COL_WOCHENMENU).findOne({
      haushaltId,
      isoYear,
      isoWeek,
      dayKey
    });

    let meals = normalizeMeals(existing);

    if (!text) {
      meals = meals.filter((meal) => meal.id !== mealId);
    } else {
      const index = meals.findIndex((meal) => meal.id === mealId);

      if (index >= 0) {
        meals[index] = {
          ...meals[index],
          text
        };
      } else {
        meals.push({
          id: mealId,
          text
        });
      }
    }

    if (meals.length === 0) {
      await db.collection(COL_WOCHENMENU).deleteOne({
        haushaltId,
        isoYear,
        isoWeek,
        dayKey
      });

      return { success: true, deleted: true };
    }

    await db.collection(COL_WOCHENMENU).updateOne(
      {
        haushaltId,
        isoYear,
        isoWeek,
        dayKey
      },
      {
        $set: {
          haushaltId,
          isoYear,
          isoWeek,
          dayKey,
          date,
          meals,
          updatedAt: new Date()
        },
        $unset: {
          gericht: ""
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    return { success: true };
  },

  deleteMenuMeal: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const form = await request.formData();

    const dayKey = form.get("dayKey")?.toString().trim();
    const mealId = form.get("mealId")?.toString().trim();
    const isoYear = parseInt(form.get("isoYear")?.toString() ?? "", 10);
    const isoWeek = parseInt(form.get("isoWeek")?.toString() ?? "", 10);

    if (!dayKey || !isValidDayKey(dayKey)) return;
    if (!mealId || !isoYear || !isoWeek) return;

    const db = await getDb();

    const existing = await db.collection(COL_WOCHENMENU).findOne({
      haushaltId,
      isoYear,
      isoWeek,
      dayKey
    });

    if (!existing) {
      return { success: true };
    }

    const meals = normalizeMeals(existing).filter((meal) => meal.id !== mealId);

    if (meals.length === 0) {
      await db.collection(COL_WOCHENMENU).deleteOne({
        haushaltId,
        isoYear,
        isoWeek,
        dayKey
      });

      return { success: true, deleted: true };
    }

    await db.collection(COL_WOCHENMENU).updateOne(
      {
        haushaltId,
        isoYear,
        isoWeek,
        dayKey
      },
      {
        $set: {
          meals,
          updatedAt: new Date()
        },
        $unset: {
          gericht: ""
        }
      }
    );

    return { success: true };
  },

  switchHousehold: async ({ cookies }) => {
    cookies.delete("haushalt", { path: "/" });
    cookies.delete("name", { path: "/" });

    redirect(303, "/");
  }
};