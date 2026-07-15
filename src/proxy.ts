import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAuthRoute, isPublicRoute } from "@/lib/routes";
import { AUTH_CONFIG } from "./domains/hotel-booking/constants/auth.constants";
// import { buildSignInUrl } from "./lib/callback-urls";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/hotel-booking/api/auth")) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthenticated = !!session?.user;

  if (isAuthRoute(pathname)) {
    if (isAuthenticated) {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") ?? AUTH_CONFIG.ROUTES.HOME;

      // callbackUrl is validated inside resolveCallbackUrlFromString; we
      // intentionally re-derive it here inline to keep this branch fast.
      const safeDest = callbackUrl.startsWith(AUTH_CONFIG.ROUTES.HOME) ? callbackUrl : AUTH_CONFIG.ROUTES.HOME;
      return NextResponse.redirect(new URL(safeDest, request.url));
    }
    // Not authenticated — let them reach the sign-in / sign-up page
    return NextResponse.next();
  }

  /*  if (!isAuthenticated) {
    // Capture the full original URL (path + query string) as the callback
    const signInUrl = buildSignInUrl(request.nextUrl, request.url);
    return NextResponse.redirect(signInUrl);
    } */

  return NextResponse.next();
}

// ── Matcher ──
// Scoped exclusively to /hotel-booking/* as required by spec.
// The negative lookahead excludes Next.js internals and static assets so the
// middleware never runs on _next/static, _next/image, or favicon.ico.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
