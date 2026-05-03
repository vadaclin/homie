import { getDb } from "$lib/server/db";
import { ObjectId } from "mongodb";

const COL_EINKAUF = "einkaufsliste";
const COL_VORRAT = "vorrat";

function parseObjectId(id) {
  try { return new ObjectId(id); }
  catch { return null; }
}

export async function load() {
  const db = await getDb();
  const items = await db.collection(COL_EINKAUF).find().sort({ createdAt: -1 }).toArray();
  return {
    items: items.map((item) => ({ ...item, _id: item._id.toString() })),
  };
}

export const actions = {
  add: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const kategorie = form.get("kategorie")?.toString().trim() ?? null;
    if (!name) return;

    const db = await getDb();
    await db.collection(COL_EINKAUF).insertOne({ name, done: false, kategorie, createdAt: new Date() });
  },

  toggle: async ({ request }) => {
    const id = parseObjectId((await request.formData()).get("id")?.toString());
    if (!id) return;

    const db = await getDb();
    const item = await db.collection(COL_EINKAUF).findOne({ _id: id });
    if (!item) return;

    await db.collection(COL_EINKAUF).updateOne({ _id: id }, { $set: { done: !item.done } });
  },

  delete: async ({ request }) => {
    const id = parseObjectId((await request.formData()).get("id")?.toString());
    if (!id) return;

    const db = await getDb();
    await db.collection(COL_EINKAUF).deleteOne({ _id: id });
  },

  addToVorrat: async ({ request, cookies }) => {
    const haushalt = cookies.get("haushalt");
    if (!haushalt) return;

    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const menge = parseInt(form.get("menge")?.toString() ?? "1");
    const kategorie = form.get("kategorie")?.toString().trim();
    const einkaufId = parseObjectId(form.get("einkaufId")?.toString());
    if (!name || !kategorie) return;

    const db = await getDb();
    const haushaltId = new ObjectId(haushalt);
    const existing = await db.collection(COL_VORRAT).findOne({
      haushaltId,
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existing) {
      const neueMenge = (parseInt(existing.menge) || 0) + menge;
      await db.collection(COL_VORRAT).updateOne(
        { _id: existing._id },
        { $set: { menge: neueMenge.toString() } }
      );
    } else {
      await db.collection(COL_VORRAT).insertOne({
        haushaltId,
        name,
        menge: menge.toString(),
        kategorie,
        erstelltAm: new Date(),
      });
    }

    if (einkaufId) await db.collection(COL_EINKAUF).deleteOne({ _id: einkaufId });
  },
};