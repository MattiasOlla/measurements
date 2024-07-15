import * as db from "$lib/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth();

  if (!session?.user?.id) return { session };

  await db.upsertUser(session.user.id);
  const projects = await db.getUserProjects(session.user.id);
  return { session, projects };
};
