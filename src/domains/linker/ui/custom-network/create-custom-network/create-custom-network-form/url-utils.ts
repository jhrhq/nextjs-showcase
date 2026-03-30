import { z } from "zod";

// ─── Zod schema for single URL item (kept here for isValidUrl helper) ─────
export const urlItemSchema = z.object({
  url: z.url("Enter a valid URL starting with https://"),
});

// ─── Pure URL utilities ───

/** Normalise a URL string for case-insensitive deduplication comparisons. */
export function toUrlKey(url: string): string {
  return url.toLowerCase().trim();
}

/** Extract all http/https URLs from arbitrary text, deduped. */

export function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s,;\n"'<>]+/gi;
  return [...new Set((text.match(urlRegex) ?? []).map((u) => u.trim()))];
}

/**
 * Build a Set of normalised URL keys from a field list.
 * Pass `excludeIndex` to skip the field being replaced (single-field paste).
 */
export function buildExistingKeySet(fields: Array<{ url: string }>, excludeIndex?: number): Set<string> {
  return new Set(fields.filter((f, i) => i !== excludeIndex && f.url.trim()).map((f) => toUrlKey(f.url)));
}

/**
 * Return only candidates not already present in `existing`.
 * Used in bulk import, sidebar inject, and single-field paste.
 */
export function filterNewUrls(candidates: string[], existing: Array<{ url: string }>, excludeIndex?: number): string[] {
  const keySet = buildExistingKeySet(existing, excludeIndex);
  return candidates.filter((u) => !keySet.has(toUrlKey(u)));
}

/**
 * Return the set of indices that share a URL with at least one other field.
 * Shared between the Zod superRefine and the real-time UI highlight.
 */
export function findDuplicateIndices(values: Array<{ url: string }>): Set<number> {
  const seen = new Map<string, number[]>();

  for (let i = 0; i < values.length; i++) {
    const url = values[i]?.url ?? "";
    if (!url.trim()) continue;

    const key = toUrlKey(url);
    const prev = seen.get(key) ?? [];
    prev.push(i);
    seen.set(key, prev);
  }

  const dupes = new Set<number>();
  seen.forEach((indices) => {
    if (indices.length > 1)
      indices.forEach((i) => {
        dupes.add(i);
      });
  });

  return dupes;
}

/**
 * Fast URL validity check using native URL constructor.
 * For UI badges/stats only — use Zod schema for final validation.
 */
export function isValidUrlFast(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** True when `url` satisfies the per-field Zod schema (for final validation). */
export function isValidUrlStrict(url: string): boolean {
  const result = urlItemSchema.shape.url.safeParse(url);
  return result.success;
}

// ─── Per-field derived state types & helpers ───

export type UrlFieldStatus = "empty" | "valid" | "invalid" | "duplicate";

export interface UrlFieldMeta {
  status: UrlFieldStatus;
  isDuplicate: boolean;
  isValid: boolean;
  isInvalid: boolean;
}

export function resolveFieldStatus(
  isEmpty: boolean,
  isDuplicate: boolean,
  isValid: boolean,
  isInvalid: boolean
): UrlFieldStatus {
  if (isDuplicate) return "duplicate";
  if (isValid) return "valid";
  if (isInvalid) return "invalid";
  if (isEmpty) return "empty";
  return "empty"; // Exhaustive fallback
}

export function getFieldMeta(
  url: string,
  index: number,
  duplicateIndices: Set<number>,
  fieldError?: { message?: string }
): UrlFieldMeta {
  const isEmpty = url.trim() === "";
  const isDuplicate = duplicateIndices.has(index);
  const isInvalid = !isEmpty && (!!fieldError || isDuplicate);
  const isValid = !isEmpty && !fieldError && !isDuplicate;
  const status = resolveFieldStatus(isEmpty, isDuplicate, isValid, isInvalid);

  return { status, isDuplicate, isValid, isInvalid };
}
