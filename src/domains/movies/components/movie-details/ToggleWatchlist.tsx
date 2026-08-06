"use client";

import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/domains/movies/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AUTH_CONFIG } from "../../constants/auth.constant";
import { useGetWatchlists, useUpdateWatchlists } from "../../hooks/useMovies";
import type { TMDBMovie } from "../../types/tmdb-movie.types";

type Props = {
  movieId: string;
  movie: TMDBMovie;
};
const ToggleWatchList = ({ movieId, movie }: Props) => {
  const { auth } = useAuth();
  const router = useRouter();
  const { data, isLoading } = useGetWatchlists(auth?.id || "");
  const current = data?.find((item) => item.id === Number(movieId));

  const isInterested = current?.watchlist_ids?.some((id) => id === auth?.id);
  const { mutate, isPending } = useUpdateWatchlists();

  const toggleWatchList = async () => {
    if (!auth) {
      router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      return;
    }
    mutate({ movieId, userId: auth.id, movie });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          disabled={isLoading || isPending}
          onClick={toggleWatchList}
          className={cn(
            "flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer disabled:pointer-events-none disabled:opacity-50",
            isInterested
              ? "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <span>{isInterested ? <Check className="size-4 text-emerald-500" /> : <Plus className="size-4" />}</span>
          {isInterested ? "Added to Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default ToggleWatchList;
