import { Suspense } from "react";
import { getPopularMovies } from "@/domains/movies/services/tmdb";
import HeroSkeleton from "../skeletons/HeroMovieSkeleton";

const HeroComponent = async () => {
  const data = await getPopularMovies();
  const movie = data.results?.[0];
  const heroImage = `https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`;

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <div
        id="hero"
        className="relative h-screen bg-background"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl z-10">
          <h1
            id="heroTitle"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground tracking-tight drop-shadow-md"
          >
            {movie?.title ?? ""}
          </h1>
          <p
            id="heroOverview"
            className="text-base md:text-lg max-w-2xl mb-6 text-muted-foreground line-clamp-3 drop-shadow"
          >
            {movie?.overview ?? ""}
          </p>
          <button
            type="button"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
          >
            ▶ Play
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default HeroComponent;
