"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SiteReportSkeletonPage() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-transparent">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-64 dark:bg-zinc-800" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-72 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-full max-w-105 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-48 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="dark:bg-zinc-900/40 dark:border-zinc-800">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24 dark:bg-zinc-800" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-24 dark:bg-zinc-800" />
              <Skeleton className="h-3 w-28 dark:bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="dark:bg-zinc-900/40 dark:border-zinc-800">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-56 dark:bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-70 w-full rounded-xl dark:bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="dark:bg-zinc-900/40 dark:border-zinc-800">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24 dark:bg-zinc-800" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-20 dark:bg-zinc-800" />
              <Skeleton className="h-3 w-24 dark:bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Link Quality */}
      <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-48 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-64 dark:bg-zinc-800" />
        </CardHeader>
        <CardContent className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32 dark:bg-zinc-800" />
                <Skeleton className="h-5 w-14 rounded-md dark:bg-zinc-800" />
              </div>
              <Skeleton className="h-2 w-full dark:bg-zinc-800" />
              <Skeleton className="h-3 w-28 dark:bg-zinc-800" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance */}
      <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-52 dark:bg-zinc-800" />
        </CardHeader>
        <CardContent className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28 dark:bg-zinc-800" />
                <Skeleton className="h-4 w-10 dark:bg-zinc-800" />
              </div>
              <Skeleton className="h-3 w-full dark:bg-zinc-800" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-56 dark:bg-zinc-800" />
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border dark:border-zinc-800">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b dark:border-zinc-800 bg-muted/40 dark:bg-zinc-900/50 px-4 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-24 dark:bg-zinc-800" />
              ))}
            </div>
            {/* Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 items-center border-b dark:border-zinc-800 px-4 py-5 last:border-0"
              >
                <Skeleton className="h-4 w-40 dark:bg-zinc-800" />
                <Skeleton className="h-5 w-10 dark:bg-zinc-800" />
                <Skeleton className="h-5 w-10 dark:bg-zinc-800" />
                <Skeleton className="h-5 w-14 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="dark:bg-zinc-900/40 dark:border-zinc-800">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-52 dark:bg-zinc-800" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between rounded-lg border dark:border-zinc-800 p-3 dark:bg-zinc-900/20"
                >
                  <Skeleton className="h-4 w-32 dark:bg-zinc-800" />
                  <Skeleton className="h-5 w-16 dark:bg-zinc-800" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
        <CardHeader>
          <div className="flex gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-28 dark:bg-zinc-800" />
            ))}
          </div>
        </CardHeader>
        <Separator className="dark:bg-zinc-800" />
        <CardContent className="pt-6">
          <Skeleton className="h-90 w-full rounded-xl dark:bg-zinc-800" />
        </CardContent>
      </Card>

      {/* Final Stats */}
      <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-52 dark:bg-zinc-800" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-4 w-32 dark:bg-zinc-800" />
          <Skeleton className="h-4 w-full dark:bg-zinc-800" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
            <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
