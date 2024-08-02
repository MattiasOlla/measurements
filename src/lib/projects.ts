import slugify from "slugify";
import * as uuid from "uuid";
import { measurements, type Ease, type MeasurementName } from "./measurements";
export const STORAGE_KEY = "projects";

export type Project = {
  name: string;
  id: string;
  slug: string;
  ease: Ease;
  size: number;
  notes?: string;
  created: Date;
  updated: Date;
  fields: Record<MeasurementName, { value: number | null; manualAllowance?: number }>;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function assertProjectFields(
  partialProject: Optional<Project, "id" | "slug" | "created" | "updated" | "fields">,
) {
  // @ts-expect-error Type not ready yet
  partialProject.fields = partialProject.fields || {};

  measurements.forEach((measurement) => {
    if (!partialProject.fields?.[measurement.name]) {
      // @ts-expect-error Type not ready yet
      partialProject.fields = {
        ...partialProject.fields,
        [measurement.name]: {
          value: null,
          manualAllowance: measurement.allowanceType === "manual" ? 0 : null,
        },
      };
    }
  });
  partialProject.id = partialProject.id || uuid.v4();
  partialProject.slug = partialProject?.slug || slugify(partialProject.name, { lower: true });
  const now = new Date();
  partialProject.created = partialProject.created || now;
  partialProject.updated = now;
  return partialProject as Project;
}

export function changeName(project: Project, newName: string) {
  project.name = newName;
  project.slug = slugify(newName, { lower: true });
  return project;
}

export async function saveProject(project: Project) {
  return await fetch(`/api/projects/${project.id}`, {
    method: "PUT",
    body: JSON.stringify(project),
    headers: { "content-type": "application/json" },
  })
    .then((resp) => resp.json())
    .catch(console.error);
}
