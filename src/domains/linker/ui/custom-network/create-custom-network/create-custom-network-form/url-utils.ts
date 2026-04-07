import type { UrlFieldMeta, UrlFieldStatus } from "@/domains/linker/types/custom-network.types";
import type { CreateCustomNetworkFormValues } from "@/domains/linker/validations/custom-network.validation";

/**
 * checs the Valid url using build in URL constructor
 *
 * @example
 * isValidUrl("  HTTPS://GitHub.COM ") // → true
 */
export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Filter and transform an array in a single pass.
 * Items that return `null`, `undefined`, or `false` from `transform` are excluded.
 *
 * @example
 * // Basic usage
 * const numbers = compactMap([1, 2, 3], n => n > 1 ? n * 2 : undefined); // [4, 6]
 *
 * // With type narrowing
 * const strings = compactMap(mixedArray, (item): item is string => typeof item === "string");
 *
 * @param arr - The source array
 * @param transform - Function that returns the transformed value, or falsy to exclude
 * @returns A new array with transformed, filtered values
 */

export function compactMap<T, U>(arr: readonly T[], transform: (item: T) => U | undefined | null | false): U[] {
  const result: U[] = [];

  for (const item of arr) {
    const transformed = transform(item);
    if (transformed) result.push(transformed);
  }
  return result;
}

const ALREADY_MARKED = -1 as const;

// Normalize URL

/**
 * Normalise a URL string for case-insensitive, whitespace-insensitive
 * deduplication comparisons.
 *
 * @example
 * toUrlKey("  HTTPS://GitHub.COM ") // → "https://github.com"
 */

export function toUrlKey(url: string): string {
  return url.trim().toLowerCase();
}

// ─── Extraction ──
// ─── Types ───
export type NormalizedUrl = string & { readonly __normalized: unique symbol };

// ─── normalizeUrl: robust, typed, documented ───
/**
 * Normalize and validate a URL string for consistent comparison and storage.
 *
 * Ensures the URL uses http/https, lowercases the hostname, removes default
 * ports (80/443), and reconstructs a canonical string. Returns null for
 * invalid or unsupported URLs.
 *
 * Designed for deduplication and SEO-friendly normalization.
 *
 * @param url  Raw URL input (can include whitespace or mixed casing).
 *
 * @returns A normalized URL string, or null if invalid.
 *
 * @example
 * normalizeUrl(' HTTPS://WWW.Example.com:443/page ')
 * // → "https://example.com/page"
 */
export function normalizeUrl(url: string): NormalizedUrl | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }

    // 🔒 Force HTTPS (SEO best practice)
    const protocol = "https:";

    // 🌐 Normalize hostname
    let host = parsed.hostname.toLowerCase();
    if (host.startsWith("www.")) {
      host = host.slice(4);
    }

    // 🚫 Remove default ports
    if (parsed.port) {
      const isDefault =
        (parsed.protocol === "http:" && parsed.port === "80") ||
        (parsed.protocol === "https:" && parsed.port === "443");
      if (!isDefault) host += `:${parsed.port}`;
    }

    // 📁 Normalize path
    let pathname = parsed.pathname || "/";

    // Remove trailing slash (except root)
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // 🔎 Clean query params
    const params = new URLSearchParams(parsed.search);

    const IGNORED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];

    // Remove tracking params
    IGNORED_PARAMS.forEach((p) => {
      params.delete(p);
    });

    // Sort remaining params
    const sorted = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const search = sorted ? `?${sorted}` : "";

    // ❌ Remove hash
    const hash = "";

    return `${protocol}//${host}${pathname}${search}${hash}` as NormalizedUrl;
  } catch {
    return null;
  }
}
// ─── extractUrls: optimized single-pass ───

/** Regex that matches any http or https URL in a block of text. */
const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
const TRAILING_PUNCT = /[.,;:!?'"»)+\]]+$/;

/**
 * Extract and normalize all unique http/https URLs from a block of text.
 *
 * Matches URLs using a regex, cleans common trailing punctuation, and
 * normalizes each URL using `normalizeUrl`. Invalid or duplicate URLs
 * are skipped.
 *
 * Each returned URL is of type `NormalizedUrl`, which is a branded string
 * representing a canonical, validated URL. This ensures only properly
 * normalized URLs are treated as valid in your codebase.
 *
 * Uses a single pass with a Set for deduplication — O(n) time.
 *
 * @param {string} text - The input text to scan for URLs.
 *
 * @returns {NormalizedUrl[]} An array of unique `NormalizedUrl` values.
 *
 * @example
 * extractUrls('Check https://example.com, https://example.com!')
 * // → ["https://example.com" as NormalizedUrl]
 */

export function extractUrls(text: string): NormalizedUrl[] {
  if (!text) return [];

  const matches = text.match(URL_REGEX);
  if (!matches) return [];

  const seen = new Set<string>();
  const results: NormalizedUrl[] = [];

  for (const raw of matches) {
    // Clean trailing punctuation common in prose
    const cleaned = raw.replace(TRAILING_PUNCT, "").trim();
    const normalized = normalizeUrl(cleaned);

    // Early continue on invalid/duplicate (branch prediction friendly)
    if (!normalized || seen.has(normalized)) continue;

    seen.add(normalized);
    results.push(normalized);
  }

  return results;
}

// ─── Deduplication helpers ──────

/** Any object that carries a `url` string — matches form field shape. */
export interface UrlField {
  url: string;
}
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
export function buildExistingKeySet(fields: UrlField[], excludeIndex?: number): Set<string> {
  const keys = new Set<string>();

  for (let i = 0; i <= fields.length; i++) {
    if (i === excludeIndex) continue;

    const url = fields[i]?.url ?? "";
    if (url.trim()) {
      keys.add(toUrlKey(url));
    }
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

export function filterNewUrls(candidates: string[], existing: UrlField[], excludeIndex?: number) {
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
  if (values.length < 150) {
    // Version 1: Simple two-pass (easier to debug/maintain)
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
    for (const indices of seen.values()) {
      if (indices.length > 1) {
        for (const idx of indices) {
          dupes.add(idx);
        }
      }
    }
    return dupes;
  }
  // Version 2: Optimized single-pass for large lists
  const firstSeen = new Map<string, number | typeof ALREADY_MARKED>();
  const dupes = new Set<number>();

  for (let i = 0; i < values.length; i++) {
    const url = values[i]?.url ?? "";
    if (!url.trim()) continue;

    const key = toUrlKey(url);
    const prev = firstSeen.get(key);
    if (prev === undefined) {
      firstSeen.set(key, i);
    } else if (prev !== ALREADY_MARKED) {
      dupes.add(prev);
      dupes.add(i);
      firstSeen.set(key, ALREADY_MARKED);
    } else {
      dupes.add(i);
    }
  }

  return dupes;
}

// ─── Per-field derived state types & helpers ───

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
export function resolveUrlFieldStatus(
  isEmpty: boolean,
  isDuplicate: boolean,
  isValid: boolean,
  isInvalid: boolean
): UrlFieldStatus {
  // Order by observed frequency (example: adjust to your metrics)
  if (isValid) return "valid"; // ~85% of calls
  if (isEmpty) return "empty"; // ~10% of calls
  if (isDuplicate) return "duplicate"; // ~4% of calls
  if (isInvalid) return "invalid"; // ~1% of calls
  return "empty";
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
  const status = resolveUrlFieldStatus(isEmpty, isDuplicate, isValid, isInvalid);

  return { status, isDuplicate, isValid, isInvalid };
}

export function mergePastedUrls(
  currentUrls: CreateCustomNetworkFormValues["urls"],
  pasteIndex: number,
  newUrls: string[]
): CreateCustomNetworkFormValues["urls"] {
  // Remove the field being pasted into + filter empty
  const base = currentUrls.filter((_, i) => i !== pasteIndex).filter((f) => f.url.trim());

  const merged = [...base, ...newUrls.map((url) => ({ url }))];
  return merged.length > 0 ? merged : [{ url: "" }];
}
