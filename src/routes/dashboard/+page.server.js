import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { getDb } from "$lib/server/db";

export async function load({ cookies }) {
    const haushalt = cookies.get("haushalt");

    if (!haushalt) {
        redirect(303, "/");
    }

    const db = await getDb();

    const haushaltId = new ObjectId(haushalt);

    const haushaltDoc = await db.collection("haushalte").findOne({
        _id: haushaltId,
    });

    if (!haushaltDoc) {
        redirect(303, "/");
    }

    const name = cookies.get("name") ?? null;

    const einkaufItems = await db
        .collection("einkaufsliste")
        .find({
            haushaltId,
            done: false,
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();

    const baldLeer = await db
        .collection("vorrat")
        .find({
            haushaltId,
            menge: "1",
        })
        .sort({ name: 1 })
        .toArray();

    const todos = await db
        .collection("todos")
        .find({ haushaltId })
        .sort({ createdAt: -1 })
        .toArray();

    return {
        haushaltsname: haushaltDoc.haushaltsname ?? "Haushalt",
        haushaltCode: haushaltDoc.code ?? "",
        isWG: haushaltDoc.isWG ?? false,
        name,

        einkaufItems: einkaufItems.map((i) => ({
            id: i._id.toString(),
            name: i.name,
        })),

        baldLeer: baldLeer.map((i) => ({
            id: i._id.toString(),
            name: i.name,
            kategorie: i.kategorie,
        })),

        todos: todos.map((i) => ({
            id: i._id.toString(),
            text: i.text,
            done: i.done,
        })),
    };
}

export const actions = {
    addTodo: async ({ request, cookies }) => {
        const haushalt = cookies.get("haushalt");

        if (!haushalt) {
            return;
        }

        const form = await request.formData();
        const text = form.get("text")?.toString().trim();

        if (!text) {
            return;
        }

        const db = await getDb();

        await db.collection("todos").insertOne({
            haushaltId: new ObjectId(haushalt),
            text,
            done: false,
            createdAt: new Date(),
        });
    },

    toggleTodo: async ({ request, cookies }) => {
        const haushalt = cookies.get("haushalt");

        if (!haushalt) {
            return;
        }

        const form = await request.formData();
        const id = form.get("id")?.toString();

        if (!id) {
            return;
        }

        const db = await getDb();

        const todo = await db.collection("todos").findOne({
            _id: new ObjectId(id),
            haushaltId: new ObjectId(haushalt),
        });

        if (!todo) {
            return;
        }

        await db.collection("todos").updateOne(
            {
                _id: new ObjectId(id),
                haushaltId: new ObjectId(haushalt),
            },
            {
                $set: {
                    done: !todo.done,
                },
            },
        );
    },

    deleteTodo: async ({ request, cookies }) => {
        const haushalt = cookies.get("haushalt");

        if (!haushalt) {
            return;
        }

        const form = await request.formData();
        const id = form.get("id")?.toString();

        if (!id) {
            return;
        }

        const db = await getDb();

        await db.collection("todos").deleteOne({
            _id: new ObjectId(id),
            haushaltId: new ObjectId(haushalt),
        });
    },

    switchHousehold: async ({ cookies }) => {
        cookies.delete("haushalt", { path: "/" });
        cookies.delete("name", { path: "/" });

        redirect(303, "/");
    },
};