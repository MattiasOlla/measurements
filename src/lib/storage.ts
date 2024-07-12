import slugify from "slugify";
import { measurements, type MeasurementName, type Size } from "./measurements";

export const STORAGE_KEY = "projects";

export type Project = {
  name: string;
  slug: string;
  size: Size;
  notes?: string;
  created: Date;
  updated: Date;
  fields: Record<MeasurementName, { value: number | null; manualAllowance?: number }>;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function assertProjectFields(
  partialProject: Optional<Project, "slug" | "created" | "updated" | "fields">,
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
  partialProject.slug = partialProject?.slug || slugify(partialProject.name, { lower: true });
  const now = new Date();
  partialProject.created = partialProject.created || now;
  partialProject.updated = now;
  return partialProject as Project;
}
