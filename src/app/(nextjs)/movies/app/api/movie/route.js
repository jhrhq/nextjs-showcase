import { getSelectedMovieDetails } from "@/lib/movie-info";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const movieId = url.searchParams.get("movieId");

  // Ensure search query is provided
  if (!movieId) {
    return NextResponse.json(
      { message: "Movie id is required" },
      { status: 400 }
    );
  }

  try {
    const response = await getSelectedMovieDetails(movieId);

    // Send the data as a response
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
