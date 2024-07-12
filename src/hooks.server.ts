import { error, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handle as authenticationHandle } from "./auth";

const authorizationHandle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api")) {
    const session = await event.locals.auth();
    if (!session) {
      return error(401, { message: "Not logged in" });
    }
  }
  return resolve(event);
};

export const handle = sequence(authenticationHandle, authorizationHandle);
