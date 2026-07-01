import { Skeleton } from "@/domains/movies/components/ui/skeleton";

export const CompareSearchResultSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-2  rounded">
      <Skeleton className=" rounded w-16 h-24" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};

export function CompareSearchResultSkeletonList({ cardLength = 5 }) {
  let arrayOfFives = new Array(cardLength).fill(cardLength);

  return (
    <>
      {arrayOfFives.map((_, indx) => (
        <CompareSearchResultSkeleton key={indx} />
      ))}
    </>
  );
}
