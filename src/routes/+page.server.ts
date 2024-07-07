import { db } from "$lib/db";

export const load = async () => {
  // console.log(import.meta.env.VITE_FIRESTORE_EMULATOR_HOST);
  console.log("HELLO");
  // await db.collection("users").doc("test1").create({ foo: 123 });
  console.log({ data: (await db.collection("users").doc("mattias").get()).data() });
  return {};
};
