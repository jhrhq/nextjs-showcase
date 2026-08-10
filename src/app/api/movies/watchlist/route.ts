import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/domains/movies/config/database";
import watchlists from "@/domains/movies/models/movie-watchlist-models";

export async function POST() {
  try {
    await connectToDatabase();
    const watchlist = await watchlists.find().lean();
    if (watchlist) {
      return NextResponse.json(watchlist);
    }
    return NextResponse.json({ message: `Watch list not found` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.movieId || !body.userId) {
      throw new Error("Missing movieId or userId in request body");
    }
    await connectToDatabase();

    const { userId, movieId, movie } = body;

    const found = await watchlists.findOne({ id: movieId });

    let actionMessage = "";

    if (found) {
      const watchlistIds = found.watchlist_ids ?? [];
      const isAlreadyInList = watchlistIds.includes(userId);

      if (isAlreadyInList) {
        found.watchlist_ids = watchlistIds.filter((id) => id !== userId);
        await found.save();
        actionMessage = "Removed from watchlist successfully";
      } else {
        found.watchlist_ids = [...watchlistIds, userId];
        await found.save();
        actionMessage = "Added to watchlist successfully";
      }
      await found.save();
    } else {
      const watMovie = { ...movie, watchlist_ids: [userId] };
      await watchlists.create(watMovie);
    }
    return NextResponse.json({ message: actionMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}
