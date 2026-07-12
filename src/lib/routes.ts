import { AUTH_CONFIG } from "../domains/hotel-booking/constants/auth.constants";

export type RouteConfig = {
  path: string /** Exact path or prefix (use trailing /* in your matching logic) */;
  prefix?: boolean /** Exact path or prefix (use trailing /* in your matching logic) */;
};

// Accessible to everyone regardless of auth state.
export const PUBLIC_ROUTES: RouteConfig[] = [
  { path: AUTH_CONFIG.ROUTES.HOME },
  { path: AUTH_CONFIG.ROUTES.PROPERTY, prefix: true }, // browse without auth
  { path: "/hotel-booking/api/auth", prefix: true }, // Better Auth API handler
];

// Redirect authenticated users away (they don't need to see sign-in again).
export const AUTH_ROUTES: RouteConfig[] = [
  { path: AUTH_CONFIG.ROUTES.SIGN_IN },
  { path: AUTH_CONFIG.ROUTES.SIGN_UP },
  { path: AUTH_CONFIG.ROUTES.VERIFY },
  { path: AUTH_CONFIG.ROUTES.FORGOT_PASSWORD },
  // { path: AUTH_CONFIG.ROUTES.RESET_PASSWORD, prefix: true },
];

// Require a valid session. Everything not in PUBLIC or AUTH falls here by default
export const PROTECTEDROUTES: RouteConfig[] = [
  { path: AUTH_CONFIG.ROUTES.BOOK, prefix: true },
  { path: AUTH_CONFIG.ROUTES.BOOKINGS, prefix: true },
  { path: AUTH_CONFIG.ROUTES.CHECKOUT, prefix: true },
  { path: AUTH_CONFIG.ROUTES.CREATE_HOTEL, prefix: true },
  { path: AUTH_CONFIG.ROUTES.DASHBOARD, prefix: true },
  { path: AUTH_CONFIG.ROUTES.MANAGE_HOTELS, prefix: true },
];

// helpers
function matchesRoute(pathName: string, routes: RouteConfig[]): boolean {
  return routes.some((route) => {
    if (route.prefix) {
      return pathName === route.path || pathName.startsWith(`${route.path}/`);
    }
    return pathName === route.path;
  });
}

export function isPublicRotue(pathName: string): boolean {
  return matchesRoute(pathName, PUBLIC_ROUTES);
}

export function isAuthRoute(pathName: string): boolean {
  return matchesRoute(pathName, AUTH_ROUTES);
}

export function isProtectedRoute(pathName: string): boolean {
  if (isPublicRotue(pathName)) return false;
  if (isAuthRoute(pathName)) return false;
  return true;
}
