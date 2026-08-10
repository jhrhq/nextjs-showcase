"use client";
import WatchListCard from "@/domains/movies/components/watchlist/WatchListCard";
import EmptyWatchList from "@/domains/movies/components/watchlist/WatchlistEmpty";
import { useGetWatchlists } from "../../hooks/useMovies";

const LoggedInUsersWatchList = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useGetWatchlists(userId);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  if (!data || data.length === 0) {
    return <EmptyWatchList />;
  }
  const currentWatchlists = data.filter((movie) => movie.watchlist_ids?.includes(userId));

  if (currentWatchlists.length === 0) {
    return <EmptyWatchList />;
  }

  return (
    <div id="watchLaterList" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentWatchlists?.map((movie) => (
        <WatchListCard key={movie.id} movie={movie} userId={userId} />
      ))}
    </div>
  );
};

export default LoggedInUsersWatchList;
