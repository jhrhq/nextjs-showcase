"use client";

import LoggedInUsersWatchList from "@/app/_components/_watch-later/LoggedInUsersWatchList";
import useAuth from "@/app/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyWatchList from "@/components/watchlist/WatchlistEmpty";
import { Suspense } from "react";

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
      <LoggedInUsersWatchList userId={auth?.id}>
        {children}
      </LoggedInUsersWatchList>
    </Suspense>
  );
};

export default WatchLaterUsersLogInCheck;
