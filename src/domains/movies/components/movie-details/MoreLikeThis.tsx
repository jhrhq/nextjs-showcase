import { Suspense } from "react";
import HomeSections from "@/domains/movies/components/landing/HomeSections";
import MoreLikeThisList from "@/domains/movies/components/movie-details/MoreLikeThisList";
import { MovieSkeletonCardList } from "../skeletons/HeroMovieSkeleton";

const MoreLikeThis = ({ movieId }: { movieId: string }) => {
  return (
    <div className="container mx-auto px-4 pb-12 pt-8 mt-6 border-t border-border">
      <HomeSections sectionTitle="More Like This">
        <Suspense fallback={<MovieSkeletonCardList />}>
          <MoreLikeThisList movieId={movieId} />
        </Suspense>
      </HomeSections>
    </div>
  );
};

export default MoreLikeThis;
