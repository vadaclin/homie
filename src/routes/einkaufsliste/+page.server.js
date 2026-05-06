import { redirect } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";
import { ObjectId } from "mongodb";

const COL_EINKAUF = "einkaufsliste";
const COL_VORRAT = "vorrat";

function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

function getHaushaltId(cookies) {
  const haushalt = cookies.get("haushalt");
  return haushalt ? parseObjectId(haushalt) : null;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function load({ cookies }) {
  const haushaltId = getHaushaltId(cookies);
  if (!haushaltId) redirect(303, "/");

  const db = await getDb();

  const items = await db
    .collection(COL_EINKAUF)
    .find({ haushaltId })
    .sort({ createdAt: -1 })
    .toArray();

  return {
    items: items.map((item) => ({
      ...item,
      _id: item._id.toString(),
      haushaltId: item.haushaltId?.toString?.() ?? null,
    })),
  };
}

export const actions = {
  add: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const kategorie = form.get("kategorie")?.toString().trim() || null;

    if (!name) return;

    const db = await getDb();

    await db.collection(COL_EINKAUF).insertOne({
      haushaltId,
      name,
      done: false,
      kategorie,
      createdAt: new Date(),
    });
  },

  toggle: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const form = await request.formData();
    const id = parseObjectId(form.get("id")?.toString());

    if (!id) return;

    const db = await getDb();

    const item = await db.collection(COL_EINKAUF).findOne({
      _id: id,
      haushaltId,
    });

    if (!item) return;

    await db.collection(COL_EINKAUF).updateOne(
      { _id: id, haushaltId },
      { $set: { done: !item.done } }
    );
  },

  delete: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const form = await request.formData();
    const id = parseObjectId(form.get("id")?.toString());

    if (!id) return;

    const db = await getDb();

    await db.collection(COL_EINKAUF).deleteOne({
      _id: id,
      haushaltId,
    });
  },

  addToVorrat: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    if (!haushaltId) return;

    const form = await request.formData();

    const name = form.get("name")?.toString().trim();
    const menge = parseInt(form.get("menge")?.toString() ?? "1", 10);
    const kategorie = form.get("kategorie")?.toString().trim();
    const einkaufId = parseObjectId(form.get("einkaufId")?.toString());

    if (!name || !kategorie) return;

    const db = await getDb();

    const existing = await db.collection(COL_VORRAT).findOne({
      haushaltId,
      name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") },
    });

    if (existing) {
      const neueMenge = (parseInt(existing.menge, 10) || 0) + menge;

      await db.collection(COL_VORRAT).updateOne(
        { _id: existing._id, haushaltId },
        {
          $set: {
            menge: neueMenge.toString(),
            kategorie,
          },
        }
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

    if (einkaufId) {
      await db.collection(COL_EINKAUF).deleteOne({
        _id: einkaufId,
        haushaltId,
      });
    }
  },
};