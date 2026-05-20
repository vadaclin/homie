import { json } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";

const CODE_REGEX = /^\d{4}$/;

export async function GET({ url }) {
  const code = url.searchParams.get("code")?.trim();

  if (!code || !CODE_REGEX.test(code)) {
    return json({ exists: false });
  }

  const db = await getDb();
  const exists = await db.collection("haushalte").findOne({ code }, { projection: { _id: 1 } });

  return json({ exists: Boolean(exists) });
}
