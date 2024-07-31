import { env } from "$env/dynamic/private";
import { Firestore } from "@google-cloud/firestore";
import type { Project } from "./storage";

if (env.FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = env.FIRESTORE_EMULATOR_HOST;
}

const userCollection = "users";
const projectSubCollection = "projects";

export const db = new Firestore();

export async function upsertUser(userId: string) {
  await db.collection(userCollection).doc(userId).set({ lastActive: new Date() }, { merge: true });
}

export async function getUserProjects(userId: string) {
  const projects: Project[] = [];
  const ref = await db
    .collection(userCollection)
    .doc(userId)
    .collection(projectSubCollection)
    .withConverter(projectConverter)
    .orderBy("updated")
    .get();
  ref.forEach((r) => {
    projects.push(r.data() as Project);
  });

  return projects;
}

export async function upsertProject(userId: string, project: Project) {
  project.updated = new Date();
  await db
    .collection(userCollection)
    .doc(userId)
    .collection(projectSubCollection)
    .withConverter(projectConverter)
    .doc(project.id)
    .set(project, { merge: true });
  return project;
}

const projectConverter = {
  toFirestore: (project: Project) => project,
  // @ts-expect-error I don't think the Firebase types are actually right
  fromFirestore: (snapshot) => {
    const data = snapshot.data()!;
    return { ...data, created: data.created.toDate(), updated: data.updated.toDate() } as Project;
  },
};
