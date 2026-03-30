/**
 * field-meta.ts
 *
 * Pure functions that compute per-field derived state.
 * No React. No side-effects.
 */

import { urlItemSchema } from "./schema";
import type { UrlFieldMeta, UrlFieldStatus } from "./types";

// ─── URL validation ───────────────────────────────────────────────────────────

/**
 * Returns true when `url` passes the per-field Zod schema.
 *
 * Uses `safeParse` (Zod v4 preferred path) instead of try/catch so no
 * exception is thrown on an invalid value — just a `{ success: false }` result.
 *
 * @example
 * isValidUrl("https://github.com")  // → true
 * isValidUrl("not-a-url")           // → false
 * isValidUrl("")                    // → false
 */
export function isValidUrl(url: string): boolean {
  return urlItemSchema.shape.url.safeParse(url).success;
}

// ─── Status resolution ────────────────────────────────────────────────────────

/**
 * Resolve one `UrlFieldStatus` label from four boolean flags.
 *
 * Kept as a named function (not an inline ternary) so the priority order is
 * self-documenting and easy to adjust:
 *   1. duplicate  — takes priority over everything, even if the URL itself is valid
 *   2. valid      — non-empty, format-correct, unique
 *   3. invalid    — non-empty but format error or RHF field error
 *   4. empty      — nothing typed yet (the default initial state)
 */
export function resolveFieldStatus(
  isEmpty:     boolean,
  isDuplicate: boolean,
  isValid:     boolean,
  isInvalid:   boolean,
): UrlFieldStatus {
  if (isDuplicate) return "duplicate";
  if (isValid)     return "valid";
  if (isInvalid)   return "invalid";
  if (isEmpty)     return "empty";

  // Exhaustive fallback — all boolean combinations are covered above,
  // but TypeScript requires an explicit return path at the end.
  return "empty";
}

// ─── Field metadata ───────────────────────────────────────────────────────────

/**
 * Compute all derived boolean flags and the composite status for a single
 * URL row. Called inside the `fields.map()` loop in the main component.
 *
 * Separating computation from rendering keeps the JSX clean — the map loop
 * reads pre-computed values instead of calculating inline.
 *
 * @param url              Raw URL string from the form field.
 * @param index            Position of this field in the urls array.
 * @param duplicateIndices Set of indices that have a duplicate (from `findDuplicateIndices`).
 * @param fieldError       RHF error object for this field, if any.
 */
export function getFieldMeta(
  url:              string,
  index:            number,
  duplicateIndices: Set<number>,
  fieldError?:      { message?: string },
): UrlFieldMeta {
  const isEmpty     = url.trim() === "";
  const isDuplicate = duplicateIndices.has(index);
  const isInvalid   = !isEmpty && (!!fieldError || isDuplicate);
  const isValid     = !isEmpty && !fieldError && !isDuplicate;
  const status      = resolveFieldStatus(isEmpty, isDuplicate, isValid, isInvalid);

  return { status, isDuplicate, isValid, isInvalid };
}
