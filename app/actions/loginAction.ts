"use server";

import { signIn } from "@/auth";
import { Login } from "@/FormValidationSchema/login-schema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// export const loginFormAction = async (
//   formState: FormState,
//   formData: FormData
// ) => {
//   try {
//     const data = loginFormSchema.parse({
//       email: formData.get("email"),
//       password: formData.get("password"),
//     });
//     const response = await signIn("credentials", { ...data, redirect: false });
//     if (response) {
//       console.log(response);
//     }
//     return response;
//   } catch (error) {
//     return fromErrorToFormState(error);
//   }

//   revalidatePath("/");

//   return toFormState("SUCCESS", "Login Successful");
// };
export const loginFormAction = async (formData: Login) => {
  try {
    await signIn("credentials", {
      ...formData,
      redirectTo: "/",
      redirect: true,
    });
  } catch (error) {
    // fromErrorToFormState(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid credentials",
          };
        default:
          return {
            success: false,
            message: "Something went wrong.",
          };
      }
    } else if (error instanceof Error && error.message == "NEXT_REDIRECT") {
      // user is signed in
      // just handling the error
      // errorMsg = error.message;
      redirect("/");
    }
    throw error;
  }

  // return {success: true}

  // revalidatePath("/");

  // return toFormState("SUCCESS", "Login Successful");
};
