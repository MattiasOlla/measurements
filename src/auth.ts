import { env } from "$env/dynamic/private";
import Google from "@auth/core/providers/google";
import { SvelteKitAuth } from "@auth/sveltekit";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET })],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.givenName = token.givenName as string;
      session.user.familyName = token.familyName as string;
      return session;
    },
    jwt: ({ token, profile }) => {
      if (profile) {
        token.id = profile.sub;
        token.givenName = profile?.given_name;
        token.familyName = profile?.family_name;
      }
      return token;
    },
  },
  trustHost: true,
});

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email: string;
      image?: string;
      givenName?: string;
      familyName?: string;
    };
  }
}
