"use client";

import * as React from "react";
import { fetchMockUrls } from "./mock-urls";
import type { SidebarUrl } from "./sidebar-url";

interface UseInfiniteUrlsState {
  urls: SidebarUrl[];
  isLoading: boolean; // initial page load
  isFetchingMore: boolean; // subsequent page loads
  hasMore: boolean;
  totalCount: number;
  error: string | null;
}

interface UseInfiniteUrlsReturn extends UseInfiniteUrlsState {
  search: string;
  setSearch: (value: string) => void;
  loadMore: () => void;
  sentinelRef: React.RefCallback<HTMLDivElement>;
}

export function useInfiniteUrls(): UseInfiniteUrlsReturn {
  const [search, setSearchRaw] = React.useState("");
  const [state, setState] = React.useState<UseInfiniteUrlsState>({
    urls: [],
    isLoading: true,
    isFetchingMore: false,
    hasMore: false,
    totalCount: 0,
    error: null,
  });

  const nextPageRef = React.useRef<number | null>(1);
  const isFetchingRef = React.useRef(false);
  const searchRef = React.useRef(search);
  searchRef.current = search;

  // ── Fetch a single page ───────────────────────────────────────────────────

  const fetchPage = React.useCallback(async (page: number, isInitial: boolean) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setState((prev) => ({
      ...prev,
      isLoading: isInitial,
      isFetchingMore: !isInitial,
      error: null,
    }));

    try {
      const result = await fetchMockUrls(page, searchRef.current);
      nextPageRef.current = result.nextPage;

      setState((prev) => ({
        urls: isInitial ? result.data : [...prev.urls, ...result.data],
        isLoading: false,
        isFetchingMore: false,
        hasMore: result.nextPage !== null,
        totalCount: result.totalCount,
        error: null,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isFetchingMore: false,
        error: "Failed to load URLs. Please try again.",
      }));
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  // ── Initial load + search reset ───────────────────────────────────────────

  React.useEffect(() => {
    nextPageRef.current = 1;
    isFetchingRef.current = false;
    setState({
      urls: [],
      isLoading: true,
      isFetchingMore: false,
      hasMore: false,
      totalCount: 0,
      error: null,
    });
    void fetchPage(1, true);
  }, [fetchPage]);

  // ── Manual load-more ──────────────────────────────────────────────────────

  const loadMore = React.useCallback(() => {
    if (nextPageRef.current === null || isFetchingRef.current) return;
    void fetchPage(nextPageRef.current, false);
  }, [fetchPage]);

  // ── IntersectionObserver sentinel ────────────────────────────────────────

  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const sentinelRef: React.RefCallback<HTMLDivElement> = React.useCallback(
    (node) => {
      observerRef.current?.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) loadMore();
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [loadMore]
  );

  // ── Debounced search ──────────────────────────────────────────────────────

  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSearch = React.useCallback((value: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setSearchRaw(value), 300);
  }, []);

  return { ...state, search, setSearch, loadMore, sentinelRef };
}
