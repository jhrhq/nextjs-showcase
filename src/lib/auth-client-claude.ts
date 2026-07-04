/**
 * lib/auth/auth-client.ts
 *
 * Client-side token lifecycle for the hotel-booking app.
 *
 * Responsibilities
 * ────────────────
 *  1. Read / write / clear the two localStorage keys:
 *       hb_access_token  — short-lived 15-minute JWT
 *       hb_refresh_token — DB-backed session reference (long-lived)
 *
 *  2. Expose `authenticatedFetch` — a drop-in replacement for `fetch` that:
 *       a. Attaches the current access token as a Bearer header.
 *       b. On HTTP 401, executes ONE silent refresh attempt against
 *          POST /api/auth/hotel-bookin/token.
 *       c. Retries the original request exactly once with the new access token.
 *       d. On refresh failure, clears both tokens and throws so the caller
 *          can redirect to the login page.
 *
 *  3. Expose helpers consumed by login / logout / OAuth callback handlers
 *     to persist or remove tokens.
 *
 * Boundaries
 * ──────────
 *  • This file is CLIENT-ONLY — it references localStorage and must never be
 *    imported in Server Actions, Route Handlers, or Middleware.
 *    Guard every import site with "use client" or a dynamic import.
 *
 *  • No React import, no Next.js router import — this module is framework-
 *    agnostic so it can be unit-tested in a plain Node/jsdom environment.
 *
 *  • All public functions carry explicit return types; `unknown` is used
 *    for JSON payloads before narrowing — never `any`.
 */

"use client";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** localStorage key for the short-lived JWT (15 min). */
export const ACCESS_TOKEN_KEY  = "hb_access_token"  as const;

/** localStorage key for the DB-backed session reference (long-lived). */
export const REFRESH_TOKEN_KEY = "hb_refresh_token" as const;

/** Endpoint that accepts a refresh token and issues a fresh access token. */
const REFRESH_ENDPOINT = "/api/auth/hotel-bookin/token" as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of the JSON body returned by the token-refresh endpoint. */
interface RefreshSuccessResponse {
  accessToken:  string;
  refreshToken: string; // Server may rotate the refresh token; always persist it.
}

/**
 * Internal result type for the refresh cycle.
 * Using a discriminated union keeps control-flow explicit and avoids throwing
 * inside the refresh helper itself — the caller decides whether to throw.
 */
type RefreshResult =
  | { ok: true;  accessToken: string; refreshToken: string }
  | { ok: false; reason: string };

/** Options forwarded to the underlying `fetch` call, minus the Authorization
 *  header (which is injected automatically). */
export type AuthFetchInit = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

// ---------------------------------------------------------------------------
// Token storage helpers
// ---------------------------------------------------------------------------

/**
 * Returns true when executing in a browser environment.
 * Guards every localStorage access — SSR / Edge environments do not expose it.
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Reads a value from localStorage.
 * Returns `null` when called outside the browser or when the key is absent.
 */
function readStorage(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    // Thrown in private-browsing modes where storage is blocked.
    return null;
  }
}

/**
 * Writes a value to localStorage.
 * Silently no-ops when called outside the browser.
 */
function writeStorage(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Quota exceeded or storage blocked — surface nothing; the caller already
    // has the tokens in memory for the current request cycle.
  }
}

/**
 * Removes a key from localStorage.
 * Silently no-ops when called outside the browser.
 */
function removeStorage(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage blocked — nothing to remove.
  }
}

// ---------------------------------------------------------------------------
// Public token accessors
// ---------------------------------------------------------------------------

/** Retrieves the current access token from localStorage. */
export function getAccessToken(): string | null {
  return readStorage(ACCESS_TOKEN_KEY);
}

/** Retrieves the current refresh token from localStorage. */
export function getRefreshToken(): string | null {
  return readStorage(REFRESH_TOKEN_KEY);
}

/**
 * Persists both tokens after a successful login, sign-up, or token refresh.
 * Always call this atomically — never write one token without the other.
 */
export function persistTokens(accessToken: string, refreshToken: string): void {
  writeStorage(ACCESS_TOKEN_KEY,  accessToken);
  writeStorage(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Removes both tokens from localStorage.
 *
 * Call on:
 *  - Explicit user logout.
 *  - Silent refresh failure (session irrecoverably expired).
 *  - Any server response indicating the session has been revoked.
 */
export function clearTokens(): void {
  removeStorage(ACCESS_TOKEN_KEY);
  removeStorage(REFRESH_TOKEN_KEY);
}

// ---------------------------------------------------------------------------
// Silent refresh cycle
// ---------------------------------------------------------------------------

/**
 * Tracks an in-flight refresh promise so that concurrent 401 responses
 * collapse into a single POST /token call instead of stampeding the endpoint.
 *
 * Pattern: promise coalescing (same technique as the Mongoose cache in
 * lib/db/mongoose.ts — O(1) in-flight requests regardless of concurrency).
 */
let _refreshPromise: Promise<RefreshResult> | null = null;

/**
 * Executes a silent token refresh.
 *
 * - If a refresh is already in-flight, returns the same promise (coalesced).
 * - Sends the current `hb_refresh_token` as a Bearer token to the refresh
 *   endpoint.
 * - On success, persists both new tokens and returns them.
 * - On any failure, clears both tokens and returns `{ ok: false }`.
 *
 * @internal — callers should use `authenticatedFetch` which invokes this
 *             automatically on 401.
 */
async function silentRefresh(): Promise<RefreshResult> {
  // Coalesce concurrent refresh attempts.
  if (_refreshPromise !== null) {
    return _refreshPromise;
  }

  _refreshPromise = executeRefresh().finally(() => {
    _refreshPromise = null;
  });

  return _refreshPromise;
}

async function executeRefresh(): Promise<RefreshResult> {
  const currentRefreshToken = getRefreshToken();

  if (currentRefreshToken === null) {
    clearTokens();
    return { ok: false, reason: "No refresh token available in localStorage." };
  }

  let response: Response;

  try {
    response = await fetch(REFRESH_ENDPOINT, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${currentRefreshToken}`,
      },
      // Prevent the browser from caching the token exchange.
      cache: "no-store",
    });
  } catch (networkError: unknown) {
    // Network-level failure (offline, DNS, CORS preflight rejected, …).
    clearTokens();
    const message =
      networkError instanceof Error ? networkError.message : String(networkError);
    return { ok: false, reason: `Network error during token refresh: ${message}` };
  }

  if (!response.ok) {
    // 401 / 403 / 500 from the refresh endpoint — session is unrecoverable.
    clearTokens();
    return {
      ok:     false,
      reason: `Token refresh endpoint responded with HTTP ${response.status}.`,
    };
  }

  // Narrow the JSON payload before trusting any field.
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    clearTokens();
    return { ok: false, reason: "Token refresh response body was not valid JSON." };
  }

  if (!isRefreshSuccessResponse(body)) {
    clearTokens();
    return {
      ok:     false,
      reason: "Token refresh response did not contain expected accessToken / refreshToken fields.",
    };
  }

  persistTokens(body.accessToken, body.refreshToken);

  return {
    ok:           true,
    accessToken:  body.accessToken,
    refreshToken: body.refreshToken,
  };
}

/**
 * Type-guard for the refresh endpoint response.
 * Validates field presence and types without using `any`.
 */
function isRefreshSuccessResponse(value: unknown): value is RefreshSuccessResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "accessToken"  in value && typeof (value as Record<string, unknown>).accessToken  === "string" &&
    "refreshToken" in value && typeof (value as Record<string, unknown>).refreshToken === "string"
  );
}

// ---------------------------------------------------------------------------
// authenticatedFetch
// ---------------------------------------------------------------------------

/**
 * Drop-in replacement for `fetch` that handles the full auth lifecycle:
 *
 *  1. Reads the current `hb_access_token` from localStorage.
 *  2. Attaches it as `Authorization: Bearer <token>` on every request.
 *  3. On HTTP 401:
 *       a. Calls silentRefresh() (coalesced — safe for concurrent callers).
 *       b. If refresh succeeds, retries the original request once with the
 *          new access token.
 *       c. If refresh fails, throws `AuthSessionExpiredError` so the caller
 *          (typically a React data-fetching hook) can redirect to /sign-in.
 *  4. For all non-401 responses, returns the raw `Response` — the caller
 *     decides how to parse the body.
 *
 * IMPORTANT: This wrapper retries exactly ONCE.  If the retry itself returns
 * 401, it throws immediately — it does NOT enter another refresh cycle.
 * This prevents infinite loops when the server has revoked all sessions.
 *
 * @param input   - URL string or `Request` object (same as native `fetch`).
 * @param init    - Optional fetch options.  Do NOT set `Authorization` here;
 *                  it will be overwritten.
 * @returns       The `Response` from the server (original or retried).
 * @throws        `AuthSessionExpiredError` when the session cannot be recovered.
 * @throws        Re-throws any network-level `TypeError` from the native fetch.
 */
export async function authenticatedFetch(
  input: string | URL | Request,
  init:  AuthFetchInit = {}
): Promise<Response> {
  const firstResponse = await fetchWithToken(input, init, getAccessToken());

  // Happy path — no auth error.
  if (firstResponse.status !== 401) {
    return firstResponse;
  }

  // ── 401 received — attempt silent refresh ─────────────────────────────────
  const refreshResult = await silentRefresh();

  if (!refreshResult.ok) {
    throw new AuthSessionExpiredError(
      `Session expired and could not be refreshed: ${refreshResult.reason}`
    );
  }

  // ── Retry with new access token ───────────────────────────────────────────
  const retryResponse = await fetchWithToken(input, init, refreshResult.accessToken);

  if (retryResponse.status === 401) {
    // Retry also returned 401 — server has definitively rejected the session.
    clearTokens();
    throw new AuthSessionExpiredError(
      "Retry after token refresh returned 401. Session has been revoked server-side."
    );
  }

  return retryResponse;
}

/**
 * Executes a single `fetch` call with the provided token attached as a
 * Bearer header.  Does not inspect or handle the response.
 *
 * @internal
 */
async function fetchWithToken(
  input:  string | URL | Request,
  init:   AuthFetchInit,
  token:  string | null
): Promise<Response> {
  const headers: Record<string, string> = {
    ...(init.headers ?? {}),
    ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(input, { ...init, headers });
}

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

/**
 * Thrown by `authenticatedFetch` when:
 *  - The silent refresh fails (network error, HTTP error, bad payload).
 *  - The retry after a successful refresh still returns 401.
 *
 * Callers should catch this error and redirect the user to the sign-in page.
 *
 * ```ts
 * try {
 *   const res = await authenticatedFetch("/api/hotel-booking/reservations");
 * } catch (err) {
 *   if (err instanceof AuthSessionExpiredError) {
 *     router.push("/hotel-booking/sign-in");
 *     return;
 *   }
 *   throw err; // propagate unexpected errors
 * }
 * ```
 */
export class AuthSessionExpiredError extends Error {
  public override readonly name = "AuthSessionExpiredError" as const;

  constructor(message: string) {
    super(message);
    // Restore prototype chain — required when targeting ES5 via TypeScript.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ---------------------------------------------------------------------------
// 403 Email-verification trap
// ---------------------------------------------------------------------------

/**
 * Thrown when the server returns HTTP 403 on a credential sign-in attempt,
 * which Better Auth emits specifically for unverified email addresses when
 * `requireEmailVerification: true` is set.
 *
 * Callers should catch this and render a "Please verify your email" prompt.
 */
export class EmailNotVerifiedError extends Error {
  public override readonly name = "EmailNotVerifiedError" as const;

  constructor() {
    super(
      "Email address has not been verified. " +
        "Please check your inbox for the activation link."
    );
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ---------------------------------------------------------------------------
// Credential sign-in helper
// ---------------------------------------------------------------------------

/** Payload sent to the credential sign-in endpoint. */
interface CredentialSignInPayload {
  email:    string;
  password: string;
}

/** Shape expected back from a successful credential sign-in. */
interface SignInSuccessResponse {
  accessToken:  string;
  refreshToken: string;
}

/**
 * Sends credentials to Better Auth's credential sign-in endpoint, handles
 * the 403 email-verification case, and persists tokens on success.
 *
 * @throws `EmailNotVerifiedError` on HTTP 403.
 * @throws `Error` with a descriptive message on any other non-2xx response.
 */
export async function credentialSignIn(
  payload: CredentialSignInPayload
): Promise<SignInSuccessResponse> {
  const response = await fetch(
    "/api/auth/hotel-bookin/sign-in/credentials",
    {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
      cache:   "no-store",
    }
  );

  // Better Auth returns 403 when requireEmailVerification is true and the
  // account has not completed email activation.
  if (response.status === 403) {
    throw new EmailNotVerifiedError();
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "(no body)");
    throw new Error(
      `Sign-in failed with HTTP ${response.status}: ${text}`
    );
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error("Sign-in response body was not valid JSON.");
  }

  if (!isSignInSuccessResponse(body)) {
    throw new Error(
      "Sign-in response did not contain expected accessToken / refreshToken fields."
    );
  }

  persistTokens(body.accessToken, body.refreshToken);
  return body;
}

function isSignInSuccessResponse(value: unknown): value is SignInSuccessResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "accessToken"  in value && typeof (value as Record<string, unknown>).accessToken  === "string" &&
    "refreshToken" in value && typeof (value as Record<string, unknown>).refreshToken === "string"
  );
}

// ---------------------------------------------------------------------------
// Sign-out helper
// ---------------------------------------------------------------------------

/**
 * Calls the Better Auth sign-out endpoint and clears local tokens.
 *
 * Always clears localStorage even if the network request fails — a client
 * that can no longer reach the server should still be logged out locally.
 */
export async function signOut(): Promise<void> {
  const accessToken = getAccessToken();

  try {
    await fetch("/api/auth/hotel-bookin/sign-out", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        ...(accessToken !== null ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store",
    });
  } finally {
    // Unconditionally clear — even if the server is unreachable.
    clearTokens();
  }
}
