import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string,
  plugins: [usernameClient()],
});

export const { signUp, signIn, signOut, useSession } = authClient;
