"use server";

import { revalidatePath } from "next/cache";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import { createUser, findUserByCredentials, removeFromWatchList, updateWatchList } from "@/domains/movies/db/queries";
import { signUpSchema } from "@/lib/validations/auth.schema";

async function performRegister(data) {
  const validated = signUpSchema.safeParse(data);

  try {
    if (!validated.success) {
      const errors = validated.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      return {
        errors,
      };
    } else {
      const { confirmPassword, ...rest } = data;
      await createUser(rest);
      return { message: "Registration successful!" };
    }
  } catch (error) {
    console.log(error);
  }
}

async function performLogin(data) {
  const validated = loginSchema.safeParse(data);
  try {
    if (!validated.success) {
      const errors = validated.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      return {
        errors,
      };
    } else {
      const found = await findUserByCredentials(data);
      return found;
    }
  } catch (error) {
    console.log(error);
  }
}

async function addToWatchList(movieId, authId, movie) {
  try {
    await updateWatchList(movieId, authId, movie);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(AUTH_CONFIG.ROUTES.DETAILS(movieId));
  revalidatePath(AUTH_CONFIG.ROUTES.WATCHLATER);
}

async function removeFromWatchListAction(movieId, authId) {
  try {
    await removeFromWatchList(movieId, authId);

    // Explicitly revalidate the specific page routes
    revalidatePath(AUTH_CONFIG.ROUTES.DETAILS(movieId), "page");
    revalidatePath(AUTH_CONFIG.ROUTES.WATCHLATER, "page");

    return { success: true, message: "Removed from watchlist successfully." };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove from watchlist");
  }
}

export { addToWatchList, performLogin, performRegister, removeFromWatchListAction };
