"use server";

import { revalidatePath } from "next/cache";
import { createUser, findUserByCredentials, updateWatchList } from "@/domains/movies/db/queries";
import { loginSchema } from "@/domains/movies/validationSchema/loginSchema";
import { registerFormSchema } from "@/domains/movies/validationSchema/registerSchema";

async function performRegister(data) {
  const validated = registerFormSchema.safeParse(data);

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
    throw error;
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
    throw error;
  }
}

async function addToWatchList(movieId, authId, movie) {
  try {
    await updateWatchList(movieId, authId, movie);
  } catch (error) {
    throw error;
  }
  // Todo revalidate to movie details
  revalidatePath("/");
}

export { addToWatchList, performLogin, performRegister };
