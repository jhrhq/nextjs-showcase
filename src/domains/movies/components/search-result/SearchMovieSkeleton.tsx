import SearchHeader from "@/domains/movies/components/search-result/SearchHeader";
import { MovieSkeletonCardList } from "../skeletons/HeroMovieSkeleton";

const SearchMovieSkeleton = ({ text, movieLength = 0 }: { text: string; movieLength?: number }) => {
  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <SearchHeader text={text} movieLength={movieLength} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieSkeletonCardList />
      </div>
    </main>
  );
};

export default SearchMovieSkeleton;
