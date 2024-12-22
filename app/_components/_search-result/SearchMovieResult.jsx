import SearchHeader from "@/app/_components/_search-result/SearchHeader";
import SearchMovieList from "@/app/_components/_search-result/SearchMovieList";
import { getMovieWithKeyWord } from "@/lib/movie-info";

const SearchMovieResult = async ({ query }) => {
  const data = await getMovieWithKeyWord(query);
  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <SearchHeader text={query} movieLength={data?.results.length} />
      {/* Filters and Sort Section */}
      <SearchMovieList data={data.results} />
    </main>
  );
};

export default SearchMovieResult;
