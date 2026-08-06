import SearchMovieCard from "@/domains/movies/components/search-result/SearchMovieCard";
import type { TMDBMovie } from "../../types/tmdb-movie.types";

type Props = { data: TMDBMovie[] };

const SearchMovieList = ({ data }: Props) => {
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
