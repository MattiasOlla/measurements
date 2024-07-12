import * as db from "$lib/db";
import type { Project } from "$lib/storage";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.id) {
    return error(401, { message: "Not logged in" });
  }

  const project = (await request.json()) as Project;
  const updatedProject = await db.upsertProject(session.user.id, project);
  return json(updatedProject);
};
