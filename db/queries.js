import { watchListModel } from "@/models/movie-watchlist-models";
import { userModel } from "@/models/user-model";
import { replaceMongoIdInObject } from "@/utils/data-utils";

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
export { createUser, findUserByCredentials, getAllWatchLists };
