"use server";

import { type SignIn,  signInSchema } from "@/domains/hotel-booking/validationSchema/login-schema";
import { auth } from "@/lib/auth";
import { parseAuthError } from "@/lib/auth-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignUp, signUpSchema } from "../validationSchema/signup-schema";


export type ActionState = {
  errors?: Record<string, string[]>;
  serverError?: string;
};



export async function signInAction(
  // _prev: ActionState,
  // formData: FormData // used when action = {signInAction}
  data: SignIn
): Promise<ActionState> {
  // used when action = {signInAction}
  // const raw = {
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // };

  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });
  } catch (err: unknown) {
    const error = err as { status?: number; code?: string; message?: string };
    return { serverError: parseAuthError(error) };
  }

  redirect("/hotel-booking");
}

export async function signUpAction(
  // _prev: ActionState,
  // formData: FormData
  data:SignUp
): Promise<ActionState> {
  // const raw = {
  //   name: formData.get("name"),
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  //   confirmPassword: formData.get("confirmPassword"),
  // };

  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: parsed.data.username,
        email: parsed.data.email,
        password: parsed.data.password,
        image: "https://unsplash.com/illustrations/a-cartoon-man-wearing-glasses-with-flowers-0Ae12IY3IY0",
      },
      headers: await headers(),
    });
  } catch (err: unknown) {
    const error = err as { status?: number; code?: string; message?: string };
    return { serverError: parseAuthError(error) };
  }

  redirect("/hotel-booking");
}
