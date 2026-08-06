import Image from "next/image";
import { Suspense } from "react";
import CastLists from "@/domains/movies/components/movie-details/CastLists";
import Genres from "@/domains/movies/components/movie-details/Genres";
import MoreLikeThis from "@/domains/movies/components/movie-details/MoreLikeThis";
import ToggleWatchList from "@/domains/movies/components/movie-details/ToggleWatchlist";
import Navbar from "@/domains/movies/components/Navbar";
import { TMDB_MOVIE } from "@/domains/movies/constants/tmdb.constant";
import { getSelectedMovieDetails } from "@/domains/movies/services/tmdb";
import { formatDate } from "@/domains/movies/utils/date-utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id: movieId } = await params;
  const movie = await getSelectedMovieDetails(movieId);

  return {
    title: `MovieDB - ${movie.title}`,
    description: movie?.overview?.slice(0, 100),
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

const MovieDetails = async ({ params }: Props) => {
  const { id: movieId } = await params;

  const data = await getSelectedMovieDetails(movieId);
  const backdropPath = data?.backdrop_path || data?.poster_path;

  return (
    <>
      <Navbar />
      <div id="movieDetails" className="min-h-screen pt-24 pb-20 text-foreground bg-background">
        <div className="relative min-h-[85vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden -z-10">
            {backdropPath ? (
              <Image
                fill
                priority
                src={`${TMDB_MOVIE.POSTER_ORIGINAL_PATH}${backdropPath}`}
                alt={data?.title || "Movie backdrop"}
                className="w-full h-full object-cover object-center scale-105 blur-xs opacity-30 dark:opacity-20"
                sizes="100vw"
              />
            ) : (
              <div className="w-full h-full bg-secondary/20" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/40" />
            <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/60 to-background/95" />
          </div>

          <div className="relative container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-10 lg:gap-14 items-center md:items-start">
              <div className="w-full max-w-70 md:w-1/3 shrink-0">
                {data?.poster_path ? (
                  <div className="relative aspect-2/3 w-full rounded-2xl overflow-hidden shadow-2xl border border-border/80 group">
                    <Image
                      fill
                      priority
                      src={`${TMDB_MOVIE.POSTER_ORIGINAL_PATH}${data.poster_path}`}
                      alt={data?.title || "Movie poster"}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 280px, 400px"
                    />
                  </div>
                ) : (
                  <div className="aspect-2/3 w-full rounded-2xl bg-secondary/60 flex items-center justify-center text-muted-foreground text-sm border border-border shadow-md">
                    No Poster Available
                  </div>
                )}
              </div>

              <div className="w-full md:w-2/3 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">
                    {data?.title}
                  </h1>

                  {/* Meta details bar */}
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
                    {data?.vote_average ? (
                      <span className="inline-flex items-center gap-1 text-chart-2 bg-secondary/50 px-3 py-1 rounded-full border border-border/60 font-semibold shadow-2xs">
                        ★ {data.vote_average.toFixed(1)}{" "}
                        <span className="text-xs text-muted-foreground font-normal">/10</span>
                      </span>
                    ) : null}

                    {data?.release_date && (
                      <span className="bg-secondary/50 px-3 py-1 rounded-full border border-border/60 text-green-500 font-semibold">
                        {formatDate(data.release_date)}
                      </span>
                    )}

                    {data?.runtime ? (
                      <span className="bg-secondary/50 px-3 py-1 rounded-full border border-border/60">
                        {data.runtime} mins
                      </span>
                    ) : null}
                  </div>
                </div>

                {data?.overview && (
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-normal max-w-3xl">
                    {data.overview}
                  </p>
                )}

                <div className="space-y-2">
                  <Genres genres={data?.genres} />
                </div>

                <div className="space-y-6 pt-2">
                  <CastLists movieId={movieId} />

                  <div className="pt-2">
                    <Suspense fallback={<div className="h-10 w-40 bg-muted animate-pulse rounded-lg mb-8" />}>
                      <ToggleWatchList movieId={movieId} movie={data} />
                    </Suspense>
                  </div>
                </div>

                {/* <SocialMedia title={data?.title} description={data?.description} /> */}
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
