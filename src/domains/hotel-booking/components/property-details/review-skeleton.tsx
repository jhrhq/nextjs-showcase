import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsSkeleton() {
  return (
    <section className="w-full bg-white dark:bg-gray-900 py-6">
      <div className="container max-w-6xl mx-auto space-y-6">
        {/* 1. Header Row (Title, Summary & Button) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Title: "Reviews" */}
            <Skeleton className="h-7 w-24 rounded-lg" />

            {/* Rating Summary: Star + Score + Count */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-8 rounded" />
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>

          {/* "Write a Review" Button Placeholder */}
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>

        {/* 2. Reviews Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-3">
              {/* User Info (Avatar + Name & Date) */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>

              {/* Star Rating Line */}
              <div className="flex gap-1 pt-1">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <Skeleton key={starIdx} className="h-4 w-4 rounded-xs" />
                ))}
              </div>

              {/* Review Text Lines */}
              <div className="space-y-2 pt-1">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
