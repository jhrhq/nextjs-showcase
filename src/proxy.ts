import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./domains/hotel-booking/constants/auth.constants";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: AUTH_CONFIG.SESSION.COOKIE_NAME,
  });

  if (!sessionCookie) {
    const loginUrl = new URL(AUTH_CONFIG.ROUTES.SIGN_IN, request.url);

    // Fallback tracking to return back after login
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Scopes your network validation strictly to hotel tenant routes
export const config = {
  matcher: [
    "/hotel-booking/book/:path*",
    "/hotel-booking/hosting/:path*",
    "/hotel-booking/bookings",
    "/hotel-booking/manage-hotels",
  ],
};
