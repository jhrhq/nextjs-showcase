import { AUTH_CONFIG } from "../constants/auth.constant";
import type { TMDBMovieDetails } from "../types/tmdb-movi-details.types";
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

  getSearch: async (query: string): Promise<TMDBMovie[] | null> => {
    const response = await moviesApi(`${AUTH_CONFIG.API.SEARCH}?movieName=${query}`);
    return response.data;
  },
  getMovie: async (movieId: string): Promise<TMDBMovieDetails | null> => {
    const response = await moviesApi(`${AUTH_CONFIG.API.MOVIE}?movieId=${movieId}`);
    return response.data;
  },
};
