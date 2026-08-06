import { Suspense } from "react";
import CastList from "@/domains/movies/components/movie-details/CastList";
import CastSkeleton from "@/domains/movies/components/movie-details/CastSkeleton";

const CastLists = async ({ movieId }: { movieId: string }) => {
  return (
    <div className="mb-8">
      <Suspense fallback={<CastSkeleton />}>
        <CastList movieId={movieId} />
      </Suspense>
    </div>
  );
};

export default CastLists;
