const revalidateSeconds = 24 * 3600; // 2 hours in seconds

export async function getTrendingMovies() {
  const res = await fetch(
    `${process.env.TMDB_API_PATH}/trending/movie/day?language=en-US&api_key=${process.env.TMDB_API}`,
    { next: { revalidate: revalidateSeconds } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPopularMovies() {
  const res = await fetch(
    `${process.env.TMDB_API_PATH}/movie/popular?language=en-US&page=1&api_key=${process.env.TMDB_API}`,
    { next: { revalidate: revalidateSeconds } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getTopRatedMovies() {
  const res = await fetch(
    `${process.env.TMDB_API_PATH}/movie/top_rated?language=en-US&page=1&api_key=${process.env.TMDB_API}`,
    { next: { revalidate: revalidateSeconds } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
