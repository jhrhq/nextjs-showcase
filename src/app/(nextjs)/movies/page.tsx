import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/domains/movies/components/landing/Hero";
import HomeSections from "@/domains/movies/components/landing/HomeSections";
import PopularMovie from "@/domains/movies/components/landingpage/PopularMovie";
import TopRatedMovies from "@/domains/movies/components/landingpage/TopRated";
import Trending from "@/domains/movies/components/landingpage/Trending";
import Navbar from "@/domains/movies/components/Navbar";
import HeroSkeleton, { MovieSkeletonCardList } from "@/domains/movies/components/skeletons/HeroMovieSkeleton";

export const metadata: Metadata = {
  title: "Movies — Discover Trending Films, TV Shows & Reviews",
  description:
    "Explore millions of movies, TV shows, and cast details powered by TMDB. Find trending films, ratings, trailers, and discover what to watch next.",
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <main className="container mx-auto px-4 py-8 space-y-12">
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
      </main>
    </div>
  );
}
