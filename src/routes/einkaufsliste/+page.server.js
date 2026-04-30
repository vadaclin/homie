import { getDb } from "$lib/server/db";
import { ObjectId } from "mongodb";

const COLLECTION = "einkaufsliste";

/** @returns {Promise<import('mongodb').Collection>} */
async function getCollection() {
  const db = await getDb();
  return db.collection(COLLECTION);
}

/** @param {string | null} id */
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
  const collection = await getCollection();

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

    if (!name) return;

    const collection = await getCollection();
    await collection.insertOne({ name, done: false, createdAt: new Date() });
  },

  toggle: async ({ request }) => {
    const form = await request.formData();
    const id = parseObjectId(form.get("id")?.toString());

    if (!id) return;

    const collection = await getCollection();
    const item = await collection.findOne({ _id: id });

    if (!item) return;

    await collection.updateOne({ _id: id }, { $set: { done: !item.done } });
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = parseObjectId(form.get("id")?.toString());

    if (!id) return;

    const collection = await getCollection();
    await collection.deleteOne({ _id: id });
  },
};