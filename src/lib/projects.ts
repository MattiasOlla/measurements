import slugify from "slugify";
import * as uuid from "uuid";
import type { DerivedMeasurementName, DerivedMeasurementOutput } from "./derived-measurements";
import {
  measurements,
  type Ease,
  type MeasurementName,
  type MeasurementOutput,
} from "./measurements";
export const STORAGE_KEY = "projects";

export type Project = {
  name: string;
  id: string;
  slug: string;
  ease: Ease;
  size: number;
  isLongSleeve: boolean;
  notes?: string;
  created: Date;
  updated: Date;
  fields: Record<MeasurementName, { value: number | null; manualAllowance?: number }>;
};

export type ProjectWithComputedValues = Project & {
  fields: (
    | ({
        name: MeasurementName;
      } & MeasurementOutput)
    | ({
        name: DerivedMeasurementName;
      } & DerivedMeasurementOutput)
  )[];
};

type AllOptionalExcept<T, K extends keyof T> = Pick<T, K> & Omit<Partial<T>, K>;

export function assertProjectFields(partialProject: AllOptionalExcept<Project, "name">) {
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
  partialProject.size = partialProject.size || 25;
  partialProject.ease = partialProject.ease || 12;
  partialProject.isLongSleeve = partialProject.isLongSleeve || false;
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
