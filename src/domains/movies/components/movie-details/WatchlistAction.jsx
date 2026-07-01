"use client";

import { CheckCheck, FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addToWatchList } from "@/domains/movies/actions";
import useAuth from "@/domains/movies/hooks/useAuth";
import { cn } from "@/lib/utils";

const WatchlistAction = ({ movieId, movie, selectedWatchListMovie }) => {
  const { auth } = useAuth();

  const router = useRouter();

  // TODO: fetch data from the all movie watchlist and find the interestd usrIds
  const isInterested = selectedWatchListMovie?.watchList_ids?.find((id) => id === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [isPending, startTransition] = useTransition();

  const toggleWatchList = async () => {
    if (auth) {
      addToWatchList(movieId, auth?.id, movie);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="text-center">
          <button
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                toggleWatchList();
              })
            }
            className={cn(
              "flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg disabled:pointer-events-none disabled:opacity-50",
              interested && "text-green-600"
            )}
          >
            {interested ? (
              <>
                <CheckCheck />
                Added to Watch List
              </>
            ) : (
              <>
                <FilePlus />
                Add to Watch List
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistAction;
