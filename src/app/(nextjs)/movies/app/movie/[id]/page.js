import MoreLikeThis from "@/app/_components/_movie-details/MoreLikeThis";
import WatchListActionData from "@/app/_components/_watch-list/WatchListActionData";
import CastLists from "@/components/movie-details/CastLists";
import Genres from "@/components/movie-details/Genres";
import SocialMedia from "@/components/movie-details/SocialMedia";
import Navbar from "@/components/Navbar";
import { TMDB_MOVIE_POSTER_ORIGINAL_PATH } from "@/constant/constant";
import { getSelectedMovieDetails } from "@/lib/movie-info";
import { formatDate } from "@/utils/date-utils";
import Image from "next/image";

export async function generateMetadata({ params }, parent) {
  // read route params
  const movieId = await params.id;

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

const MovieDetails = async ({ params: { id } }) => {
  const data = await getSelectedMovieDetails(id);

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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70" />
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
                    {data?.release_date
                      ? formatDate(data.release_date)
                      : "unknown"}{" "}
                  </span>
                  <span>| </span>
                  <span>{data?.runtime} min</span>
                </div>
                <p className="text-lg mb-6">{data?.overview}</p>
                <Genres genres={data?.genres} />
                <CastLists movieId={id} />
                <WatchListActionData movieId={id} movie={data} />
                <SocialMedia
                  title={data?.title}
                  description={data?.description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Similar Movies Section */}
      <MoreLikeThis movieId={id} />
    </>
  );
};

export default MovieDetails;
