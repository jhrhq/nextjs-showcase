import { Skeleton } from "@/components/ui/skeleton";

export default function EditListingSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* 1. Page Header */}
        <div className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-6">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>

        {/* 2. Photo Gallery / Uploader Section */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-32 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Main Cover Photo Slot */}
            <Skeleton className="col-span-2 sm:col-span-2 aspect-4/3 rounded-2xl" />
            {/* Additional Photo Slots */}
            <Skeleton className="col-span-1 aspect-square sm:aspect-auto rounded-2xl" />
            <Skeleton className="col-span-1 aspect-square sm:aspect-auto rounded-2xl" />
            <Skeleton className="col-span-1 aspect-square sm:aspect-auto rounded-2xl" />
          </div>
        </div>

        {/* 3. Property Basics & Specs Counters (Guests, Bedrooms, Beds, Baths) */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-36 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-gray-200/80 dark:border-gray-800 rounded-2xl">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16 rounded" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-5 w-8 rounded mx-auto" />
                  <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Price & Location Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nightly Price Input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          {/* Property Category Input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          {/* Location / Address Input */}
          <div className="sm:col-span-2 space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>

        {/* 5. Amenities Multi-Select Grid */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Skeleton className="h-6 w-44 rounded-md" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>

          {/* 3-Column Amenities Checkbox Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 border border-gray-200/80 dark:border-gray-800 rounded-2xl">
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/60"
              >
                <Skeleton className="h-5 w-5 rounded-md shrink-0" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* 6. Description Field & Save Action Footer */}
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>

          {/* Sticky/Bottom Save CTA */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Skeleton className="h-11 w-28 rounded-xl" />
            <Skeleton className="h-11 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
