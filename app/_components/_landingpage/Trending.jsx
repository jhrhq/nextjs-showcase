import MovieCard from "@/components/landing/MovieCard";
import { MovieSkeletonCardList } from "@/components/skeletons/MovieSkeleton";
import { getTrendingMovies } from "@/lib/movie-info";
import { Suspense } from "react";

const Trending = async () => {
  const data = await getTrendingMovies();
  return (
    <Suspense fallback={<MovieSkeletonCardList />}>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </Suspense>
  );
};

export default Trending;
