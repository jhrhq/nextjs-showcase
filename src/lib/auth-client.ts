import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => (typeof window !== "undefined" ? localStorage.getItem("auth_token") || "" : ""),
    },
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token");
      if (authToken && typeof window !== "undefined") {
        localStorage.setItem("auth_token", authToken);
      }
    },
  },
});
