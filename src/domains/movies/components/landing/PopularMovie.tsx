import { getPopularMovies } from "@/domains/movies/services/tmdb";
import MovieCard from "./MovieCard";

const PopularMovie = async () => {
  const data = await getPopularMovies();
  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
};

export default PopularMovie;
