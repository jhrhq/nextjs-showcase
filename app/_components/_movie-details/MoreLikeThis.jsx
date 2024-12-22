import MoreLikeThisList from "@/app/_components/_movie-details/MoreLikeThisList";
import HomeSections from "@/components/landing/HomeSections";
import { MovieSkeletonCardList } from "@/components/skeletons/MovieSkeleton";
import { Suspense } from "react";

const MoreLikeThis = ({ movieId }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeSections sectionTitle={"More Like This"}>
        <Suspense fallback={<MovieSkeletonCardList />}>
          <MoreLikeThisList movieId={movieId} />
        </Suspense>
      </HomeSections>
    </div>
  );
};

export default MoreLikeThis;
