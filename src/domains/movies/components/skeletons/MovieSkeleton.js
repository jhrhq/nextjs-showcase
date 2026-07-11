import { Skeleton } from "@/domains/movies/components/ui/skeleton";

export function MovieSkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[288px] w-[192px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[192px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  );
}

export function MovieSkeletonCardList({ cardLength = 5 }) {
  const arrayOfFives = new Array(cardLength).fill(cardLength);

  return (
    <>
      {arrayOfFives.map((_, indx) => (
        <MovieSkeletonCard key={indx} />
      ))}
    </>
  );
}
