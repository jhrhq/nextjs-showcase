import Hero from "@/components/landing/Hero";
import HomeSections from "@/components/landing/HomeSections";
import MovieCard from "@/components/landing/MovieCard";
import Navbar from "@/components/Navbar";
import { getAllWatchLists } from "@/db/queries";

async function getData() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/550?api_key=73740fc6ee836d15fc04346d7db75605",
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  // const watchListMovies = await getAllWatchLists();
  const data = await getData();
  // console.log(data);
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8">
        <HomeSections sectionTitle={"Trending Now"}>
          <MovieCard />
        </HomeSections>
        <HomeSections sectionTitle={"Popular on MOVIE DB"}>
          <MovieCard />
        </HomeSections>
        <HomeSections sectionTitle={"Top Rated"}>
          <MovieCard />
        </HomeSections>
      </div>
    </>
  );
}
