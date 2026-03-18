"use client";

import { Loader2, SearchX, Wifi } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UrlCard } from "./url-card";
import { useInfiniteUrls } from "./use-infinite-urls";

// ── Loading skeleton ───────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 border bg-card">
      <Skeleton className="size-8 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="flex gap-2">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3.5 w-14" />
        </div>
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

// ── Empty / error states ───────────────────────────────────────────────────

function EmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center px-4">
      <SearchX className="size-8 text-muted-foreground/50" aria-hidden="true" />
      <p className="text-sm font-medium text-muted-foreground">No results found</p>
      {search && <p className="text-xs text-muted-foreground/70">No URLs match &quot;{search}&quot;</p>}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center px-4">
      <Wifi className="size-8 text-destructive/50" aria-hidden="true" />
      <p className="text-sm font-medium text-destructive">Failed to load</p>
      <p className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────

interface UrlSidebarProps {
  /** Set of URLs already present in the form */
  addedUrls: Set<string>;
  /** Called when the user clicks "Add" on a URL card */
  onAddUrl: (url: string) => void;
}

// ── Sidebar ────────────────────────────────────────────────────────────────

export function UrlSidebar({ addedUrls, onAddUrl }: UrlSidebarProps) {
  const { urls, isLoading, isFetchingMore, hasMore, totalCount, error, search, setSearch, sentinelRef } =
    useInfiniteUrls();

  return (
    <TooltipProvider delayDuration={200}>
      {/*
        Sticky container — the parent <aside> must NOT have overflow-hidden.
        height = 100vh, flex column so header stays fixed and list scrolls.
      */}
      <div className="sticky top-0 h-screen flex flex-col border-l bg-background">
        {/* ── Fixed header ──────────────────────────────────────────────── */}
        <div className="shrink-0 px-4 pt-5 pb-3 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold">Browse URLs</h2>
            {!isLoading && (
              <span className="text-[11px] text-muted-foreground tabular-nums">{totalCount} available</span>
            )}
          </div>

          {/* Search */}
          <Input
            type="search"
            placeholder="Search by name, domain, category…"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-sm"
            aria-label="Search URLs"
          />
        </div>

        <Separator />

        {/* ── Scrollable list ──────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" aria-live="polite" aria-busy={isLoading}>
          {/* Initial loading skeletons */}
          {isLoading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

          {/* Error state */}
          {!isLoading && error && <ErrorState message={error} />}

          {/* Empty state */}
          {!isLoading && !error && urls.length === 0 && <EmptyState search={search} />}

          {/* URL cards */}
          {!isLoading &&
            urls.map((item) => (
              <UrlCard key={item.id} item={item} isAdded={addedUrls.has(item.url)} onAdd={onAddUrl} />
            ))}

          {/* Fetch-more loading indicator */}
          {isFetchingMore && (
            <div className="flex justify-center py-3">
              <Loader2 className="size-4 animate-spin text-muted-foreground" aria-label="Loading more URLs" />
            </div>
          )}

          {/* End-of-list message */}
          {!isLoading && !hasMore && urls.length > 0 && (
            <p className="text-center text-[11px] text-muted-foreground py-3">All {totalCount} URLs loaded</p>
          )}

          {/*
            IntersectionObserver sentinel.
            When this div scrolls into view, the hook fires loadMore().
          */}
          {hasMore && !isFetchingMore && <div ref={sentinelRef} className="h-1" aria-hidden="true" />}
        </div>
      </div>
    </TooltipProvider>
  );
}
