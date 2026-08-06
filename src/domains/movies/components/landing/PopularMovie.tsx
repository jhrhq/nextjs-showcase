import MovieCard from "@/components/landing/MovieCard";
import { getPopularMovies } from "@/domains/movies/services/tmdb";

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
