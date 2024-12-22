import PopularMovie from "@/app/_components/_landingpage/PopularMovie";
import TopRatedMovies from "@/app/_components/_landingpage/TopRated";
import Trending from "@/app/_components/_landingpage/Trending";
import Hero from "@/components/landing/Hero";
import HomeSections from "@/components/landing/HomeSections";
import Navbar from "@/components/Navbar";
import { HeroMovieSkeletonCard } from "@/components/skeletons/HeroMovieSkeleton";
import { MovieSkeletonCardList } from "@/components/skeletons/MovieSkeleton";
import { Suspense } from "react";

export default async function Home() {
  // const watchListMovies = await getAllWatchLists();
  // console.log(data);
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Suspense fallback={<HeroMovieSkeletonCard />}>
        <Hero />
      </Suspense>

      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8">
        <HomeSections sectionTitle={"Trending Now"}>
          <Suspense fallback={<MovieSkeletonCardList />}>
            <Trending />
          </Suspense>
        </HomeSections>
        <HomeSections sectionTitle={"Popular on MOVIE DB"}>
          <Suspense fallback={<MovieSkeletonCardList />}>
            <PopularMovie />
          </Suspense>
        </HomeSections>
        <HomeSections sectionTitle={"Top Rated"}>
          <Suspense fallback={<MovieSkeletonCardList />}>
            <TopRatedMovies />
          </Suspense>
        </HomeSections>
      </div>
    </>
  );
}
