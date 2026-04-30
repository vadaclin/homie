/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
  return {
    haushalt: cookies.get("haushalt") ?? null,
  };
}