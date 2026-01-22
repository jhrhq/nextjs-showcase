"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
// types.ts
export interface DummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface DummyPostsResponse {
  posts: DummyPost[];
  total: number;
  skip: number;
  limit: number;
}
export const usePosts = () => {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<DummyPostsResponse>(`https://dummyjson.com/posts?limit=${limit}&skip=${pageParam}`);
      return res.data; // { posts, total, skip, limit }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.posts.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};

const PostsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = usePosts();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton key={idx} className="h-20 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (status === "error") return <p>Error loading posts</p>;

  return (
    <ScrollArea className="h-[80vh] w-full space-y-4 pr-2">
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
            <Card key={post.id} className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.body}</p>
            </Card>
          ))}
        </React.Fragment>
      ))}

      {/* Sentinel / Loading */}
      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isFetchingNextPage && <Skeleton className="h-20 w-full rounded-md" />}
        {!hasNextPage && <p className="text-sm text-muted-foreground">No more posts</p>}
      </div>
    </ScrollArea>
  );
};

export default PostsList;
