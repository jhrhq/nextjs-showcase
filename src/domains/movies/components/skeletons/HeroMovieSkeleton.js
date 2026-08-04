import { Skeleton } from "@/components/ui/skeleton";

export function HeroMovieSkeletonCard() {
  return (
    <div id="hero" className="relative h-screen bg-gray-800 bg-opacity-50 backdrop-blur-lg">
      {/* <Skeleton className="h-4/6 w-full rounded-xl" /> */}
      <div className="absolute inset-0 bg-gradient-to-t from-black" />
      <div className="absolute bottom-0 left-0 p-12">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-4 w-[500px] mb-6" />
          <div className="space-y-2 max-w-2xl mb-8">
            <Skeleton className="h-4 w-[800px]" />
            <Skeleton className="h-4 w-[800px]" />
            <Skeleton className="h-4 w-[700px]" />
          </div>

          <Skeleton className="h-8 w-[150px] px-8 py-2" />
        </div>
      </div>
    </div>
  );
}
