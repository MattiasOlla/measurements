import { FIRESTORE_EMULATOR_HOST } from "$env/static/private";
import { Firestore } from "@google-cloud/firestore";

if (FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
}

export const db = new Firestore();
