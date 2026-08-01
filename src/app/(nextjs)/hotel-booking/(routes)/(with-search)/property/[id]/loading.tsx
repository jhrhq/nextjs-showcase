import { Skeleton } from "@/components/ui/skeleton";

export default function HotelDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container max-w-6xl px-6 py-8 mx-auto space-y-8">
        {/* 1. Header Section */}
        <div className="space-y-3">
          {/* Title */}
          <Skeleton className="h-8 w-1/3 rounded-lg" />

          {/* Meta Info Line (Rating, Reviews, Address) */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-12 rounded" />
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Skeleton className="h-4 w-16 rounded" />
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Skeleton className="h-4 w-48 rounded" />
          </div>
        </div>

        {/* 2. Photo Gallery Grid (1 Main + 4 Sub-images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-95 sm:h-110">
          {/* Main Large Image (Left) */}
          <Skeleton className="w-full h-full rounded-2xl" />

          {/* 2x2 Grid (Right) */}
          <div className="hidden md:grid grid-cols-2 gap-3 h-full">
            <Skeleton className="w-full h-full rounded-2xl" />
            <Skeleton className="w-full h-full rounded-2xl" />
            <Skeleton className="w-full h-full rounded-2xl" />
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>

        {/* 3. Main Content Grid (Details Left + Reservation Card Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          {/* Left Column: Property Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host & Features */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-2/3 rounded-md" />

              {/* Specs (Guests, Bedrooms, Beds) */}
              <div className="flex items-center gap-6 pt-1">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            {/* About Section */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            {/* Amenities Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-44 rounded-md" />

              <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
                <Skeleton className="h-5 w-28 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-28 rounded" />
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-6 bg-white dark:bg-gray-900">
              {/* Price & Rating Row */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-28 rounded-md" />
                <Skeleton className="h-5 w-12 rounded-md" />
              </div>

              {/* Date Inputs Grid */}
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>

              {/* Guest Picker */}
              <Skeleton className="h-14 w-full rounded-xl" />

              {/* Reserve Button */}
              <Skeleton className="h-12 w-full rounded-xl" />

              {/* Footer Note */}
              <Skeleton className="h-3.5 w-40 mx-auto rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
