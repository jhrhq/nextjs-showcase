/**
 * url-utils.ts
 *
 * Pure string and data utility functions for URL handling.
 * No React. No Zod. No side-effects.
 * Every function here is independently unit-testable.
 */

// ─── Internal sentinel ────────────────────────────────────────────────────────

/**
 * Stored in the `firstSeen` Map once a URL key has already been added to
 * the duplicates Set. Prevents re-adding the first-occurrence index on a
 * third (or later) encounter of the same URL.
 */
const ALREADY_MARKED = -1 as const;

// ─── Public types (re-exported so callers don't need a separate import) ───────

/** Any object that carries a `url` string — matches form field shape. */
export interface UrlField {
  url: string;
}

// ─── Normalisation ────────────────────────────────────────────────────────────

/**
 * Normalise a URL string for case-insensitive, whitespace-insensitive
 * deduplication comparisons.
 *
 * @example
 * toUrlKey("  HTTPS://GitHub.COM ") // → "https://github.com"
 */
export function toUrlKey(url: string): string {
  return url.toLowerCase().trim();
}

// ─── Extraction ───────────────────────────────────────────────────────────────

/** Regex that matches any http or https URL in a block of text. */
const URL_REGEX = /https?:\/\/[^\s,;\n"'<>]+/gi;

/**
 * Extract every unique http/https URL from arbitrary text.
 * Works on plain text, HTML, JSON, CSV, log files — anything.
 *
 * @returns Deduplicated array of trimmed URL strings.
 *
 * @example
 * extractUrls('Visit https://github.com and https://vercel.com today.')
 * // → ["https://github.com", "https://vercel.com"]
 */
export function extractUrls(text: string): string[] {
  const matches = text.match(URL_REGEX) ?? [];
  // Use a Set during construction so we never push duplicates into the result.
  const unique  = new Set(matches.map((u) => u.trim()));
  return [...unique];
}

// ─── Deduplication helpers ────────────────────────────────────────────────────

/**
 * Build a Set of normalised URL keys from a list of form fields.
 *
 * Uses a single for-loop with no intermediate arrays — O(n) time, O(n) space.
 *
 * @param fields        The current list of URL form fields.
 * @param excludeIndex  Optional index to skip (used when replacing one field
 *                      with multiple pasted URLs — we ignore the field being
 *                      replaced when checking for existing entries).
 *
 * @example
 * buildExistingKeySet([{ url: "https://a.com" }, { url: "https://b.com" }])
 * // → Set { "https://a.com", "https://b.com" }
 */
export function buildExistingKeySet(
  fields: UrlField[],
  excludeIndex?: number,
): Set<string> {
  const keys = new Set<string>();

  for (let i = 0; i < fields.length; i++) {
    if (i === excludeIndex) continue;

    const url = fields[i]?.url ?? "";
    if (url.trim()) keys.add(toUrlKey(url));
  }

  return keys;
}

/**
 * From a list of candidate URLs, return only those not already present in
 * the current field list.
 *
 * @param candidates    URLs you want to add.
 * @param existing      Current form field list.
 * @param excludeIndex  Field index to ignore when scanning existing (see
 *                      `buildExistingKeySet` docs).
 *
 * @example
 * filterNewUrls(
 *   ["https://a.com", "https://b.com"],
 *   [{ url: "https://a.com" }]
 * )
 * // → ["https://b.com"]   (a.com already exists, b.com is new)
 */
export function filterNewUrls(
  candidates: string[],
  existing:   UrlField[],
  excludeIndex?: number,
): string[] {
  const existingKeys = buildExistingKeySet(existing, excludeIndex);
  return candidates.filter((u) => !existingKeys.has(toUrlKey(u)));
}

/**
 * Return the Set of field indices that share a URL with at least one other field.
 *
 * Single-pass algorithm — O(n) time, O(n) space.
 * Uses an internal sentinel value so the Map never grows beyond O(unique URLs).
 *
 * How it works:
 *   • First encounter  → store the index in `firstSeen`.
 *   • Second encounter → add both (first + current) to `dupes`, replace stored
 *                        value with ALREADY_MARKED so we don't add first again.
 *   • Third+ encounter → just add current index; first is already marked.
 *
 * @example
 * findDuplicateIndices([
 *   { url: "https://a.com" },   // index 0
 *   { url: "https://b.com" },   // index 1
 *   { url: "https://a.com" },   // index 2  ← duplicate of 0
 *   { url: "https://a.com" },   // index 3  ← duplicate of 0
 * ])
 * // → Set { 0, 2, 3 }
 */
export function findDuplicateIndices(values: UrlField[]): Set<number> {
  // Maps normalised URL key → first index seen, or ALREADY_MARKED sentinel.
  const firstSeen = new Map<string, number>();
  const dupes     = new Set<number>();

  for (let i = 0; i < values.length; i++) {
    const url = values[i]?.url ?? "";
    if (!url.trim()) continue;

    const key       = toUrlKey(url);
    const prevIndex = firstSeen.get(key);

    if (prevIndex === undefined) {
      // First time seeing this URL — remember which row it lives in.
      firstSeen.set(key, i);
    } else if (prevIndex !== ALREADY_MARKED) {
      // Second encounter — mark both the original and the current row.
      dupes.add(prevIndex);
      dupes.add(i);
      // Replace with sentinel so a third encounter doesn't re-add prevIndex.
      firstSeen.set(key, ALREADY_MARKED);
    } else {
      // Third or later encounter — first is already marked, just add current.
      dupes.add(i);
    }
  }

  return dupes;
}
