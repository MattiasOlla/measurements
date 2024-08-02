import type { Ease, MeasurementOutputRecord } from "./measurements";

type EaseArgs = {
  ease: Ease;
  measurementOutputs: MeasurementOutputRecord;
  size: number;
};

export type DerivedMeasurement = {
  name: string;
  allowance: (args: EaseArgs) => number | null;
};

export const derivedMeasurements = [
  {
    name: "Ärmhålsbredd",
    allowance: ({ ease, measurementOutputs, size }) => {
      if (!measurementOutputs["Bystvidd"].withEaseHalved) return null;
      // TODO Double check all of this
      let divideBy: number, easeExtra: number;
      if (isBetweenInclusive(32, 46)(size) || isBetweenInclusive(16, 23)(size)) {
        divideBy = 4;
        easeExtra = ((ease - 18) / 2) * 0.25;
      } else {
        divideBy = 3;
        easeExtra = ((ease - 66) / 2) * 0.2;
      }

      return measurementOutputs["Bystvidd"].withEaseHalved / divideBy + easeExtra;
    },
  },
  {
    name: "Halsbredd",
    allowance: ({ measurementOutputs }) => {
      if (!measurementOutputs["Halsvidd"].withEase) return null;
      return measurementOutputs["Halsvidd"].withEase / 5 - 1;
    },
  },
  {
    name: "Halsdjup",
    allowance: ({ measurementOutputs }) => {
      if (!measurementOutputs["Halsvidd"].withEase) return null;
      return measurementOutputs["Halsvidd"].withEase / 5 + 0.5;
    },
  },
  {
    name: "Minskn. livl. fram",
    allowance: ({ measurementOutputs }) => {
      if (!measurementOutputs["Halsvidd"].base) return null;
      return measurementOutputs["Halsvidd"].base / 5 - 0.5;
    },
  },
] as const satisfies DerivedMeasurement[];

export type DerivedMeasurementName = (typeof derivedMeasurements)[number]["name"];

function isBetweenInclusive(min: number, max: number) {
  return (value: number) => value >= min && value <= max;
}
