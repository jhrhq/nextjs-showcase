// import { type NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { isAuthRoute, isPublicRoute } from "@/lib/routes";
// import { AUTH_CONFIG } from "./domains/hotel-booking/constants/auth.constants";
// // import { buildSignInUrl } from "./lib/callback-urls";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/hotel-booking/api/auth")) {
//     return NextResponse.next();
//   }

//   if (isPublicRoute(pathname)) {
//     return NextResponse.next();
//   }

//   // Get session
//   const session = await auth.api.getSession({
//     headers: request.headers,
//   });

//   const isAuthenticated = !!session?.user;

//   if (isAuthRoute(pathname)) {
//     if (isAuthenticated) {
//       const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") ?? AUTH_CONFIG.ROUTES.HOME;

//       // callbackUrl is validated inside resolveCallbackUrlFromString; we
//       // intentionally re-derive it here inline to keep this branch fast.
//       const safeDest = callbackUrl.startsWith(AUTH_CONFIG.ROUTES.HOME) ? callbackUrl : AUTH_CONFIG.ROUTES.HOME;
//       return NextResponse.redirect(new URL(safeDest, request.url));
//     }
//     // Not authenticated — let them reach the sign-in / sign-up page
//     return NextResponse.next();
//   }

//   /*  if (!isAuthenticated) {
//     // Capture the full original URL (path + query string) as the callback
//     const signInUrl = buildSignInUrl(request.nextUrl, request.url);
//     return NextResponse.redirect(signInUrl);
//     } */

//   return NextResponse.next();
// }

// // ── Matcher ──
// // Scoped exclusively to /hotel-booking/* as required by spec.
// // The negative lookahead excludes Next.js internals and static assets so the
// // middleware never runs on _next/static, _next/image, or favicon.ico.
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { AUTH_ROUTES, matchesRoute, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./lib/routes";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1. Public routes — skip session check entirely (fastest exit)
//   if (matchesRoute(pathname, PUBLIC_ROUTES)) {
//     return NextResponse.next();
//   }

//   // 2. Fetch session once for auth + protected route checks
//   const session = await auth.api.getSession({
//     headers: request.headers,
//   });

//   // 3. Auth routes — redirect logged-in users away to dashboard
//   if (matchesRoute(pathname, AUTH_ROUTES)) {
//     if (session) {
//       return NextResponse.redirect(new URL("/hotel-booking", request.url));
//     }
//     return NextResponse.next();
//   }

//   // 4. Protected routes — redirect guests to login, preserving intended path
//   if (matchesRoute(pathname, PROTECTED_ROUTES)) {
//     if (!session) {
//       const loginUrl = new URL("/hotel-booking/signin", request.url);
//       loginUrl.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(loginUrl);
//     }
//     return NextResponse.next();
//   }

//   // 5. Any other /hotel-booking/* route — pass through (extend above lists as needed)
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Run proxy on every /hotel-booking route except:
//      * - _next/static  (static assets)
//      * - _next/image   (image optimisation)
//      * - *.png / *.ico / *.svg / *.jpg / *.webp (public files)
//      */
//     "/hotel-booking/((?!_next/static|_next/image|.*\\.(?:png|ico|svg|jpg|webp)$).*)",
//   ],
// };

// proxy.ts
// import { getSessionCookie } from "better-auth/cookies";
// import { type NextRequest, NextResponse } from "next/server";
// import { auth } from "./lib/auth";
// import { AUTH_ROUTES, PUBLIC_ROUTES } from "./lib/routes";

// export async function proxy(request: NextRequest) {
//   // const session = getSessionCookie(request);
//   const session = await auth.api.getSession({
//     headers: request.headers,
//   });

//   // console.log("session", session);
//   const { pathname, search } = request.nextUrl;

//   const isApiAuth = pathname.startsWith("/hotel-booking/api/auth");

//   // Checks if the route is explicitly public
//   const isPublicRoute = PUBLIC_ROUTES.some((route) => route.path === pathname);

//   // Checks if the route is an authentication route (signin, signup, etc.)
//   const isAuthRoute = () => {
//     return AUTH_ROUTES.some((route) => pathname.startsWith(route.path));
//   };

//   // 1. Allow all internal Auth API requests to pass through
//   if (isApiAuth) {
//     return NextResponse.next();
//   }

//   // 2. Handle Auth Routes (signin/signup)
//   if (isAuthRoute()) {
//     if (session?.user.id) {
//       // If they are already logged in, send them to their target callback or default page
//       const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/hotel-booking";
//       return NextResponse.redirect(new URL(callbackUrl, request.url));
//     }
//     return NextResponse.next();
//   }

//   // 3. Default-to-protected: Block non-logged-in users from everything else (including /test-app/dashboard)
//   if (!session?.user.id && !isPublicRoute) {
//     const signInUrl = new URL("/hotel-booking/signin", request.url);

//     // Attach the original page they tried to visit (e.g., /test-app/dashboard) as a callback
//     signInUrl.searchParams.set("callbackUrl", pathname + search);

//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for static files and images
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // 1. Grab the session cookie
  const sessionCookie = getSessionCookie(request);

  // 2. If the user has no cookie, redirect them to the hotel-booking login
  if (!sessionCookie) {
    const loginUrl = new URL("/hotel-booking/signin", request.url);

    // Remember the exact protected hotel page they wanted to visit
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. User has a cookie, allow the request forward to the app layer
  return NextResponse.next();
}

// 4. THE SCOPE GUARD: Only trigger this file for protected hotel booking pages!
export const config = {
  matcher: [
    "/hotel-booking/book/:path*",
    "/hotel-booking/bookings",
    "/hotel-booking/create-hotel",
    "/hotel-booking/manage-hotels",
    "/hotel-booking/payment-success",
  ],
};
