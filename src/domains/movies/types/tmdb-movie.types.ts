import type { HydratedDocument } from "mongoose";

export interface TMDBBaseMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieCastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBMovieCredits {
  id: number;
  cast: TMDBMovieCastMember[];
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }>;
}

export interface TMDBMovieDetails extends TMDBBaseMovie {
  budget: number;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  genres: Array<{ id: number; name: string }>;
  homepage: string | null;
  imdb_id: string | null;
}

export interface TMDBMovie extends TMDBBaseMovie {
  media_type?: string;
  genre_ids?: number[];
  watchlist_ids?: string[];
}

export type IWatchlistDocument = HydratedDocument<TMDBMovie>;
