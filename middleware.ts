import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/",
    "/(bn|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
  // matcher: ["/", "/(bn|en)/:path*"],
};
