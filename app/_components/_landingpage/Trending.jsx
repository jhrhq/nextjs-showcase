import MovieCard from "@/components/landing/MovieCard";
import { getTrendingMovies } from "@/lib/movie-info";

const Trending = async () => {
  const data = await getTrendingMovies();
  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default Trending;
