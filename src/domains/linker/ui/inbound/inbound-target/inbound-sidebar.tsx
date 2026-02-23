"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2 } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ALL_SIDEBAR_POSTS = Array.from({ length: 40 }, (_, i) => {
  const titles = [
    "Why Does My Bissell Carpet Cleaner Start Smoking?",
    "How to Clean Vacuum Filter?",
    "Why Does Persil Smell Like Vomit?",
    "Advantages and Disadvantages of Wet and Dry Vacuum Cleaner",
    "Best Carpet Cleaners for Pet Hair 2024",
    "How to Remove Stubborn Carpet Stains",
    "Dyson vs Bissell: Which Is Better?",
    "Steam Cleaning vs Dry Cleaning Carpets",
    "How Often Should You Vacuum Your Home?",
    "Top Robot Vacuums Reviewed",
  ];
  const slugs = [
    "why-does-my-bissell-carpet-cleaner-start-smoking",
    "how-to-clean-vacuum-filter",
    "why-does-persil-smell-like-vomit",
    "advantages-disadvantages-wet-dry-vacuum-cleaner",
    "best-carpet-cleaners-for-pet-hair",
    "how-to-remove-stubborn-carpet-stains",
    "dyson-vs-bissell",
    "steam-cleaning-vs-dry-cleaning",
    "how-often-should-you-vacuum",
    "top-robot-vacuums-reviewed",
  ];
  return {
    id: i + 1,
    title: titles[i % 10],
    slug: `https://cleaningtuts.com/${slugs[i % 10]}/`,
  };
});
async function fetchSidebarPage({ pageParam = 1 }) {
  await sleep(700);
  const PER_PAGE = 8;
  const start = (pageParam - 1) * PER_PAGE;
  const items = ALL_SIDEBAR_POSTS.slice(start, start + PER_PAGE);
  const nextPage = start + PER_PAGE < ALL_SIDEBAR_POSTS.length ? pageParam + 1 : undefined;
  return { items, nextPage };
}

export function InboundSidebar({ onSelectUrl }: { onSelectUrl: (url: string) => void }) {
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["sidebar-posts"],
    queryFn: fetchSidebarPage,
    getNextPageParam: (last) => last.nextPage,
    initialPageParam: 1,
  });

  const posts = data?.pages.flatMap((p) => p.items) ?? [];

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
    <aside className="w-72 border-l bg-background flex flex-col">
      <header className="p-4 border-b space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]">
            Post
          </Badge>
          <span className="text-sm font-semibold truncate flex-1">Select a post</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
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
      </header>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}

          {!isLoading &&
            posts.map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer hover:border-primary"
                onClick={() => onSelectUrl(post.slug)}
              >
                <CardContent className="p-3 space-y-1">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="text-[10px]">
                      Post
                    </Badge>

                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      ✕
                    </Button>
                  </div>

                  <p className="text-sm font-medium line-clamp-2">{post.title}</p>

                  <p className="text-[11px] text-muted-foreground truncate">{post.slug}</p>
                </CardContent>
              </Card>
            ))}

          <div ref={loaderRef} className="flex justify-center py-3 h-10">
            {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
