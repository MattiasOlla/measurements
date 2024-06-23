export const sizes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] as const;
export type Size = (typeof sizes)[number];

type SizeArgs = {
  size: Size;
  [key: string]: unknown;
};

export type Measurement =
  | {
      name: string;
      allowance: "none" | "manual";
    }
  | {
      name: string;
      allowance: "table";
      range: (args: SizeArgs) => number;
    };

export const measurements = [
  { name: "Ärmhålsdjup", allowance: "table", range: ({ size }) => (size - 6) / 2 },
  { name: "Livlängd, bak", allowance: "none" },
  { name: "Klänningslängd", allowance: "none" },
  { name: "Bystvidd", allowance: "table", range: ({ size }) => size },
  { name: "Midjevidd", allowance: "manual" },
  { name: "Höftvidd", allowance: "manual" },
  { name: "Höftläge", allowance: "none" },
  {
    name: "Stussvidd",
    allowance: "table",
    range: ({ size }) => {
      if (size === 2) return 2;
      if (size === 4) return 3;
      return size - 2;
    },
  },
  { name: "Stussläge", allowance: "none" },
  { name: "Ryggbredd", allowance: "table", range: ({ size }) => ((size - 2) / 2) * 0.6 },
  {
    name: "Halsvidd",
    allowance: "table",
    range: ({ size }) => (size < 6 ? 0 : ((size - 6) / 2) * 0.75),
  },
  {
    name: "Axelbredd",
    allowance: "table",
    range: ({ size }) => (size < 10 ? 0 : ((size - 10) / 2) * 0.2),
  },
  {
    name: "Ärmlängd",
    allowance: "table",
    range: ({ size }) => {
      if (size <= 10) return 0;
      if (size <= 14) return 1; // TODO: what does "ev" mean?
      return 2; // TODO: what does "ev" mean?
    },
  },
  {
    name: "Överarmsvidd",
    allowance: "table",
    range: ({ size }) => (size - 2) / 2 + 3, // TODO: Handle "3 à 4" etc.
  },
  { name: "Armbågdsvidd", allowance: "none" }, // TODO: implement this
  { name: "Handledsvidd", allowance: "none" }, // TODO: implement this
  { name: "Bysthöjd", allowance: "none" }, // TODO: implement this
  { name: "Livlängd, fram", allowance: "none" }, // TODO: implement this
  { name: "Bystveck", allowance: "none" }, // TODO: implement this
  { name: "Ärmhål", allowance: "none" }, // TODO: implement this
] as const satisfies Measurement[];

export const measurementNames = measurements.map((m) => m.name);
export type MeasurementNames = (typeof measurements)[number]["name"];
