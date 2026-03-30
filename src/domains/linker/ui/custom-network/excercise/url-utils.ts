import type { NormalizedUrl } from "@/domains/linker/types/custom-network.types";

/**
 * Normalize URL for comparision: Lowercase + trim
 */
export function normalizeUrl(url: string): NormalizedUrl | undefined {
  const normalized = url.trim().toLowerCase();
  return normalized || undefined;
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

/**
 * Check if string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url.trim());
    return u.protocol === "http" || u.protocol === "https";
  } catch {
    return false;
  }
}

/**
 * Extract URL from arbitari text (HTML, JSON, Plain text)
 */
export function extractUrls(text: string): string[] {
  if (!text) return [];

  // Match http/https URLs, handling quotes, brackets etc.
  const regex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const matches = text.match(regex);
  if (!matches) return [];

  // Dedupe + normalize + validate
  const seen = new Set<string>();
  return matches
    .map((url) => url.replace(/[.,;:!?'"»)+\]]+$/, "")) // clean trailing punctuation
    .map(normalizeUrl)
    .filter((url) => {
      if (seen.has(url)) return false;
      seen.add(url);
      return isValidUrl(url);
    });
}

/**
 * Find all indices of item with duplicate Normalized URLs
 */

/**
 * Find all indices of items with duplicate normalized URLs
 * O(N) time, O(N) space - optimized for performance
 */
export function findDuplicateIndices(items: Array<{ url: string }>): Set<number> {
  if (!Array.isArray(items) || items.length === 0) return new Set();

  const seen = new Map<NormalizedUrl, number[]>();

  // Single pass: group indices by normalized URL
  for (let i = 0; i < items.length; i++) {
    const raw = items[i]?.url;
    if (typeof raw !== "string") continue;

    const key = normalizeUrl(raw);
    if (!key) continue; // skip empty

    if (!seen.has(key)) {
      seen.set(key, []);
    }
    seen.get(key)!.push(i); // O(1) push - no array copying
  }

  // Collect indices that appear more than once
  const duplicates = new Set<number>();
  for (const indices of seen.values()) {
    if (indices.length > 1) {
      for (const idx of indices) {
        duplicates.add(idx);
      }
    }
  }

  return duplicates;
}

/**
 * Filter new URLs against existing, excluding optional index
 * Pure function for easy testing
 */
export function filterNewUrls(newUrls: string[], existing: Array<{ url: string }>, excludeIndex?: number): string[] {
  const existingSet = new Set(
    existing
      .filter((_, i) => i !== excludeIndex)
      .map((item) => normalizeUrl(item.url))
      .filter(Boolean)
  );

  return newUrls.map(normalizeUrl).filter((url) => url && !existingSet.has(url));
}
