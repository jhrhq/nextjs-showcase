import WatchlistAction from "@/components/movie-details/WatchlistAction";
import { getAllWatchLists } from "@/db/queries";
import { Suspense } from "react";

const WatchListActionData = async ({ movieId, movie }) => {
  const watchListMovies = await getAllWatchLists();
  const selectedWatchListMovie = watchListMovies.find(
    (movie) => movie?.id == movieId
  );
  return (
    <Suspense fallback={"Loading action..."}>
      <WatchlistAction
        movieId={movieId}
        movie={movie}
        selectedWatchListMovie={selectedWatchListMovie}
      />
    </Suspense>
  );
};

export default WatchListActionData;
