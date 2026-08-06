"use client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMovie } from "../../hooks/useMovies";
import type { TMDBMovie } from "../../types/tmdb-movie.types";

type DetailsProps = {
  isLoading: boolean;
  title: string;
  description: React.ReactNode;
};

const Details = ({ isLoading, title, description }: DetailsProps) => {
  if (isLoading) {
    return (
      <div className="bg-secondary/40 border border-border/60 p-2.5 rounded-xl flex items-center justify-between gap-2 w-full">
        <Skeleton className="h-4 w-16 bg-muted shrink-0" />
        <Skeleton className="h-4 w-20 bg-muted shrink-0" />
      </div>
    );
  }

  return (
    <div className="bg-secondary/40 border border-border/60 p-2.5 rounded-xl flex items-center justify-between text-xs gap-2 w-full">
      <span className="text-muted-foreground font-medium shrink-0">{title}</span>
      <span className="text-foreground font-semibold text-right truncate">{description}</span>
    </div>
  );
};

type GenresProps = {
  isLoading: boolean;
  genres?: Array<{ id: number; name: string }>;
};

const Genres = ({ isLoading, genres }: GenresProps) => {
  if (isLoading) {
    return (
      <div className="bg-secondary/40 border border-border/60 p-2.5 rounded-xl space-y-2 w-full">
        <Skeleton className="h-4 w-16 bg-muted" />
        <div className="flex flex-wrap gap-1 pt-0.5">
          <Skeleton className="h-5 w-14 rounded-full bg-muted" />
          <Skeleton className="h-5 w-16 rounded-full bg-muted" />
        </div>
      </div>
    );
  }

  if (!genres || genres.length === 0) return null;

  return (
    <div className="bg-secondary/40 border border-border/60 p-2.5 rounded-xl w-full">
      <span className="text-muted-foreground font-medium text-xs">Genres</span>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="bg-secondary text-secondary-foreground border border-border/80 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide shadow-2xs"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

type Props = TMDBMovie;

const CompareSelectedMovieCard = ({ id, title, poster_path, vote_average }: Props) => {
  const { data, isLoading } = useGetMovie(String(id));

  return (
    <div className="flex flex-col items-center w-full max-w-full overflow-hidden">
      {/* Poster & Title Section */}
      <div className="w-full flex flex-col items-center mb-4">
        {poster_path ? (
          <div className="relative aspect-square w-28 sm:w-full rounded-lg overflow-hidden shadow-md border border-border mb-2.5 group">
            <Image
              fill
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title || "Movie poster"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="128px"
            />
          </div>
        ) : (
          <div className="aspect-2/3 w-28 sm:w-32 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground text-xs border border-border mb-2.5">
            No Poster
          </div>
        )}
        <h3 className="text-xs sm:text-sm font-bold text-foreground text-center tracking-tight line-clamp-2 px-1 w-full">
          {title}
        </h3>
      </div>

      {/* Details List Stack */}
      <div className="w-full flex flex-col space-y-2">
        <Details
          isLoading={isLoading}
          title="Rating"
          description={
            vote_average ? (
              <span className="inline-flex items-center gap-1 text-chart-2">
                ★ {vote_average.toFixed(1)} <span className="text-muted-foreground text-[10px] font-normal">/10</span>
              </span>
            ) : (
              "N/A"
            )
          }
        />
        <Details isLoading={isLoading} title="Runtime" description={data?.runtime ? `${data.runtime}m` : "N/A"} />
        <Details
          isLoading={isLoading}
          title="Budget"
          description={data?.budget ? `$${data.budget.toString()}` : "N/A"}
        />
        <Details
          isLoading={isLoading}
          title="Revenue"
          description={data?.revenue ? `$${data.revenue.toString()}` : "N/A"}
        />
        <Details
          isLoading={isLoading}
          title="Release Date"
          description={data?.release_date ? new Date(data.release_date).toLocaleDateString() : "N/A"}
        />
        <Genres isLoading={isLoading} genres={data?.genres} />
      </div>
    </div>
  );
};

export default CompareSelectedMovieCard;
