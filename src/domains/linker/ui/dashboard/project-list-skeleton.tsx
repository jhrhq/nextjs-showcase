"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsListSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20 p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-72 dark:bg-zinc-800" />
      </div>

      {/* Filter Tabs and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-md dark:bg-zinc-800" />
          <Skeleton className="h-8 w-20 rounded-md dark:bg-zinc-800" />
          <Skeleton className="h-8 w-24 rounded-md dark:bg-zinc-800" />
          <Skeleton className="h-8 w-24 rounded-md dark:bg-zinc-800" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 rounded-md dark:bg-zinc-800" />
          <Skeleton className="h-9 w-36 rounded-md dark:bg-zinc-800" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <Card key={index} className="overflow-hidden dark:bg-zinc-900/40 dark:border-zinc-800">
            <CardContent className="p-6 space-y-4">
              {/* Status Badge */}
              <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-20 rounded-md dark:bg-zinc-800" />
                <Skeleton className="h-4 w-4 rounded-full dark:bg-zinc-800" />
              </div>

              {/* Title and Description */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-32 dark:bg-zinc-800" />
                <Skeleton className="h-4 w-48 dark:bg-zinc-800" />
              </div>

              {/* URL Section */}
              <div className="flex items-start gap-3 p-3 bg-zinc-100/60 dark:bg-zinc-900/50 border border-transparent dark:border-zinc-800/50 rounded-lg">
                <Skeleton className="h-8 w-8 rounded-md shrink-0 dark:bg-zinc-800" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-32 dark:bg-zinc-800" />
                  <Skeleton className="h-3 w-40 dark:bg-zinc-800" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-6 py-4 border-t dark:border-zinc-800/60 flex items-center justify-between">
              <Skeleton className="h-4 w-24 dark:bg-zinc-800" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded dark:bg-zinc-800" />
                <Skeleton className="h-4 w-20 dark:bg-zinc-800" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
