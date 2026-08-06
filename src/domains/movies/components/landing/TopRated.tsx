import MovieCard from "@/components/landing/MovieCard";
import { getTopRatedMovies } from "@/domains/movies/services/tmdb";

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
