import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Updated to simple 2-letter lowercase codes as requested
const SUPPORTED_LOCALES = ["en", "bn"];
const DEFAULT_LOCALE = "en";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Track if the incoming path matches our targeted prefix
  if (pathname === "/hotel-booking" || pathname.startsWith("/hotel-booking/")) {
    // Split the path parts to see if a locale is already inserted right after /hotel-booking
    // e.g., "", "hotel-booking", "en", "search"
    const pathSegments = pathname.split("/");
    const potentialLocale = pathSegments[2]; // Index 2 targets the element after /hotel-booking

    const hasValidLocale = SUPPORTED_LOCALES.includes(potentialLocale);

    if (!hasValidLocale) {
      // Pull locale preference from cookie or fallback
      const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
      const locale = SUPPORTED_LOCALES.includes(cookieLocale || "")
        ? cookieLocale
        : DEFAULT_LOCALE;

      // Restructure the route internally.
      // If pathname is '/hotel-booking/rooms', it rewrites to '/hotel-booking/en/rooms'
      const remainingPath = pathSegments.slice(2).join("/");
      const cleanRemainingPath = remainingPath ? `/${remainingPath}` : "";

      const url = request.nextUrl.clone();
      url.pathname = `/hotel-booking/${locale}${cleanRemainingPath}`;

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hotel-booking", "/hotel-booking/:path*"],
};
