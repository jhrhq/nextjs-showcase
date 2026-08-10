import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./domains/hotel-booking/constants/auth.constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === AUTH_CONFIG.ROUTES.SIGN_IN) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: AUTH_CONFIG.SESSION.COOKIE_NAME,
  });

  if (!sessionCookie) {
    const loginUrl = new URL(AUTH_CONFIG.ROUTES.SIGN_IN, request.url);

    // Fallback tracking to return back after login
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("callbackUrl", fullPath);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/hotel-booking/book/:path*",
    "/hotel-booking/hosting/:path*",
    "/hotel-booking/bookings",
    "/hotel-booking/manage-hotels",
  ],
};
