import MovieCard from "@/components/landing/MovieCard";
import { MovieSkeletonCardList } from "@/components/skeletons/MovieSkeleton";
import { getPopularMovies } from "@/lib/movie-info";
import { Suspense } from "react";

const PopularMovie = async () => {
  const data = await getPopularMovies();
  return (
    <Suspense fallback={<MovieSkeletonCardList />}>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </Suspense>
  );
};

export default PopularMovie;
