/* import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./lib/linker/services/auth/session.service";
export async function proxy(req: NextRequest) {
  const session = getSession(req) || {};

  const { pathname } = req.nextUrl;

  if (pathname === "/linker") {
    if (!session) {
      return NextResponse.redirect(new URL("/linker/sing-in", req.url));
    } else {
      return NextResponse.redirect(new URL("/linker/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/linker/dashboard") && !session) {
    return NextResponse.redirect(new URL("/linker/sign-in"));
  }

  if (pathname.startsWith("/liker/sign-in") && session) {
    return NextResponse.redirect(new URL("/linker/dashboard"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/linker/:path*"],
};
 */
