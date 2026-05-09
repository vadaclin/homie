import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { getDb } from "$lib/server/db";

export async function load({ cookies }) {
  const haushalt = cookies.get("haushalt");
  if (!haushalt) redirect(303, "/");

  const db = await getDb();
  const haushaltId = new ObjectId(haushalt);

  const haushaltDoc = await db.collection("haushalte").findOne({ _id: haushaltId });
  if (!haushaltDoc) redirect(303, "/");

  const [einkaufItems, baldLeer, todos] = await Promise.all([
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
      .toArray()
  ]);

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
    }))
  };
}

function getHaushaltId(cookies) {
  const haushalt = cookies.get("haushalt");
  return haushalt ? new ObjectId(haushalt) : null;
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
  },

  switchHousehold: async ({ cookies }) => {
    cookies.delete("haushalt", { path: "/" });
    cookies.delete("name", { path: "/" });
    redirect(303, "/");
  }
};