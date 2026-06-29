import MovieCard from "@/components/landing/MovieCard";
import { getPopularMovies } from "@/lib/movie-info";

const PopularMovie = async () => {
  const data = await getPopularMovies();
  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default PopularMovie;
