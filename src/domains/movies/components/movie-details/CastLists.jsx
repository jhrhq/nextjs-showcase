import { Suspense } from "react";
import CastList from "@/domains/movies/components/movie-details/CastList";
import CastSkeleton from "@/domains/movies/components/movie-details/CastSkeleton";

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
