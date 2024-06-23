import { browser } from "$app/environment";
import { getProjects } from "$lib/storage";

export const load = () => {
  if (!browser) return;
  return { projects: getProjects() };
};
