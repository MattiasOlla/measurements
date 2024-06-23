import { browser } from "$app/environment";
import { getProject } from "$lib/storage";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (!browser) return;
  const project = getProject(params.projectSlug);
  if (!project) {
    return { status: 404, error: new Error(`Project not found: ${params.projectSlug}`) };
  }
  return project;
};
