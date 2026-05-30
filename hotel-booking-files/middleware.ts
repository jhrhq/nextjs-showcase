import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

// const authMiddleware = auth((req: NextRequest) => {
//   //
//   console.log(req.auth);
//   return intlMiddleware(req);
// });

// export default function middleware(req: NextRequest) {
//   const publicPathnameRegex = RegExp(
//     `^(/(${locales.join("|")}))?(${PUBLIC_ROUTES.flatMap((p) =>
//       p === "/" ? ["", "/"] : p
//     ).join("|")})/?$`,
//     "i"
//   );

//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return authMiddleware(req);
//   }
// }

// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // "/",
    // "/(bn|en)/:path*",
    "/((?!api|_next/static|_vercel|_next/image|.*\\..*).*)",
  ],
};

// https://stackoverflow.com/questions/78361386/how-to-combine-nextauthv5-and-next-intl-middleware-in-next-jsapp-route
// https://github.com/vahid-nejad/Nextjs14-Comprehensive-authentication-Course/blob/main/src/middleware.ts
//https://www.youtube.com/watch?v=Xa73Xr8PM2k
