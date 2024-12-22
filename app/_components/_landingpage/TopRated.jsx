import MovieCard from "@/components/landing/MovieCard";
import { MovieSkeletonCardList } from "@/components/skeletons/MovieSkeleton";
import { getTopRatedMovies } from "@/lib/movie-info";
import { Suspense } from "react";

const TopRatedMovies = async () => {
  const data = await getTopRatedMovies();
  return (
    <Suspense fallback={<MovieSkeletonCardList />}>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </Suspense>
  );
};

export default TopRatedMovies;
