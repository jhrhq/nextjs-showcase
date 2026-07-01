import mongoose from "mongoose";

import { NextResponse } from "next/server";
import { watchListModel } from "@/domains/movies/models/movie-watchlist-models";
import { dbConnect } from "@/domains/movies/services/mongo";

export async function GET() {
  try {
    await dbConnect();
    const watchlist = await watchListModel.find().lean();
    if (watchlist) {
      return NextResponse.json(watchlist);
    }
    return NextResponse.json({ message: `Watch list not found` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.id || !body.userId) {
      throw new Error("Missing movieId or userId in request body");
    }
    const movie = await watchListModel.findOne({ id: body.id });
    if (movie) {
      movie.watchList_ids.pull(new mongoose.Types.ObjectId(body.userId));
      movie.save();
    }
    return NextResponse.json({ message: `Movie Removed successfully!` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}
