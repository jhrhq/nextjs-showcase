import mongoose, { type Model, Schema } from "mongoose";
import type { IWatchlistDocument } from "../types/tmdb-movie.types";

const watchlistSchema = new Schema<IWatchlistDocument>({
  backdrop_path: {
    type: String,
    default: null,
  },
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
    default: null,
  },
  media_type: {
    type: String,
  },
  adult: {
    type: Boolean,
  },
  genre_ids: {
    type: [Number],
  },
  popularity: {
    type: Number,
  },
  release_date: {
    type: String,
  },
  video: {
    type: Boolean,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  watchlist_ids: {
    type: [String],
    default: [],
  },
});

const watchlists: Model<IWatchlistDocument> =
  (mongoose.models.watchlists as Model<IWatchlistDocument>) ||
  mongoose.model<IWatchlistDocument>("watchlists", watchlistSchema);

export default watchlists;
