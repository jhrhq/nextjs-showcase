import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  backdrop_path: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
    // enum: ['movie', 'tv'] // Assuming media type could be 'movie' or 'tv'
  },
  adult: {
    type: Boolean,
    required: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  genre_ids: {
    type: [Number],
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  video: {
    type: Boolean,
    required: true,
  },
  vote_average: {
    type: Number,
    default: 0,
  },
  vote_count: {
    type: Number,
    default: 0,
  },
});

export const watchListModel =
  mongoose.models.watchlists ?? mongoose.model("watchlists", schema);
