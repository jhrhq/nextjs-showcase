import Image from "next/image";
import CastLists from "@/domains/movies/components/movie-details/CastLists";
import Genres from "@/domains/movies/components/movie-details/Genres";
import MoreLikeThis from "@/domains/movies/components/movie-details/MoreLikeThis";
// import SocialMedia from "@/domains/movies/components/movie-details/SocialMedia";
import Navbar from "@/domains/movies/components/Navbar";
import WatchListActionData from "@/domains/movies/components/watchlist/WatchListActionData";
import { TMDB_MOVIE_POSTER_ORIGINAL_PATH } from "@/domains/movies/constants/constant";
import { getSelectedMovieDetails } from "@/domains/movies/lib/movie-info";
import { formatDate } from "@/domains/movies/utils/date-utils";

export async function generateMetadata({ params }) {
  // read route params
  const { id: movieId } = await params;

  // fetch data
  const movie = await getSelectedMovieDetails(movieId);

  return {
    title: `MovieDB - ${movie.title}`,
    description: movie?.overview.slice(0, 100),
    openGraph: {
      images: [
        {
          url: `/api/og?id=${movieId}`,
          width: 1200,
          height: 600,
        },
      ],
    },
  };
}

const MovieDetails = async ({ params }) => {
  const { id: movieId } = await params;

  const data = await getSelectedMovieDetails(movieId);

  return (
    <>
      <Navbar />
      {/* Movie Details Section */}
      <div id="movieDetails" className="min-h-screen pt-20 mb-20">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <Image
              src={`${TMDB_MOVIE_POSTER_ORIGINAL_PATH}${data?.poster_path}`}
              alt="Smile 2"
              height={500}
              width={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/70" />
          </div>
          <div className="relative container mx-auto px-4 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Image
                  src={`${TMDB_MOVIE_POSTER_ORIGINAL_PATH}${data?.poster_path}`}
                  alt={data?.title}
                  height={500}
                  width={500}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>
                <div className="flex items-center mb-4 space-x-4">
                  <span className="text-green-500">
                    {data?.release_date ? formatDate(data.release_date) : "unknown"}{" "}
                  </span>
                  <span>| </span>
                  <span>{data?.runtime} min</span>
                </div>
                <p className="text-lg mb-6">{data?.overview}</p>
                <Genres genres={data?.genres} />
                <CastLists movieId={movieId} />
                <WatchListActionData movieId={movieId} movie={data} />
                {/* <SocialMedia title={data?.title} description={data?.description} />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Similar Movies Section */}
      <MoreLikeThis movieId={movieId} />
    </>
  );
};

export default MovieDetails;
