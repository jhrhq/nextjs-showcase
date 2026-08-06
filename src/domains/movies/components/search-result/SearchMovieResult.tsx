import SearchHeader from "@/domains/movies/components/search-result/SearchHeader";
import SearchMovieList from "@/domains/movies/components/search-result/SearchMovieList";
import { getMovieWithKeyWord } from "@/domains/movies/services/tmdb";

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
