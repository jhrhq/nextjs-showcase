export const TMDB_MOVIE = {
  API_PATH: "https://api.themoviedb.org/3",
  POSTER_ORIGINAL_PATH: "https://image.tmdb.org/t/p/original",
  API: {
    TRENDING: "/trending/movie/day",
    POPULAR: "/movie/popular",
    TOP_RATED: "/movie/top_rated",
    MOVIE_DETAILS: (movieId: string | number) => `/movie/${movieId}`,
    MOVIE_CASTS: (movieId: string | number) => `/movie/${movieId}/credits`,
    SIMILAR_MOVIES: (movieId: string | number) => `/movie/${movieId}/similar`,
    SEARCH: "/search/movie",
  },
} as const;
