"use server";

import { signIn, signOut } from "@/auth";

export async function doSignOut() {
  await signOut();
}

export async function googleSingIn() {
  await signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_DOMAIN });
}

// export async function login(formData) {
//     try {
//       const response = await signIn("credentials", {
//         email: formData.get("email"),
//         password: formData.get("password"),
//         redirect: false,
//       });
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   }
