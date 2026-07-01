import mongoose from "mongoose";
import { watchListModel } from "@/domains/movies/models/movie-watchlist-models";
import { userModel } from "@/domains/movies/models/user-model";
import { replaceMongoIdInObject } from "@/domains/movies/utils/data-utils";

async function getAllWatchLists() {
  const allWatchList = await watchListModel.find().lean();
  return allWatchList;
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateWatchList(movieId, authId, movie) {
  const found = await watchListModel.findOne({ id: movieId });

  if (found) {
    const foundUsers = found.watchList_ids.find((id) => id.toString() === authId);

    if (foundUsers) {
      found.watchList_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      found.watchList_ids.push(new mongoose.Types.ObjectId(authId));
    }

    found.save();
  } else {
    const watMovie = { ...movie, watchList_ids: [authId] };
    await watchListModel.create(watMovie);
  }
}

export { createUser, findUserByCredentials, getAllWatchLists, updateWatchList };
