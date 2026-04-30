import { fail, redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { getDb } from "$lib/server/db";

const COLLECTION = "vorrat";

/**
 * @param {import('@sveltejs/kit').Cookies} cookies
 * @returns {ObjectId | never}
 */
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
      menge: item.menge,
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
    const menge = data.get("menge")?.toString().trim() ?? "";
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
};