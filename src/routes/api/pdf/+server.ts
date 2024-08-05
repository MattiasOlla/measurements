import { projectToPdf } from "$lib/pfd";
import type { ProjectWithComputedValues } from "$lib/projects";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const project = (await request.json()) as ProjectWithComputedValues;
  const doc = projectToPdf(project);

  return new Response(doc, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${project.name}".pdf`,
    },
  });
};
