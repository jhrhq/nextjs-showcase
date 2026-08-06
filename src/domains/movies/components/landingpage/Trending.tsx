import MovieCard from "@/domains/movies/components/landing/MovieCard";
import { getTrendingMovies } from "@/domains/movies/services/tmdb";

const Trending = async () => {
  const data = await getTrendingMovies();
  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
};

export default Trending;
