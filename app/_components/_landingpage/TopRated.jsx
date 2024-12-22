import MovieCard from "@/components/landing/MovieCard";
import { getTopRatedMovies } from "@/lib/movie-info";

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
