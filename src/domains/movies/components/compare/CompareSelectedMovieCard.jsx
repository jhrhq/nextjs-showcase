"use client";
import Image from "next/image";
import { Skeleton } from "@/domains/movies/components/ui/skeleton";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import { useFetch } from "../../hooks/useFetch";

const Details = ({ isLoading, title, description }) => {
  if (isLoading) {
    return (
      <div className="bg-zinc-800 p-3 rounded">
        <Skeleton className="h4 w-[250px]" />
        <Skeleton className="h4 w-[150px]" />
      </div>
    );
  }
  return (
    <div className="bg-zinc-800 p-3 rounded">
      <span className="text-gray-400">{title}:</span>
      <span className="float-right">{description}</span>
    </div>
  );
};

const Genres = ({ isLoading, genres }) => {
  if (isLoading) {
    return (
      <div className="bg-zinc-800 p-3 rounded flex flex-wrap gap-2">
        <Skeleton className="h4 w-[50px]" />
        <Skeleton className="h4 w-[50px]" />
        <Skeleton className="h4 w-[50px]" />
        <Skeleton className="h4 w-[50px]" />
      </div>
    );
  }

  if (!genres) return null;

  return (
    <div className="bg-zinc-800 p-3 rounded">
      <span className="text-gray-400">Genres:</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span key={genre.id} className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CompareSelectedMovieCard = ({ id, title, poster_path, vote_average, release_date }) => {
  const { data, isLoading } = useFetch(() => (id ? `${AUTH_CONFIG.API.MOVIE}?movieId=${id}` : null), fetcher);

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-2 h-full">
        <Image
          height={300}
          width={300}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full rounded-lg mb-4 object-contain max-h-full"
        />
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
      </div>
      <div className="w-full space-y-4 col-span-3">
        <Details title={"Rating"} description={vote_average} />
        <Details title={"Release Year"} description={release_date ? new Date(release_date).getFullYear() : "unknown"} />
        <Details isLoading={isLoading} title={"Runtime"} description={data?.runtime} />
        <Details isLoading={isLoading} title={"Budget"} description={`$${data?.budget}`} />
        <Details isLoading={isLoading} title={"Revenue"} description={`$${data?.revenue}`} />
        <Details isLoading={isLoading} title={"Revenue"} description={`$${data?.revenue}`} />

        <Genres isLoading={isLoading} genres={data?.genres} />
      </div>
    </div>
  );
};

export default CompareSelectedMovieCard;
