import { ObjectId } from "mongodb";
import { getDb } from "$lib/server/db";

export async function load({ cookies }) {
  const haushalt = cookies.get("haushalt");
  if (!haushalt) return { haushalt: null };

  const db = await getDb();
  const doc = await db.collection("haushalte").findOne({ _id: new ObjectId(haushalt) });

  return {
    haushalt,
    haushaltsname: doc?.haushaltsname ?? "Haushalt",
    haushaltCode: doc?.code ?? "????",
  };
}