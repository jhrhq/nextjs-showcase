import { Suspense } from "react";
import Hero from "@/domains/movies/components/landing/Hero";
import HomeSections from "@/domains/movies/components/landing/HomeSections";
import PopularMovie from "@/domains/movies/components/landingpage/PopularMovie";
import TopRatedMovies from "@/domains/movies/components/landingpage/TopRated";
import Trending from "@/domains/movies/components/landingpage/Trending";
import Navbar from "@/domains/movies/components/Navbar";
import { HeroMovieSkeletonCard } from "@/domains/movies/components/skeletons/HeroMovieSkeleton";
import { MovieSkeletonCardList } from "@/domains/movies/components/skeletons/MovieSkeleton";

export default async function Home() {
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
