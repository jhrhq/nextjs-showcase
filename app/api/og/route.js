/* eslint-disable @next/next/no-img-element */
import { getSelectedMovieDetails } from "@/lib/movie-info";
import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("id");

  const movie = await getSelectedMovieDetails(movieId);
  console.log(movie);

  const title = movie?.title;
  const description = movie?.overview.slice(0, 100);
  const posterPath = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          width: "1200px",
          height: "630px",
          padding: "20px",
        }}
      >
        <img
          src={posterPath}
          alt={title}
          style={{ width: "200px", marginRight: "20px", objectFit: "cover" }}
        />
        <div>
          <h1 style={{ fontSize: "40px", margin: "0" }}>{title}</h1>
          <p style={{ fontSize: "20px", marginTop: "10px" }}>{description}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
