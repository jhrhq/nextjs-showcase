"use client";
import WatchLaterHeader from "@/app/_components/_watch-later/WatchLaterheader";
import WatchListCard from "@/components/watchlist/WatchListCard";
import EmptyWatchList from "@/components/watchlist/WatchlistEmpty";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const LoggedInUsersWatchList = ({ userId }) => {
  const { data, error } = useSWR(
    () => (userId ? "/api/watchlist" : null),
    fetcher
  );

  const foundWatLaterMovies = data?.filter((movie) =>
    movie?.watchList_ids?.includes(userId)
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (foundWatLaterMovies?.length == 0) {
    return <EmptyWatchList />;
  }
  return (
    <>
      <WatchLaterHeader />
      <div
        id="watchLaterList"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {foundWatLaterMovies?.map((movie) => (
          <WatchListCard key={movie.id} {...movie} userId={userId} />
        ))}
      </div>
    </>
  );
};

export default LoggedInUsersWatchList;
