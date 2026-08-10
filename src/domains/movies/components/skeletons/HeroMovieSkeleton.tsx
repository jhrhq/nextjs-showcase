import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <div id="hero-skeleton" className="relative h-screen bg-background">
      {/* Gradient overlay mimicking the real component */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

      {/* Content wrapper */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl z-10 w-full">
        {/* Title skeleton */}
        <Skeleton className="h-10 md:h-12 lg:h-14 rounded-md w-3/4 mb-4" />

        {/* Overview skeleton (3 lines) */}
        <div className="space-y-2 mb-6 max-w-2xl">
          <Skeleton className="h-4 md:h-5 rounded-md w-full" />
          <Skeleton className="h-4 md:h-5 rounded-md w-5/6" />
          <Skeleton className="h-4 md:h-5 rounded-md w-2/3" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-11 w-32 rounded-lg" />
      </div>
    </div>
  );
};

export default HeroSkeleton;

export const MovieCardSkeleton = () => {
  return (
    <div className="shrink-0 w-48">
      {/* Poster Aspect Ratio Container */}
      <Skeleton className="rounded-lg aspect-2/3 w-full" />

      {/* Text Meta Container */}
      <div className="mt-2 space-y-1.5">
        {/* Title Placeholder */}
        <Skeleton className="h-4 w-4/5" />

        {/* Release Date Placeholder */}
        <Skeleton className="h-3 w-2/5" />
      </div>
    </div>
  );
};

export function MovieSkeletonCardList({ cardLength = 5 }) {
  const arrayOfFives = new Array(cardLength).fill(cardLength);

  return (
    <>
      {arrayOfFives.map((_, indx) => (
        <MovieCardSkeleton key={indx} />
      ))}
    </>
  );
}
