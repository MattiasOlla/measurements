import * as db from "$lib/db";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async ({ request, locals }) => {
  const session = await locals.auth();
  if (!session?.user?.id) {
    return error(401, { message: "Not logged in" });
  }

  const project = await request.json();
  const updatedProject = await db.upsertProject(session.user.id, {
    ...project,
    created: new Date(project.created),
    updated: new Date(project.updated),
  });
  return json(updatedProject);
};
