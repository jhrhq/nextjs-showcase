"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { fetchSidebarPage } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/api";
import type { SidebarPost } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrphanPostCardProps {
  post: SidebarPost;
  onSelect: (url: string) => void;
  onRemove: (postId: number) => void;
}

function OrphanPostCard({ post, onSelect, onRemove }: OrphanPostCardProps) {
  return (
    <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect(post.slug)}>
      <CardContent className="p-3 space-y-1">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] h-4 py-0">
            Post
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-[10px] text-primary hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(post.id);
            }}
          >
            Remove from suggestions
          </Button>
        </div>
        <p className="text-sm font-medium leading-snug line-clamp-2">{post.title}</p>
        <p className="text-[11px] text-muted-foreground truncate">{post.slug}</p>
      </CardContent>
    </Card>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface OrphanPostSidebarProps {
  /**
   * Called when the user clicks a post card.
   * Receives the fully-qualified post URL which should be injected into the
   * target URL form and trigger an automatic submission.
   */
  onSelectPost: (url: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Right-hand sidebar that lists orphan posts using infinite scroll.
 * Clicking a post card calls `onSelectPost` with the post's URL.
 */
export function OrphanPostSidebar({ onSelectPost }: OrphanPostSidebarProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["sidebar-orphan-posts"],
    queryFn: fetchSidebarPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const posts: SidebarPost[] = data?.pages.flatMap((page) => page.items) ?? [];

  // ── Infinite scroll via IntersectionObserver ──────────────────────────────

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver]);

  // ── Placeholder handler for "Remove" – wire up mutation in production ─────

  const handleRemove = useCallback((postId: number) => {
    console.info("Remove post from suggestions:", postId);
    // TODO: call your removeFromSuggestions mutation here
  }, []);

  return (
    <aside className="w-72 border-l flex flex-col h-screen bg-background shrink-0">
      {/* ── Header ── */}
      <div className="p-4 border-b space-y-3 shrink-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]">
            Post
          </Badge>
          <span className="text-sm font-semibold truncate flex-1">Why Does My Bissell C…</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden />
        </div>

        <Tabs defaultValue="orphans">
          <TabsList className="w-full">
            <TabsTrigger value="orphans" className="flex-1 text-xs">
              Orphans
            </TabsTrigger>
            <TabsTrigger value="search" className="flex-1 text-xs">
              Search
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ── Scrollable Post List ── */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-20 w-full rounded-lg" />)
            : posts.map((post) => (
                <OrphanPostCard key={post.id} post={post} onSelect={onSelectPost} onRemove={handleRemove} />
              ))}

          {/* Sentinel element — triggers fetchNextPage when scrolled into view */}
          <div ref={loaderRef} className="flex justify-center py-3 min-h-10">
            {isFetchingNextPage && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" aria-label="Loading more posts" />
            )}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
