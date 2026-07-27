import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import { auth } from "@/lib/auth";

export const verifySession = cache(
  async (): Promise<{
    isAuth: true;
    userId: string;
  }> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      redirect(AUTH_CONFIG.ROUTES.SIGN_IN);
    }

    return { isAuth: true, userId: session.user.id };
  }
);
