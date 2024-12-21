"use server";

import { loginSchema } from "@/app/_validationSchema/login-schema";
import { registerFormSchema } from "@/app/_validationSchema/registerSchema";
import { createUser, findUserByCredentials } from "@/db/queries";

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
    return error;
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

export { performLogin, performRegister };
