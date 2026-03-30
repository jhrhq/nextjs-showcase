import { Loader2, SearchX, Wifi, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useInfiniteUrls } from "../create-custom-network/use-infinite-urls";
import { UrlCard } from "./url-card";

// ── Props ──────────────────────────────────────────────────────────
interface UrlSidebarProps {
  addedUrls: Set<string>;
  onAddUrl: (url: string) => void;
}

// ── Sidebar ────────────────────────────────────────────────────────
export function UrlSidebar({ addedUrls, onAddUrl }: UrlSidebarProps) {
  const { urls, isLoading, isFetchingMore, hasMore, totalCount, error, search, setSearch, sentinelRef, refresh } =
    useInfiniteUrls();

  // Mobile: sidebar visibility state
  const [isOpen, setIsOpen] = React.useState(true);

  // Accessibility: announce loading state changes
  const liveRegionRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = isLoading ? "Loading URLs" : `Loaded ${urls.length} of ${totalCount} URLs`;
    }
  }, [isLoading, urls.length, totalCount]);

  return (
    <TooltipProvider delayDuration={200}>
      {/* Mobile: overlay backdrop */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30 transition-opacity",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar container */}
      <aside
        className={cn(
          // Desktop: sticky
          "md:sticky md:top-0 md:h-screen md:w-80 md:shrink-0 md:border-l",
          // Mobile: fixed drawer
          "fixed md:relative inset-y-0 right-0 w-80 bg-background z-40",
          "transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
          // Always visible on desktop
          "md:transform-none"
        )}
        aria-label="URL browser"
      >
        {/* Mobile: close button */}
        <Button
          className="md:hidden absolute top-3 right-3 p-2 rounded-full hover:bg-muted"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="size-5" aria-hidden="true" />
        </Button>

        <div className="h-full flex flex-col">
          {/* Fixed header */}
          <div className="shrink-0 px-4 pt-5 pb-3 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold">Browse URLs</h2>
              {!isLoading && (
                <span className="text-[11px] text-muted-foreground tabular-nums">{totalCount} available</span>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search by name, domain, category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 text-sm pr-8"
                aria-label="Search URLs"
              />
              {search && (
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X className="size-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Scrollable list */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
            role="list"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {/* Accessibility live region */}
            <div ref={liveRegionRef} className="sr-only" aria-live="polite" />

            {/* Initial loading */}
            {isLoading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

            {/* Error state */}
            {!isLoading && error && <ErrorState message={error} onRetry={refresh} />}

            {/* Empty state */}
            {!isLoading && !error && urls.length === 0 && <EmptyState search={search} />}

            {/* URL cards - memoized via React.memo in UrlCard */}
            {!isLoading &&
              urls.map((item) => (
                <UrlCard
                  key={item.id}
                  item={item}
                  isAdded={addedUrls.has(item.url.toLowerCase().trim())}
                  onAdd={onAddUrl}
                />
              ))}

            {/* Fetch-more indicator */}
            {isFetchingMore && (
              <div className="flex justify-center py-3">
                <Loader2 className="size-4 animate-spin text-muted-foreground" aria-label="Loading more URLs" />
              </div>
            )}

            {/* End of list */}
            {!isLoading && !hasMore && urls.length > 0 && (
              <p className="text-center text-[11px] text-muted-foreground py-3">All {totalCount} URLs loaded</p>
            )}

            {/* IntersectionObserver sentinel */}
            {hasMore && !isFetchingMore && <div ref={sentinelRef} className="h-1" aria-hidden="true" />}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

// ── Empty / error states ───────────────────────────────────────────
function EmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center px-4">
      <SearchX className="size-8 text-muted-foreground/50" aria-hidden="true" />
      <p className="text-sm font-medium text-muted-foreground">No results found</p>
      {search && <p className="text-xs text-muted-foreground/70">No URLs match &quot;{search}&quot;</p>}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center px-4">
      <Wifi className="size-8 text-destructive/50" aria-hidden="true" />
      <p className="text-sm font-medium text-destructive">Failed to load</p>
      <p className="text-xs text-muted-foreground max-w-[200px]">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 border bg-card rounded-lg">
      <Skeleton className="size-8 shrink-0 rounded" />
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
