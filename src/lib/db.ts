import { env } from "$env/dynamic/private";
import { Firestore } from "@google-cloud/firestore";
import type { Project } from "./storage";

if (env.FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = env.FIRESTORE_EMULATOR_HOST;
}

const userCollection = "users";
const projectSubCollection = "projects";

export const db = new Firestore();

export async function upsertUser(id: string) {
  await db.collection(userCollection).doc(id).set({ lastActive: new Date() }, { merge: true });
}

export async function getUserProjects(id: string) {
  const projects: Project[] = [];
  const ref = await db.collection(userCollection).doc(id).collection(projectSubCollection).get();
  ref.forEach((r) => projects.push(r.data() as Project));
  return projects;
}
