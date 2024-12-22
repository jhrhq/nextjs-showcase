import Navbar from "@/components/Navbar";
import SearchMovieCard from "@/components/search-result/SearchMovieCard";
import { getMovieWithKeyWord } from "@/lib/movie-info";

const SearchResult = async ({ searchParams: { query } }) => {
  const data = await getMovieWithKeyWord(query);
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Search Stats */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-gray-400">
            Found {data?.results.length ?? 0} results
          </p>
        </div>
        {/* Filters and Sort Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.results.map((movie) => (
            <SearchMovieCard key={movie.id} {...movie} />
          ))}
          {/* Add more dummy results as needed */}
        </div>
      </main>
    </>
  );
};

export default SearchResult;
