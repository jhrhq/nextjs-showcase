"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { actionCreator } from "@/lib/actions/action-creator";
import { auth } from "@/lib/auth";
import { resolveCallbackUrlFromString } from "@/lib/callback-urls";
import { signInSchema, signUpSchema } from "@/lib/validations/auth.schema";

const withCallbackUrl = z.object({
  callbackUrl: z.string().optional(),
});

export const signInAction = actionCreator(signInSchema.extend(withCallbackUrl.shape), async (data) => {
  await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    },
    headers: await headers(),
  });

  const destination = resolveCallbackUrlFromString(data.callbackUrl);
  redirect(destination);
});

export const signUpAction = actionCreator(signUpSchema.extend(withCallbackUrl.shape), async (data) => {
  await auth.api.signUpEmail({
    body: {
      name: data.username,
      email: data.email,
      password: data.password,
      image: "https://unsplash.com/illustrations/a-cartoon-man-wearing-glasses-with-flowers-0Ae12IY3IY0",
    },
    headers: await headers(),
  });

  const destination = resolveCallbackUrlFromString(data.callbackUrl);
  redirect(destination);
});
