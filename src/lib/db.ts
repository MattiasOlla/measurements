import { Firestore } from "@google-cloud/firestore";

if (import.meta.env.VITE_FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST;
}

export const db = new Firestore();
