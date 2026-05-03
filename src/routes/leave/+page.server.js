import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete("haushalt", { path: "/" });
    cookies.delete("name", { path: "/" });
    redirect(303, "/");
  },
};