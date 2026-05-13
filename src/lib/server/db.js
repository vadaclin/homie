import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

let client;
let db;
let connecting;

export async function getDb() {
  if (db) return db;

  if (!connecting) {
    client = new MongoClient(MONGODB_URI);
    connecting = client.connect();
  }

  await connecting;

  db = client.db("homie");

  return db;
}