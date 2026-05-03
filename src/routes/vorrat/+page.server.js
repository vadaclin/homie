import { fail, redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { getDb } from "$lib/server/db";

const COLLECTION = "vorrat";

function getHaushaltId(cookies) {
  const haushalt = cookies.get("haushalt");
  if (!haushalt) redirect(303, "/");
  return new ObjectId(haushalt);
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const haushaltId = getHaushaltId(cookies);
  const db = await getDb();

  const artikel = await db
    .collection(COLLECTION)
    .find({ haushaltId })
    .sort({ kategorie: 1, name: 1 })
    .toArray();

  return {
    artikel: artikel.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      menge: (parseInt(item.menge) || 0).toString(),
      kategorie: item.kategorie,
    })),
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  add: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    const data = await request.formData();
    const name = data.get("name")?.toString().trim();
    const menge = data.get("menge")?.toString().trim() ?? "0";
    const kategorie = data.get("kategorie")?.toString().trim();

    if (!name || !kategorie) {
      return fail(400, { error: "Name und Kategorie sind Pflicht." });
    }

    const db = await getDb();
    await db.collection(COLLECTION).insertOne({
      haushaltId,
      name,
      menge,
      kategorie,
      erstelltAm: new Date(),
    });

    return { success: true };
  },

  update: async ({ request, cookies }) => {
    getHaushaltId(cookies);
    const data = await request.formData();
    const id = data.get("id")?.toString();
    const name = data.get("name")?.toString().trim();
    const menge = data.get("menge")?.toString().trim() ?? "0";
    const kategorie = data.get("kategorie")?.toString().trim();

    if (!id || !name || !kategorie) {
      return fail(400, { error: "Name und Kategorie sind Pflicht." });
    }

    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, menge, kategorie } }
    );

    return { success: true };
  },

  updateMenge: async ({ request, cookies }) => {
    getHaushaltId(cookies);
    const data = await request.formData();
    const id = data.get("id")?.toString();
    const delta = parseInt(data.get("delta")?.toString() ?? "0");

    if (!id) return fail(400, { error: "Keine ID angegeben." });

    const db = await getDb();
    const item = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

    if (!item) return fail(404, { error: "Artikel nicht gefunden." });

    const neueMenge = (parseInt(item.menge) || 0) + delta;

    if (neueMenge <= 0) {
      await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
    } else {
      await db.collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { $set: { menge: neueMenge.toString() } }
      );
    }

    return { success: true };
  },

  delete: async ({ request, cookies }) => {
    getHaushaltId(cookies);
    const data = await request.formData();
    const id = data.get("id")?.toString();

    if (!id) return fail(400, { error: "Keine ID angegeben." });

    const db = await getDb();
    await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

    return { success: true };
  },
};