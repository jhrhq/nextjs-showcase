import SearchMovieCard from "@/domains/movies/components/search-result/SearchMovieCard";

const SearchMovieList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((movie) => (
        <SearchMovieCard key={movie.id} {...movie} />
      ))}
      {/* Add more dummy results as needed */}
    </div>
  );
};

export default SearchMovieList;
