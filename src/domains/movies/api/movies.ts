import { AUTH_CONFIG } from "../constants/auth.constant";
import type { TMDBMovie } from "../types/tmdb-movie.types";
import { moviesApi } from "./axios-instance";

export const movies = {
  getWatchList: async (data: { userId: string }): Promise<TMDBMovie[] | null> => {
    const response = await moviesApi.post(AUTH_CONFIG.API.WATCHLIST, data);
    return response.data;
  },
  updateWatchlist: async (data: {
    userId: string;
    movieId: string;
    movie: TMDBMovie;
  }): Promise<{ status: number; message: string } | null> => {
    const response = await moviesApi.put(AUTH_CONFIG.API.WATCHLIST, data);
    return response.data;
  },
};
