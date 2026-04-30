import { redirect, fail } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";

const CODE_REGEX = /^\d{4}$/;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const code = data.get("code")?.toString().trim();

    if (!code || !CODE_REGEX.test(code)) {
      return fail(400, { error: "Code muss 4-stellig sein" });
    }

    const db = await getDb();
    const haushalt = await db.collection("haushalte").findOne({ code });

    if (!haushalt) {
      return fail(400, { error: "Dieser Code existiert nicht" });
    }

    cookies.set("haushalt", haushalt._id.toString(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    redirect(303, "/vorrat");
  },
};