import { goto } from "$app/navigation";
import * as db from "$lib/db";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  if (!session) {
    if (params.project) goto("/");
    return { projects: [] };
  }

  await db.upsertUser(session.user.id);
  const projects = await db.getUserProjects(session.user.id);
  if (params.project) {
    const activeProject = projects.find((project) => project.slug === params.project);
    if (activeProject) return { projects, activeProject };
  }
  return { projects };
};
