"use server";

import { signIn } from "@/auth";
import { Login, loginSchema } from "@/validationSchema/login-schema";
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
    const result = loginSchema.safeParse(formData);
    if (!result.success)
      return { status: false, errors: result.error.formErrors.fieldErrors };

    const { email, password } = result.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { status: true };
  } catch (error) {
    console.log(error);
    let errorMsg = "";
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      redirect("/");
    } else if (error instanceof AuthError) {
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
