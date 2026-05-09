import { fail, redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { getDb } from "$lib/server/db";

const COLLECTION = "vorrat";

const KATEGORIEN = [
  "Lebensmittel",
  "Tiefkühler",
  "Getränke",
  "Haushalt",
  "Hygiene",
  "Sonstiges"
];

function getHaushaltId(cookies) {
  const haushalt = cookies.get("haushalt");
  if (!haushalt) redirect(303, "/");
  return new ObjectId(haushalt);
}

function istGueltigeKategorie(kategorie) {
  return KATEGORIEN.includes(kategorie);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sortiereArtikel(a, b) {
  const indexA = KATEGORIEN.indexOf(a.kategorie);
  const indexB = KATEGORIEN.indexOf(b.kategorie);

  if (indexA !== indexB) return indexA - indexB;

  return a.name.localeCompare(b.name, "de");
}

export async function load({ cookies }) {
  const haushaltId = getHaushaltId(cookies);
  const db = await getDb();

  const artikel = await db
    .collection(COLLECTION)
    .find({ haushaltId })
    .toArray();

  return {
    artikel: artikel
      .map((item) => ({
        id: item._id.toString(),
        name: item.name,
        menge: (parseInt(item.menge) || 0).toString(),
        kategorie: item.kategorie
      }))
      .sort(sortiereArtikel)
  };
}

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

    if (!istGueltigeKategorie(kategorie)) {
      return fail(400, { error: "Ungültige Kategorie." });
    }

    const neueMenge = parseInt(menge, 10) || 0;

    const db = await getDb();

    const existing = await db.collection(COLLECTION).findOne({
      haushaltId,
      name: { $regex: new RegExp(`^${escapeRegex(name)}$`, "i") }
    });

    if (existing) {
      const aktuelleMenge = parseInt(existing.menge, 10) || 0;
      const gesamtMenge = aktuelleMenge + neueMenge;

      await db.collection(COLLECTION).updateOne(
        {
          _id: existing._id,
          haushaltId
        },
        {
          $set: {
            menge: gesamtMenge.toString(),
            kategorie
          }
        }
      );

      return { success: true, merged: true };
    }

    await db.collection(COLLECTION).insertOne({
      haushaltId,
      name,
      menge: neueMenge.toString(),
      kategorie,
      erstelltAm: new Date()
    });

    return { success: true };
  },

  update: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    const data = await request.formData();

    const id = data.get("id")?.toString();
    const name = data.get("name")?.toString().trim();
    const menge = data.get("menge")?.toString().trim() ?? "0";
    const kategorie = data.get("kategorie")?.toString().trim();

    if (!id || !name || !kategorie) {
      return fail(400, { error: "Name und Kategorie sind Pflicht." });
    }

    if (!istGueltigeKategorie(kategorie)) {
      return fail(400, { error: "Ungültige Kategorie." });
    }

    const db = await getDb();

    await db.collection(COLLECTION).updateOne(
      {
        _id: new ObjectId(id),
        haushaltId
      },
      {
        $set: {
          name,
          menge,
          kategorie
        }
      }
    );

    return { success: true };
  },

  updateMenge: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    const data = await request.formData();

    const id = data.get("id")?.toString();
    const delta = parseInt(data.get("delta")?.toString() ?? "0");

    if (!id) {
      return fail(400, { error: "Keine ID angegeben." });
    }

    const db = await getDb();
    const oid = new ObjectId(id);

    const item = await db.collection(COLLECTION).findOne({
      _id: oid,
      haushaltId
    });

    if (!item) {
      return fail(404, { error: "Artikel nicht gefunden." });
    }

    const neueMenge = (parseInt(item.menge) || 0) + delta;

    if (neueMenge <= 0) {
      await db.collection(COLLECTION).deleteOne({
        _id: oid,
        haushaltId
      });
    } else {
      await db.collection(COLLECTION).updateOne(
        {
          _id: oid,
          haushaltId
        },
        {
          $set: {
            menge: neueMenge.toString()
          }
        }
      );
    }

    return { success: true };
  },

  delete: async ({ request, cookies }) => {
    const haushaltId = getHaushaltId(cookies);
    const id = (await request.formData()).get("id")?.toString();

    if (!id) {
      return fail(400, { error: "Keine ID angegeben." });
    }

    const db = await getDb();

    await db.collection(COLLECTION).deleteOne({
      _id: new ObjectId(id),
      haushaltId
    });

    return { success: true };
  }
};