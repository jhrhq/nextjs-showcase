import { Skeleton } from "@/components/ui/skeleton";

const CastSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="text-center">
        <Skeleton className="w-24 h-24 rounded-full object-cover mb-2" />
        <Skeleton className="w-24 h-2" />
      </div>
      <div className="text-center">
        <Skeleton className="w-24 h-24 rounded-full object-cover mb-2" />
        <Skeleton className="w-24 h-2" />
      </div>
      <div className="text-center">
        <Skeleton className="w-24 h-24 rounded-full object-cover mb-2" />
        <Skeleton className="w-24 h-2" />
      </div>
      <div className="text-center">
        <Skeleton className="w-24 h-24 rounded-full object-cover mb-2" />
        <Skeleton className="w-24 h-2" />
      </div>
      <div className="text-center">
        <Skeleton className="w-24 h-24 rounded-full object-cover mb-2" />
        <Skeleton className="w-24 h-2" />
      </div>
    </div>
  );
};

export default CastSkeleton;
