import { Suspense } from "react";
import Navbar from "@/domains/movies/components/Navbar";
import SearchMessage from "@/domains/movies/components/search-result/SearchMessage";
import SearchMovieResult from "@/domains/movies/components/search-result/SearchMovieResult";
import SearchMovieSkeleton from "@/domains/movies/components/search-result/SearchMovieSkeleton";

const SearchResult = async ({ searchParams }) => {
  const { query } = await searchParams;

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
