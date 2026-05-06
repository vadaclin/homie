import { redirect, fail } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const actions = {
  default: async ({ request, cookies }) => {
    const code = (await request.formData()).get("code")?.toString().trim();
    if (!code) return fail(400, { error: "Bitte Code eingeben" });

    const db = await getDb();
    const haushalt = await db.collection("haushalte").findOne({ code });
    if (!haushalt) return fail(400, { error: "Kein Haushalt mit diesem Code gefunden" });

    cookies.set("haushalt", haushalt._id.toString(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    redirect(303, "/dashboard");
  },
};