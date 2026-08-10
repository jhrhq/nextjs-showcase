import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { movies } from "../api/movies";
import type { TMDBMovie } from "../types/tmdb-movie.types";

export const moviesKeys = {
  watchlists: {
    list: () => ["getWatchlists"] as const,
  },
  search: (val: string) => ["searchmovies", val],
  movie: (val: string) => ["movie", val],
};

export function useGetWatchlists(userId: string) {
  return useQuery({
    queryKey: [...moviesKeys.watchlists.list()],
    queryFn: () => movies.getWatchList({ userId }),
  });
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: [...moviesKeys.search(query)],
    queryFn: () => movies.getSearch(query),
    enabled: !!query,
  });
}
export function useGetMovie(movieId: string) {
  return useQuery({
    queryKey: [...moviesKeys.movie(movieId)],
    queryFn: () => movies.getMovie(movieId),
    enabled: !!movieId,
  });
}

export function useUpdateWatchlists() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...moviesKeys.watchlists.list()],
    mutationFn: (data: { userId: string; movieId: string; movie: TMDBMovie }) => movies.updateWatchlist(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: moviesKeys.watchlists.list() }),
  });
}
