import PopularMovie from "@/app/_components/_landingpage/PopularMovie";
import TopRatedMovies from "@/app/_components/_landingpage/TopRated";
import Trending from "@/app/_components/_landingpage/trending";
import Hero from "@/components/landing/Hero";
import HomeSections from "@/components/landing/HomeSections";
import Navbar from "@/components/Navbar";

export default async function Home() {
  // const watchListMovies = await getAllWatchLists();
  // console.log(data);
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-8">
        <HomeSections sectionTitle={"Trending Now"}>
          <Trending />
        </HomeSections>
        <HomeSections sectionTitle={"Popular on MOVIE DB"}>
          <PopularMovie />
        </HomeSections>
        <HomeSections sectionTitle={"Top Rated"}>
          <TopRatedMovies />
        </HomeSections>
      </div>
    </>
  );
}
