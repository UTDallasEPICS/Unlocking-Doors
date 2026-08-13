import { createAuthClient } from "better-auth/vue";
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "~~/server/utils/auth";

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>()
  ]
});

export const { signIn, signUp, signOut, useSession } = authClient;
