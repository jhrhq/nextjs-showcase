import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  id: {
    type: Number,
  },

  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
  },

  release_date: {
    type: String,
  },
  revenue: {
    type: Number,
  },
  runtime: {
    type: Number,
  },

  status: {
    type: String,
  },
  tagline: {
    type: String,
  },
  title: {
    type: String,
  },

  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  watchList_ids: {
    type: [String],
  },
});

export const watchListModel =
  mongoose.models.watchlists ?? mongoose.model("watchlists", schema);
