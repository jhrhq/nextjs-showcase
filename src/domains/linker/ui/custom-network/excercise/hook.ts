import React, { useMemo } from "react";
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

/**
 * Centralized hook for managing URL state between sidebar and form
 * Handles: deduplication, normalization, debouncing, queue management
 */

export function useUrlSyncOptions({
  sidebarDebounceMs = 150,
  parentDebounceMs = 150,
  onParentUpdate,
}: UseUrlSyncOptions = {}): UseUrlSyncReturn {
  const [pendingUrls, setPendingUrls] = React.useState<string[]>([]);
  const [formUrls, setFormUrls] = React.useState<Array<{ url: string }>>([]);

  // Extract raw URL strings for parent notification
  const rawFormUrls = React.useMemo(() => formUrls.map((u) => u.url).filter(Boolean), [formUrls]);

  // Debounced values for UI that doesn't need instant updates
  const debouncedFormUrls = useDeboucedValue(formUrls, sidebarDebounceMs);
  const debouncedRawFormUrls = useDeboucedValue(rawFormUrls, parentDebounceMs);

  // Normalized Set for lookups (used for sidebars);
  const addedUrlsSet = useNormalizedSet(debouncedFormUrls.map((u) => u.url));

  // Notify parent of changes
  //biome-ignore lint: suppress dependency
  React.useMemo(() => {
    if (onParentUpdate) onParentUpdate(debouncedRawFormUrls);
  }, [debouncedRawFormUrls]);

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

  /** Form consumed pending URLs → clear queue */
  const handlePendingConsumed = React.useCallback(() => {
    setPendingUrls([]);
  }, []);

  /** Form URLs changed → update local state */
  const handleUrlsChange = React.useCallback((urls: Array<{ url: string }>) => {
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
