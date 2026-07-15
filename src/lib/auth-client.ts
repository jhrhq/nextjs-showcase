// import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  basePath: "hotel-booking/api/auth",
  emailAndPassword: {
    enabled: true,
  },
});
