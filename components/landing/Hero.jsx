import { getPopularMovies } from "@/lib/movie-info";

const Hero = async () => {
  const data = await getPopularMovies();
  const popularMovie = data?.results?.[0];
  const fullMoviePath = `${process.env.TMDB_MOVIE_POSTER_ORIGINAL_PATH}${popularMovie.poster_path}`;

  return (
    <div
      id="hero"
      className="relative h-screen"
      style={{
        backgroundImage: `url(${fullMoviePath})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black" />
      <div className="absolute bottom-0 left-0 p-12">
        <h1 id="heroTitle" className="text-5xl font-bold mb-4">
          {popularMovie.title}
        </h1>
        <p id="heroOverview" className="text-lg max-w-2xl mb-4">
          {popularMovie.overview}
        </p>
        <button className="bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80">
          ▶ Play
        </button>
      </div>
    </div>
  );
};

export default Hero;
