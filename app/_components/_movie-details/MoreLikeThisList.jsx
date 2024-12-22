import MovieCard from "@/components/landing/MovieCard";
import { getMoreLikeMovies } from "@/lib/movie-info";

const MoreLikeThisList = async ({ movieId }) => {
  const data = await getMoreLikeMovies(movieId);

  return (
    <>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default MoreLikeThisList;
