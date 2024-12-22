import CastList from "@/app/_components/_movie-details/_CastList";
import CastSkeleton from "@/components/movie-details/CastSkeleton";
import { Suspense } from "react";

const CastLists = async ({ movieId }) => {
  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Cast</h3>

      <Suspense fallback={<CastSkeleton />}>
        <CastList movieId={movieId} />
      </Suspense>
    </div>
  );
};

export default CastLists;
