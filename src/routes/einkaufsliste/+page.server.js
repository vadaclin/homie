import { getDb } from "$lib/db";
import { ObjectId } from "mongodb";

export async function load() {
    const db = await getDb();

    const items = await db
        .collection("einkaufsliste")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    return {
        items: items.map((item) => ({
            ...item,
            _id: item._id.toString()
        }))
    };
}

export const actions = {
    add: async ({ request }) => {
        const db = await getDb();
        const form = await request.formData();
        const name = form.get("name");

        if (!name) return;

        await db.collection("einkaufsliste").insertOne({
            name,
            done: false,
            createdAt: new Date()
        });
    },

    toggle: async ({ request }) => {
        const db = await getDb();
        const form = await request.formData();
        const id = form.get("id");

        const item = await db
            .collection("einkaufsliste")
            .findOne({ _id: new ObjectId(id) });

        if (!item) return;

        await db.collection("einkaufsliste").updateOne(
            { _id: new ObjectId(id) },
            { $set: { done: !item.done } }
        );
    },

    delete: async ({ request }) => {
        const db = await getDb();
        const form = await request.formData();
        const id = form.get("id");

        await db.collection("einkaufsliste").deleteOne({
            _id: new ObjectId(id)
        });
    }
};