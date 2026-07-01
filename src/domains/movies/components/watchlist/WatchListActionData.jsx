import { Suspense } from "react";
import WatchlistAction from "@/domains/movies/components/movie-details/WatchlistAction";
import { getAllWatchLists } from "@/domains/movies/db/queries";

const WatchListActionData = async ({ movieId, movie }) => {
  const watchListMovies = await getAllWatchLists();
  const selectedWatchListMovie = watchListMovies.find((movie) => movie?.id === movieId);
  return (
    <Suspense fallback={"Loading action..."}>
      <WatchlistAction movieId={movieId} movie={movie} selectedWatchListMovie={selectedWatchListMovie} />
    </Suspense>
  );
};

export default WatchListActionData;
