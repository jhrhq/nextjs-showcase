import { Skeleton } from "@/components/ui/skeleton";

export default function ManagePropertiesSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Header Section (Title, Subtitle & Action Button) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            {/* Title: "Manage Properties" */}
            <Skeleton className="h-8 w-56 rounded-lg" />
            {/* Subtitle */}
            <Skeleton className="h-4 w-80 sm:w-96 rounded-md" />
          </div>

          {/* "+ Create Hotel" Button Skeleton */}
          <Skeleton className="h-10 w-36 rounded-xl shrink-0" />
        </div>

        {/* 2. Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200/80 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner with Badges */}
                <div className="relative w-full aspect-16/10">
                  <Skeleton className="w-full h-full rounded-none" />
                  {/* Status Badge (Top-Left) */}
                  <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-md" />
                  {/* Rating Badge (Top-Right) */}
                  <Skeleton className="absolute top-3 right-3 h-6 w-12 rounded-full" />
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* Category & Price Row */}
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </div>

                  {/* Property Name */}
                  <Skeleton className="h-6 w-3/4 rounded-md" />

                  {/* Location Line */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-40 rounded" />
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800" />

                  {/* Property Specs (Guests, Beds, Baths) */}
                  <div className="flex items-center gap-4 pt-1">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions (View, Edit, Delete) */}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between">
                <Skeleton className="h-5 w-5 rounded-md" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-5 w-5 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
