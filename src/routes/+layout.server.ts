import * as db from "$lib/db";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth();
  if (!session?.user?.id) {
    if (url.pathname !== "/") redirect(307, "/");
    return { session };
  }

  await db.upsertUser(session.user.id);
  const projects = await db.getUserProjects(session.user.id);
  return { session, projects };
};
