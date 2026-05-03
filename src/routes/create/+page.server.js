import { redirect, fail } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";

const CODE_REGEX = /^\d{4}$/;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const code = data.get("code")?.toString().trim();
    const haushaltsname = data.get("haushaltsname")?.toString().trim();
    const isWG = data.get("isWG") === "true";

    if (!code || !CODE_REGEX.test(code)) {
      return fail(400, { error: "Code muss 4-stellig sein" });
    }
    if (!haushaltsname) {
      return fail(400, { error: "Bitte gib einen Haushaltsnamen ein" });
    }

    const db = await getDb();
    const haushalte = db.collection("haushalte");
    const codeExists = await haushalte.findOne({ code });
    if (codeExists) {
      return fail(400, { error: "Dieser Code existiert bereits" });
    }

    const { insertedId } = await haushalte.insertOne({
      code,
      haushaltsname,
      isWG,
      erstelltAm: new Date(),
    });

    cookies.set("haushalt", insertedId.toString(), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    redirect(303, "/dashboard");
  },
};