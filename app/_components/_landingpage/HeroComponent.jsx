import { HeroMovieSkeletonCard } from "@/components/skeletons/HeroMovieSkeleton";
import { getPopularMovies } from "@/lib/movie-info";
import { Suspense } from "react";

const HeroComponent = async () => {
  const data = await getPopularMovies();
  const heroImage = `process.env.TMDB_MOVIE_POSTER_PATH}${data.results?.[0].backdrop_path}`;
  return (
    <Suspense fallback={<HeroMovieSkeletonCard />}>
      <div
        id="hero"
        className="relative h-screen"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black" />
        <div className="absolute bottom-0 left-0 p-12">
          <h1 id="heroTitle" className="text-5xl font-bold mb-4">
            Venom: The Last Dance
          </h1>
          <p id="heroOverview" className="text-lg max-w-2xl mb-4">
            Eddie and Venom are on the run. Hunted by both of their worlds and
            with the net closing in, the duo are forced into a devastating
            decision that will bring the curtains down on Venom and Eddie&apos;s
            last dance.
          </p>
          <button className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80">
            ▶ Play
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default HeroComponent;
