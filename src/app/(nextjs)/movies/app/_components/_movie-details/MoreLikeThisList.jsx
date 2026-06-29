import MoreLikeThisNotFound from "@/app/_components/_movie-details/MoreLikeThisNotFound";
import MovieCard from "@/components/landing/MovieCard";
import { getMoreLikeMovies } from "@/lib/movie-info";

const MoreLikeThisList = async ({ movieId }) => {
  const data = await getMoreLikeMovies(movieId);

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {data.results.length == 0 ? (
        <MoreLikeThisNotFound />
      ) : (
        data.results.map((movie) => <MovieCard key={movie.id} {...movie} />)
      )}
    </div>
  );
};

export default MoreLikeThisList;
