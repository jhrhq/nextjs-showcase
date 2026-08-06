import MovieCard from "@/domains/movies/components/landing/MovieCard";
import MoreLikeThisNotFound from "@/domains/movies/components/movie-details/MoreLikeThisNotFound";
import { getMoreLikeMovies } from "@/domains/movies/services/tmdb";

const MoreLikeThisList = async ({ movieId }: { movieId: string }) => {
  const data = await getMoreLikeMovies(movieId);
  const movies = data?.results || [];

  if (movies.length === 0) {
    return <MoreLikeThisNotFound />;
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoreLikeThisList;
