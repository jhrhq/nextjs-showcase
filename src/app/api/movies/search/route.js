import { NextResponse } from "next/server";
import { getMovieWithKeyWord } from "@/domains/movies/lib/movie-info";

export async function GET(request) {
  const url = new URL(request.url);
  const searchKeyword = url.searchParams.get("movieName"); // Get the "search" query parameter

  // Ensure search query is provided
  if (!searchKeyword) {
    return NextResponse.json({ message: "Search query is required" }, { status: 400 });
  }

  try {
    const response = await getMovieWithKeyWord(searchKeyword);

    // Send the data as a response
    return NextResponse.json(response.results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
