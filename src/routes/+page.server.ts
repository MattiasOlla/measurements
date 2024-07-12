import * as db from "$lib/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session) return { projects: [] };

  await db.upsertUser(session.user.id);
  const projects = await db.getUserProjects(session.user.id);
  return { projects };
};
