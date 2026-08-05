"use client";

import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addToWatchList } from "@/domains/movies/actions";
import useAuth from "@/domains/movies/hooks/useAuth";
import { cn } from "@/lib/utils";

const WatchlistAction = ({ movieId, movie, selectedWatchListMovie }) => {
  const { auth } = useAuth();
  const router = useRouter();

  const isInterested = selectedWatchListMovie?.watchList_ids?.some((id) => id === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [isPending, startTransition] = useTransition();

  const toggleWatchList = async () => {
    if (!auth) {
      router.push("/login");
      return;
    }

    // Optimistic update
    setInterested((prev) => !prev);

    try {
      await addToWatchList(movieId, auth.id, movie);
    } catch {
      // Revert if action fails
      setInterested((prev) => !prev);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await toggleWatchList();
            })
          }
          className={cn(
            "flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer disabled:pointer-events-none disabled:opacity-50",
            interested
              ? "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {interested ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              Added to Watchlist
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add to Watchlist
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WatchlistAction;
