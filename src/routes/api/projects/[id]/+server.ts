import * as db from "$lib/db";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";

async function assertAuth(locals: Parameters<RequestHandler>[0]["locals"]) {
  const session = await locals.auth();
  if (!session?.user?.id) {
    error(401, { message: "Not logged in" });
  }
  return session;
}

export const PUT: RequestHandler = async ({ params, request, locals }) => {
  const session = await assertAuth(locals);

  const project = await request.json();
  try {
    const updatedProject = await db.upsertProject(session.user.id, {
      ...project,
      id: params.id,
      created: new Date(project.created),
      updated: new Date(project.updated),
    });
    return json(updatedProject);
  } catch (err) {
    error(409, { message: `Project with slug ${project.slug} already exists` });
  }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  const session = await assertAuth(locals);
  await db.deleteProject(session.user.id, params.id);
  return json(null, { status: 200 });
};
