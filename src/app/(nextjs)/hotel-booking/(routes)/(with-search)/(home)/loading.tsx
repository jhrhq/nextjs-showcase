import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container px-6 py-8 mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              {/* Card Image + Badge Overlay */}
              <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl">
                <Skeleton className="h-full w-full" />
                {/* Bed Badge Skeleton (Top-Right) */}
                <Skeleton className="absolute top-3 right-3 h-6 w-11 rounded-full" />
              </div>

              {/* Card Content Skeleton */}
              <div className="space-y-2 pt-1">
                {/* Title & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-10 rounded-md" />
                </div>

                {/* Subtitle / Address */}
                <Skeleton className="h-4 w-1/2 rounded-md" />

                {/* Price Line */}
                <div className="pt-1">
                  <Skeleton className="h-5 w-28 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 pt-4">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>

        <div className="flex items-center gap-2 pt-6">
          <Skeleton className="h-3.5 w-28 rounded" />
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <Skeleton className="h-3.5 w-12 rounded" />
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <Skeleton className="h-3.5 w-12 rounded" />
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <Skeleton className="h-3.5 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}
