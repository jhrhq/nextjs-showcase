import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import { TMDB_MOVIE } from "@/domains/movies/constants/tmdb.constant";

import type {
  TMDBMovie,
  TMDBMovieCredits,
  TMDBMovieDetails,
  TMDBPaginatedResponse,
} from "@/domains/movies/types/tmdb-movie.types";

const REVALIDATE_TIME = AUTH_CONFIG.FETCH_REVALIDATIONS.REVALIDATE_SECONDS;
const API_KEY = process.env.TMDB_API;

export async function getTrendingMovies(): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  const res = await fetch(`${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.TRENDING}?language=en-US&api_key=${API_KEY}`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPopularMovies(): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  const res = await fetch(`${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.POPULAR}?language=en-US&page=1&api_key=${API_KEY}`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getTopRatedMovies(): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  const res = await fetch(
    `${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.TOP_RATED}?language=en-US&page=1&api_key=${API_KEY}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getSelectedMovieDetails(movieId: string | number): Promise<TMDBMovieDetails> {
  const res = await fetch(
    `${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.MOVIE_DETAILS(movieId)}?language=en-US&api_key=${API_KEY}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getSelectedMovieCasts(movieId: string | number): Promise<TMDBMovieCredits> {
  const res = await fetch(
    `${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.MOVIE_CASTS(movieId)}?language=en-US&api_key=${API_KEY}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMoreLikeMovies(movieId: string | number): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  const res = await fetch(
    `${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.SIMILAR_MOVIES(movieId)}?language=en-US&api_key=${API_KEY}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMovieWithKeyWord(keyword: string): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  const res = await fetch(
    `${TMDB_MOVIE.API_PATH}${TMDB_MOVIE.API.SEARCH}?query=${keyword}&language=en-US&api_key=${API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
