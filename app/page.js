import Hero from "@/components/landing/Hero";
import MovieCard from "@/components/landing/MovieCard";
import HomeSections from "@/components/landing/HomeSections";
import Navbar from "@/components/Navbar";

export default function Home() {
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
