import { Suspense } from "react";
import HomeSections from "@/domains/movies/components/landing/HomeSections";
import MoreLikeThisList from "@/domains/movies/components/movie-details/MoreLikeThisList";
import { MovieSkeletonCardList } from "@/domains/movies/components/skeletons/MovieSkeleton";

const MoreLikeThis = ({ movieId }) => {
  return (
    <div className="container mx-auto px-4 pb-8 pt-12 mt-4">
      <HomeSections sectionTitle={"More Like This"}>
        <Suspense fallback={<MovieSkeletonCardList />}>
          <MoreLikeThisList movieId={movieId} />
        </Suspense>
      </HomeSections>
    </div>
  );
};

export default MoreLikeThis;
