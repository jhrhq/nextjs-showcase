/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { ImageResponse } from "next/og";
import { getSelectedMovieDetails } from "@/domains/movies/services/tmdb";

export const contentType = "image/jpg";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const movieId = searchParams.get("id");

  // if (!movieId) {
  //   return new ImageResponse(<>Visit with &quot;MovieDB&quot;</>, {
  //     width: 1200,
  //     height: 630,
  //   });
  // }

  const movie = await getSelectedMovieDetails(movieId);

  const title = movie?.title;
  const description = movie?.overview?.slice(0, 100);
  const posterPath = movie?.poster_path ? `https://image.tmdb.org/t/p/w300${movie?.poster_path}` : "";

  return new ImageResponse(
    <div tw="flex flex-row p-[48px] w-full h-full bg-white">
      <div tw="flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image height={500} width={500} tw="w-96 h-full" src={posterPath} alt={title ?? "movie title"} />
      </div>
      <div tw="flex flex-col w-[50%] h-full">
        <p tw="text-[72px]">{title}</p>
        <p tw="text-[32px] text-neutral-700">{description}...</p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
