"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LoggedInUsersWatchList from "@/domains/movies/components/watch-later/LoggedInUsersWatchList";
import EmptyWatchList from "@/domains/movies/components/watchlist/WatchlistEmpty";
import useAuth from "@/domains/movies/hooks/useAuth";

const WatchLaterUsersLogInCheck = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    return (
      <div className="container mx-auto pt-24 pb-8">
        <EmptyWatchList />
      </div>
    );
  }
  return (
    <Suspense fallback={<Skeleton className="h-4 w-60" />}>
      <LoggedInUsersWatchList userId={auth?.id}>{children}</LoggedInUsersWatchList>
    </Suspense>
  );
};

export default WatchLaterUsersLogInCheck;
