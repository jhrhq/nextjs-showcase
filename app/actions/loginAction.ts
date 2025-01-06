"use server";

import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/form-error-state";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Please Enter a valid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(4, "Please enter your password")
    .max(100),
});

export const loginFormAction = async (
  formState: FormState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    const data = loginFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log("Success!", data);
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath("/");

  return toFormState("SUCCESS", "Login Successful");
};
