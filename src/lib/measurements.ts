export const sizes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] as const;
export type Size = (typeof sizes)[number];

type SizeArgs = {
  size: Size;
  [key: string]: unknown;
};

export type Measurement =
  | {
      name: string;
      allowanceType: "none" | "manual";
    }
  | {
      name: string;
      allowanceType: "table";
      allowance: (args: SizeArgs) => number;
    };

export const measurements = [
  { name: "Ärmhålsdjup", allowanceType: "table", allowance: ({ size }) => (size - 6) / 2 },
  { name: "Livlängd, bak", allowanceType: "none" },
  { name: "Klänningslängd", allowanceType: "none" },
  { name: "Bystvidd", allowanceType: "table", allowance: ({ size }) => size },
  { name: "Midjevidd", allowanceType: "manual" },
  { name: "Höftvidd", allowanceType: "manual" },
  { name: "Höftläge", allowanceType: "none" },
  {
    name: "Stussvidd",
    allowanceType: "table",
    allowance: ({ size }) => {
      if (size === 2) return 2;
      if (size === 4) return 3;
      return size - 2;
    },
  },
  { name: "Stussläge", allowanceType: "none" },
  { name: "Ryggbredd", allowanceType: "table", allowance: ({ size }) => ((size - 2) / 2) * 0.6 },
  {
    name: "Halsvidd",
    allowanceType: "table",
    allowance: ({ size }) => (size < 6 ? 0 : ((size - 6) / 2) * 0.75),
  },
  {
    name: "Axelbredd",
    allowanceType: "table",
    allowance: ({ size }) => (size < 10 ? 0 : ((size - 10) / 2) * 0.2),
  },
  {
    name: "Ärmlängd",
    allowanceType: "table",
    allowance: ({ size }) => {
      if (size <= 10) return 0;
      if (size <= 14) return 1; // TODO: what does "ev" mean?
      return 2; // TODO: what does "ev" mean?
    },
  },
  {
    name: "Överarmsvidd",
    allowanceType: "table",
    allowance: ({ size }) => (size - 2) / 2 + 3, // TODO: Handle "3 à 4" etc.
  },
  { name: "Armbågdsvidd", allowanceType: "none" }, // TODO: implement this
  { name: "Handledsvidd", allowanceType: "none" }, // TODO: implement this
  { name: "Bysthöjd", allowanceType: "none" }, // TODO: implement this
  { name: "Livlängd, fram", allowanceType: "none" }, // TODO: implement this
  { name: "Bystveck", allowanceType: "none" }, // TODO: implement this
  { name: "Ärmhål", allowanceType: "none" }, // TODO: implement this
] as const satisfies Measurement[];
