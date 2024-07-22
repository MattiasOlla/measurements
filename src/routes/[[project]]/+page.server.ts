import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { session, projects } = await parent();
  if (!session || !projects) {
    if (params.project) redirect(307, "/");
    return;
  }

  if (!params.project) return;
  const activeProject = projects.find((project) => project.slug === params.project);
  if (!activeProject) redirect(307, "/");
  return { projects, activeProject };
};
