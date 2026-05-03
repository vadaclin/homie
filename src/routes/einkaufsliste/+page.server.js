import { getDb } from "$lib/server/db";
import { ObjectId } from "mongodb";

const COLLECTION_EINKAUF = "einkaufsliste";
const COLLECTION_VORRAT = "vorrat";

async function getEinkaufCollection() {
  const db = await getDb();
  return db.collection(COLLECTION_EINKAUF);
}

function parseObjectId(id) {
  if (!id) return null;
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const collection = await getEinkaufCollection();
  const items = await collection.find().sort({ createdAt: -1 }).toArray();
  return {
    items: items.map((item) => ({
      ...item,
      _id: item._id.toString(),
    })),
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  add: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const kategorie = form.get("kategorie")?.toString().trim() ?? null;
    if (!name) return;
    const collection = await getEinkaufCollection();
    await collection.insertOne({ name, done: false, kategorie, createdAt: new Date() });
  },

  toggle: async ({ request }) => {
    const form = await request.formData();
    const id = parseObjectId(form.get("id")?.toString());
    if (!id) return;
    const collection = await getEinkaufCollection();
    const item = await collection.findOne({ _id: id });
    if (!item) return;
    await collection.updateOne({ _id: id }, { $set: { done: !item.done } });
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = parseObjectId(form.get("id")?.toString());
    if (!id) return;
    const collection = await getEinkaufCollection();
    await collection.deleteOne({ _id: id });
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

    const existing = await db.collection(COLLECTION_VORRAT).findOne({
      haushaltId,
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existing) {
      const neueMenge = (parseInt(existing.menge) || 0) + menge;
      await db.collection(COLLECTION_VORRAT).updateOne(
        { _id: existing._id },
        { $set: { menge: neueMenge.toString() } }
      );
    } else {
      await db.collection(COLLECTION_VORRAT).insertOne({
        haushaltId,
        name,
        menge: menge.toString(),
        kategorie,
        erstelltAm: new Date(),
      });
    }

    if (einkaufId) {
      await db.collection(COLLECTION_EINKAUF).deleteOne({ _id: einkaufId });
    }
  },
};