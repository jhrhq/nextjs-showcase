"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { FieldValues } from "react-hook-form";
import z from "zod";
import { type SignIn, signInSchema } from "@/domains/hotel-booking/validationSchema/login-schema";
import { auth } from "@/lib/auth";
import { parseAuthError } from "@/lib/auth-error";
import { resolveCallbackUrlFromString } from "@/lib/callback-urls";
import { type SignUp, signUpSchema } from "../validationSchema/signup-schema";

export type ActionState<T extends FieldValues = FieldValues> = {
  status: boolean;
  fieldErrors?: Partial<Record<keyof T, string[]>>;
  serverError?: string;
};

export async function signInAction(
  // _prev: ActionState,
  // formData: FormData // used when action = {signInAction}
  callbackUrl: string,
  data: SignIn
) {
  // used when action = {signInAction}
  // const raw = {
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // };

  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return { status: parsed.success, fieldErrors };
  }

  try {
    await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });
  } catch (err: unknown) {
    const error = err as { status?: number; code?: string; message?: string };
    return { status: false, serverError: parseAuthError(error) };
  }

  const destination = resolveCallbackUrlFromString(callbackUrl);

  redirect(destination);
}

export async function signUpAction(
  // _prev: ActionState,
  // formData: FormData
  callbackUrl: string,
  data: SignUp
): Promise<ActionState> {
  // const raw = {
  //   name: formData.get("name"),
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  //   confirmPassword: formData.get("confirmPassword"),
  // };

  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return { status: parsed.success, fieldErrors };
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
    return { status: false, serverError: parseAuthError(error) };
  }

  const destination = resolveCallbackUrlFromString(callbackUrl);

  redirect(destination);
}
