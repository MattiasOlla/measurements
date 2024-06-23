import { browser } from "$app/environment";
import { getProject } from "$lib/storage";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
  if (!browser) return;
  const project = getProject(url.searchParams.get("name"));
  if (!project) {
    return { status: 404, error: new Error(`Project not found`) };
  }
  return project;
};
