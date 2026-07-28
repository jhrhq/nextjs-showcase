"use server";

import { revalidatePath } from "next/cache";
import { createUser, findUserByCredentials, updateWatchList } from "@/domains/movies/db/queries";
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
  // Todo revalidate to movie details
  revalidatePath("/");
}

export { addToWatchList, performLogin, performRegister };
