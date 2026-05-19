"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsListSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Filter Tabs and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Card 1 - Portfolio Site */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-4">
            {/* Status Badge */}
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* URL Section */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-md shrink-0" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardFooter>
        </Card>

        {/* Project Card 2 - Blog Platform */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-4">
            {/* Status Badge */}
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* URL Section */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-md shrink-0" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardFooter>
        </Card>

        {/* Project Card 3 - TechCorp Website */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-4">
            {/* Status Badge */}
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* URL Section */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-md shrink-0" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
