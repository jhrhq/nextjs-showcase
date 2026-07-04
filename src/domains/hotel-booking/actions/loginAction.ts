"use server";

import { redirect } from "next/navigation";
import { type Login, loginSchema } from "@/domains/hotel-booking/validationSchema/login-schema";
import { authClient } from "@/lib/auth-client";
import { BetterAuthError } from "better-auth";


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
    const result = loginSchema.safeParse(formData);
    if (!result.success) return { status: false, errors: result.error.formErrors.fieldErrors };

    const { email, password } = result.data;

    const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: `${process.env.NEXT_PUBLIC_DOMAIN}/hotel-booking`,
    });
    if (error) {
      throw new Error(error)
    }
    return { status: true, data };
  } catch (error) {
    console.log(error);
    let errorMsg = "";
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      redirect("/");
    } else if (error instanceof BetterAuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          errorMsg = "Something went wrong";
          break;

        default:
          errorMsg = error.message;
          break;
      }
    } else {
      errorMsg = (error as any).message;
    }
    return { message: errorMsg, status: false };
  }
};
