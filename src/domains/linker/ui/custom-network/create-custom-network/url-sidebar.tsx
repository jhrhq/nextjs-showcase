"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, SearchX, Wifi } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { fetchMockUrls } from "./mock-urls";
import { UrlCard } from "./url-card";

function CardSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 border border-border bg-card rounded-xl shadow-2xs">
      <Skeleton className="size-8 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-1.5">
        <div className="flex gap-2">
          <Skeleton className="h-3.5 w-28 rounded-md" />
          <Skeleton className="h-3.5 w-14 rounded-md" />
        </div>
        <Skeleton className="h-3 w-24 rounded-md" />
        <Skeleton className="h-3 w-full rounded-md" />
      </div>
    </div>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center px-4">
      <SearchX className="size-8 text-muted-foreground/50" aria-hidden="true" />
      <p className="text-sm font-medium text-foreground">No results found</p>
      {search && <p className="text-xs text-muted-foreground">No URLs match &quot;{search}&quot;</p>}
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

interface UrlSidebarProps {
  addedUrls: Set<string>;
  onAddUrl: (url: string) => void;
}

export function UrlSidebar({ addedUrls, onAddUrl }: UrlSidebarProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ["sidebar-posts"],
    queryFn: fetchMockUrls,
    getNextPageParam: (last) => last.nextPage,
    initialPageParam: 1,
  });
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const posts = data?.pages.flatMap((p) => p.items) ?? [];
  const totalPosts = data?.pages[0].total ?? 0;

  const onIntersect = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  React.useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.1,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="sticky top-0 h-screen flex flex-col border-l border-border bg-sidebar text-sidebar-foreground max-w-80 shadow-2xs">
          <div className="shrink-0 px-4 pt-5 pb-3 space-y-3 bg-sidebar">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-sidebar-foreground">Browse URLs</h2>
              {!isLoading && (
                <span className="text-[11px] text-muted-foreground tabular-nums">{totalPosts} available</span>
              )}
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" aria-live="polite" aria-busy={isLoading}>
            {isLoading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

            {!isLoading && error && <ErrorState message={error.message} />}

            {!isLoading && !error && posts.length === 0 && <EmptyState search={""} />}

            {!isLoading &&
              posts.map((item) => (
                <UrlCard
                  key={item.id}
                  item={item}
                  isAdded={addedUrls.has(item.url.endsWith("/") ? item.url : `${item.url}/`)}
                  onAdd={onAddUrl}
                />
              ))}

            {isFetchingNextPage && (
              <div className="flex justify-center py-3">
                <Loader2 className="size-4 animate-spin text-muted-foreground" aria-label="Loading more URLs" />
              </div>
            )}

            {!isLoading && !hasNextPage && posts.length > 0 && (
              <p className="text-center text-[11px] text-muted-foreground py-3">All {totalPosts} URLs loaded</p>
            )}

            {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} className="h-1" aria-hidden="true" />}
          </div>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
}
