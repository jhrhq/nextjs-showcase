import SearchMessage from "@/app/_components/_search-result/SearchMessage";
import SearchMovieResult from "@/app/_components/_search-result/SearchMovieResult";
import Navbar from "@/components/Navbar";
import SearchMovieSkeleton from "@/components/search-result/SearchMovieSkeleton";
import { Suspense } from "react";

const SearchResult = async ({ searchParams: { query } }) => {
  return (
    <>
      <Navbar />
      {!query ? (
        <SearchMessage />
      ) : (
        <Suspense fallback={<SearchMovieSkeleton text={query} />}>
          <SearchMovieResult query={query} />
        </Suspense>
      )}
    </>
  );
};

export default SearchResult;
