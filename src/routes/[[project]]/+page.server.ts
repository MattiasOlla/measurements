import * as db from "$lib/db";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  if (!session) {
    if (params.project) redirect(307, "/");
    return { projects: [] };
  }

  await db.upsertUser(session.user.id);
  const projects = await db.getUserProjects(session.user.id);
  if (!params.project) return { projects };

  const activeProject = projects.find((project) => project.slug === params.project);
  if (!activeProject) redirect(307, "/");
  return { projects, activeProject };
};
