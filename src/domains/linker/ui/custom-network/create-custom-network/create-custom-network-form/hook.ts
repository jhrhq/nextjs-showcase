import React from "react";
import { useNormalizedSet } from "@/domains/linker/hooks/use-normalized-url-set";
import { useDeboucedValue } from "@/hooks/shared/use-debounced-hook";
import { normalizeUrl } from "./url-utils";

interface UseUrlSyncOptions {
  /** Debounce delay for sidebar updates (prevents re-render thrashing) */
  sidebarDebounceMs?: number;
  /** Debounce delay for parent notification */
  parentDebounceMs?: number;
  /** Optional callback when form URLs change (e.g., sync to backend) */
  onParentUpdate?: (urls: string[]) => void;
}

export type UseUrlSyncReturn = {
  // Form props
  pendingUrls: string[];
  onPendingConsumed: () => void;
  onUrlsChange: (urls: string[]) => void;

  // Sidebar props
  addedUrlsSet: Set<string>; // or whatever type useNormalizedSet returns
  onAddUrl: (url: string) => void;

  // UI helpers
  formUrlCount: number;
  isUrlAdded: (url: string) => boolean;
};

/**
 * Hook to synchronize URL inputs between a sidebar and a form with debounced updates.
 *
 * This hook manages:
 * - A queue of URLs added from a sidebar (`pendingUrls`)
 * - A list of URLs currently in a form (`formUrls`)
 * - Deduplication and normalization of URLs
 * - Debounced updates for UI performance and parent callbacks
 *
 * @param options - Configuration options
 * @param options.sidebarDebounceMs - Delay (ms) for debouncing sidebar-related UI updates (default: 150)
 * @param options.parentDebounceMs - Delay (ms) for debouncing parent update notifications (default: 150)
 * @param options.onParentUpdate - Optional callback triggered with the latest debounced list of raw URL strings
 *
 * @returns An object containing state and handlers for integrating with form and sidebar components
 *
 * @returns.pendingUrls
 * Array of URLs queued from the sidebar to be consumed by the form.
 *
 * @returns.onPendingConsumed
 * Callback to clear the pending URL queue after the form processes them.
 *
 * @returns.onUrlsChange
 * Callback to update the internal form URL state when the form changes.
 *
 * @returns.addedUrlsSet
 * A normalized Set of URLs currently in the form, useful for quick lookup and deduplication.
 *
 * @returns.onAddUrl
 * Callback to add a URL from the sidebar into the pending queue.
 * Prevents duplicates in both the queue and the form.
 *
 * @returns.formUrlCount
 * Number of URLs currently in the form.
 *
 * @returns.isUrlAdded
 * Helper function to check if a given URL (after normalization) already exists in the form.
 *
 * @example
 * const {
 *   pendingUrls,
 *   onPendingConsumed,
 *   onUrlsChange,
 *   addedUrlsSet,
 *   onAddUrl,
 *   formUrlCount,
 *   isUrlAdded,
 * } = useUrlSyncOptions({
 *   onParentUpdate: (urls) => console.log(urls),
 * });
 *
 * onAddUrl("https://example.com");
 */

export function useUrlSyncOptions({
  sidebarDebounceMs = 150,
  onParentUpdate,
}: UseUrlSyncOptions = {}): UseUrlSyncReturn {
  const [pendingUrls, setPendingUrls] = React.useState<string[]>([]);
  const [formUrls, setFormUrls] = React.useState<string[]>([]);

  const debouncedFormUrls = useDeboucedValue(formUrls, sidebarDebounceMs);

  // Normalized Set for lookups (used for sidebars);
  const addedUrlsSet = useNormalizedSet(debouncedFormUrls);
  // Notify parent of changes
  //biome-ignore lint: suppress dependency
  React.useMemo(() => {
    if (onParentUpdate) onParentUpdate(debouncedFormUrls);
  }, [debouncedFormUrls]);

  /** Add URL from sidebar → queue for form */
  const handleAddUrl = React.useCallback(
    (url: string) => {
      const normalized = normalizeUrl(url);
      if (!normalized) return;

      setPendingUrls((prev) => {
        // Prevent duplicates in queue or form
        const inQueue = prev.some((u) => normalizeUrl(u) === normalized);
        const inForm = addedUrlsSet.has(normalized);

        if (inQueue || inForm) return prev;
        return [...prev, url]; // Keep original case for display
      });
    },
    [addedUrlsSet]
  );

  const handlePendingConsumed = React.useCallback(() => {
    setPendingUrls([]);
  }, []);

  /** Form URLs changed → update local state */
  const handleUrlsChange = React.useCallback((urls: string[]) => {
    setFormUrls(urls);
  }, []);

  const isUrlAdded = React.useCallback((url: string) => addedUrlsSet.has(normalizeUrl(url) || ""), [addedUrlsSet]);

  return {
    // Form props
    pendingUrls,
    onPendingConsumed: handlePendingConsumed,
    onUrlsChange: handleUrlsChange,

    // Sidebar props
    addedUrlsSet,
    onAddUrl: handleAddUrl,

    // UI helpers
    formUrlCount: formUrls.length,
    isUrlAdded,
  };
}
