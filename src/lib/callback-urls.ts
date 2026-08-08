/**
 *
 * Handles the "where should we go after sign-in?"
 *
 * Security constraint from spec:
 *   "Redirection targets (callback URLs) must be validated to prevent
 *    open-redirect vulnerabilities."
 *
 * Design decisions:
 *  1. Only RELATIVE paths are accepted. Absolute URLs (including same-origin
 *     ones supplied as strings) are rejected — the only safe allowlist is
 *     "paths that belong to this application."
 *  2. Paths must start with /hotel-booking to stay inside the app namespace.
 *  3. Auth routes are excluded from callbacks to avoid redirect loops.
 *  4. The callback is stored as a plain query parameter (?callbackUrl=...) —
 *     simple, inspectable, and compatible with the intercepting route flow.
 */

import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import { isAuthRoute } from "./routes";

/**
 * Returns true only if the path is a safe relative path within the app.
 *
 * Rejects:
 *  - Absolute URLs  (http://, https://, //)
 *  - Protocol-relative URLs  (//)
 *  - Paths outside the app namespace
 *  - Auth routes (would create redirect loops)
 *  - Empty strings
 */
export function isSafeCallbackUrl(raw: string | null | undefined): boolean {
  if (!raw) return false;

  // Reject anything that looks like an absolute URL or protocol-relative URL
  if (/^(https?:)?\/\//i.test(raw)) return false;

  // Must be a path (starts with /)
  if (!raw.startsWith("/")) return false;

  // Must live inside the app namespace
  if (!raw.startsWith(AUTH_CONFIG.ROUTES.HOME)) return false;

  // Exclude auth routes to prevent redirect loops
  // Strip query/hash before checking route type
  const pathname = raw.split("?")[0].split("#")[0];
  if (isAuthRoute(pathname)) return false;

  // Basic path traversal guard
  if (raw.includes("..")) return false;

  return true;
}

// ─── Building the sign-in redirect URL ───────────────────────────────────────

/**
 * Constructs the URL to redirect an unauthenticated user to, embedding the
 * original requested path as ?callbackUrl=<encoded>.
 *
 * Called from middleware.ts — must be pure/synchronous.
 */
export function buildSignInUrl(requestedUrl: URL, baseUrl: string): string {
  const callbackPath = requestedUrl.pathname + requestedUrl.search + requestedUrl.hash;

  const signInUrl = new URL(AUTH_CONFIG.ROUTES.SIGN_IN, baseUrl);

  if (isSafeCallbackUrl(callbackPath)) {
    signInUrl.searchParams.set("callbackUrl", callbackPath);
  }

  return signInUrl.toString();
}

/**
 *  Extracting the callback after sign-in

 * Reads and validates the callbackUrl from search params.
 * Returns the validated path or the default dashboard path.
 *
 * Called from:
 *  - Server Action (after successful sign-in)
 *  - Sign-in page component (to pre-populate redirect intent)
 */
export function resolveCallbackUrl(searchParams: URLSearchParams): string {
  const raw = searchParams.get("callbackUrl");
  if (isSafeCallbackUrl(raw)) {
    return raw as string;
  }

  return AUTH_CONFIG.ROUTES.HOME;
}

/**
 * Convenience: resolve from a plain string (e.g. passed through a hidden form
 * field or stored in component state).
 */
export function resolveCallbackUrlFromString(raw: string | null | undefined): string {
  if (isSafeCallbackUrl(raw)) {
    return raw as string;
  }
  return AUTH_CONFIG.ROUTES.HOME;
}
