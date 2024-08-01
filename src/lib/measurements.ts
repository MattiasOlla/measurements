export const eases = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] as const;
export type Ease = (typeof eases)[number];

type EaseArgs = {
  ease: Ease;
  [key: string]: unknown;
};

export type Measurement = { name: string; divideByTwo?: boolean } & (
  | {
      allowanceType: "none" | "manual";
    }
  | {
      allowanceType: "table";
      allowance: (args: EaseArgs) => number;
    }
);

export const measurements = [
  { name: "Ärmhålsdjup", allowanceType: "table", allowance: ({ ease }) => (ease - 6) / 2 },
  { name: "Livlängd, bak", allowanceType: "none" },
  { name: "Klänningslängd", allowanceType: "none" },
  {
    name: "Bystvidd",
    allowanceType: "table",
    allowance: ({ ease }) => ease,
    divideByTwo: true,
  },
  { name: "Midjevidd", allowanceType: "manual", divideByTwo: true },
  { name: "Höftvidd", allowanceType: "manual", divideByTwo: true },
  { name: "Höftläge", allowanceType: "none" },
  {
    name: "Stussvidd",
    allowanceType: "table",
    allowance: ({ ease }) => {
      if (ease === 2) return 2;
      if (ease === 4) return 3;
      return ease - 2;
    },
    divideByTwo: true,
  },
  { name: "Stussläge", allowanceType: "none" },
  {
    name: "Ryggbredd",
    allowanceType: "table",
    allowance: ({ ease }) => ((ease - 2) / 2) * 0.6,
    divideByTwo: true,
  },
  {
    name: "Halsvidd",
    allowanceType: "table",
    allowance: ({ ease }) => (ease < 6 ? 0 : ((ease - 6) / 2) * 0.75),
    divideByTwo: true,
  },
  {
    name: "Axelbredd",
    allowanceType: "table",
    allowance: ({ ease }) => (ease < 10 ? 0 : ((ease - 10) / 2) * 0.2),
  },
  {
    name: "Ärmlängd",
    allowanceType: "table",
    allowance: ({ ease }) => {
      if (ease <= 10) return 0;
      if (ease <= 14) return 1; // TODO: what does "ev" mean?
      return 2; // TODO: what does "ev" mean?
    },
  },
  {
    name: "Överarmsvidd",
    allowanceType: "table",
    allowance: ({ ease }) => (ease - 2) / 2 + 3, // TODO: Handle "3 à 4" etc.
    divideByTwo: true,
  },
  { name: "Armbågdsvidd", allowanceType: "manual", divideByTwo: true },
  { name: "Handledsvidd", allowanceType: "manual", divideByTwo: true },
  { name: "Bysthöjd", allowanceType: "manual" },
  { name: "Livlängd, fram", allowanceType: "manual" },
  { name: "Bystveck", allowanceType: "manual" },
  {
    name: "Ärmhål",
    allowanceType: "table",
    allowance: ({ ease }) => ((ease - 6) / 2) * 1.25,
  },
] as const satisfies Measurement[];

export type MeasurementName = (typeof measurements)[number]["name"];
