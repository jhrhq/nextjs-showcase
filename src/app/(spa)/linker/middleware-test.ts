// ============================================================================
// FILE: src/middleware.ts
// LOCATION: src/middleware.ts
// PURPOSE: Middleware for protected routes
// ============================================================================

// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { AUTH_CONFIG } from "@/lib/linker/constants/auth.constants";

/**
 * Middleware for route protection
 *
 * Runs on Edge Runtime - keep this lightweight
 * For complex auth logic, use server components
 */
// export function middleware(request: NextRequest) {
//   const session = request.cookies.get(AUTH_CONFIG.SESSION.COOKIE_NAME);
//   const { pathname } = request.nextUrl;

//   // Protected routes
//   const isProtectedRoute = pathname.startsWith("/dashboard");

//   // Auth routes
//   const isAuthRoute = pathname.startsWith("/sign-in");

//   // Redirect to sign-in if accessing protected route without session
//   if (isProtectedRoute && !session) {
//     return NextResponse.redirect(
//       new URL(AUTH_CONFIG.ROUTES.SIGN_IN, request.url),
//     );
//   }

//   // Redirect to dashboard if accessing auth route with session
//   if (isAuthRoute && session) {
//     return NextResponse.redirect(
//       new URL(AUTH_CONFIG.ROUTES.DASHBOARD, request.url),
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization)
//      * - favicon.ico (favicon)
//      * - public folder
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
