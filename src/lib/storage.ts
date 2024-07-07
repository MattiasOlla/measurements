import slugify from "slugify";

export const STORAGE_KEY = "projects";

export type Project = {
  name: string;
  slug: string;
  size: number;
  notes?: string;
  created: string;
  updated: string;
  fields: { [key: string]: { value?: number; manualAllowance?: number } };
};

export function getProjects() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  return JSON.parse(stored) as { [key: string]: Project };
}

export function getProject(slug: string | null) {
  if (!slug) return null;
  return getProjects()[slug] || null;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export function saveProject(project: Optional<Project, "updated" | "fields">) {
  const updatedProject: Project = {
    ...project,
    updated: new Date().toISOString(),
    fields: project.fields || {},
  };
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...getProjects(), [project.slug]: updatedProject }),
  );
  return updatedProject;
}

export function createNewProject(name: string) {
  return saveProject({
    name: name,
    slug: slugify(name, { lower: true }),
    size: 12,
    created: new Date().toISOString(),
  });
}
