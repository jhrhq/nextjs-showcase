import MovieCard from "@/domains/movies/components/landing/MovieCard";
import MoreLikeThisNotFound from "@/domains/movies/components/movie-details/MoreLikeThisNotFound";
import { getMoreLikeMovies } from "@/domains/movies/lib/movie-info";

const MoreLikeThisList = async ({ movieId }) => {
  const data = await getMoreLikeMovies(movieId);

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {data.results.length === 0 ? (
        <MoreLikeThisNotFound />
      ) : (
        data.results.map((movie) => <MovieCard key={movie.id} {...movie} />)
      )}
    </div>
  );
};

export default MoreLikeThisList;
