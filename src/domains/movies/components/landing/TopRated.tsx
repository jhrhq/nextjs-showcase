import { getTopRatedMovies } from "@/domains/movies/services/tmdb";
import MovieCard from "./MovieCard";

const TopRatedMovies = async () => {
  const data = await getTopRatedMovies();
  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
};

export default TopRatedMovies;
