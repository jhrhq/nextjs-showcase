import MovieCard from "@/domains/movies/components/landing/MovieCard";
import { getTopRatedMovies } from "@/domains/movies/lib/movie-info";

const TopRatedMovies = async () => {
  const data = await getTopRatedMovies();
  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default TopRatedMovies;
