import { getDb } from '$lib/db.js';

export async function load() {
  const db = await getDb();
  const artikel = await db.collection('vorrat').find().toArray();
  return {
    artikel: JSON.parse(JSON.stringify(artikel))
  };
}

export const actions = {
  hinzufuegen: async ({ request }) => {
    const db = await getDb();
    const data = await request.formData();
    await db.collection('vorrat').insertOne({
      name: data.get('name'),
      menge: Number(data.get('menge')),
      einheit: data.get('einheit'),
      kategorie: data.get('kategorie'),
      fuellstand: Number(data.get('fuellstand'))
    });
  },

  loeschen: async ({ request }) => {
    const { ObjectId } = await import('mongodb');
    const db = await getDb();
    const data = await request.formData();
    await db.collection('vorrat').deleteOne({ _id: new ObjectId(data.get('id')) });
  }
};