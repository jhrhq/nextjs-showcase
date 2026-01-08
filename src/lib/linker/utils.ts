import type z from "zod";
import type { SignInActionState, SignInErrors } from "@/lib/linker/types";

export function invalidCredentials(
  state: SignInActionState,
  inputs: SignInActionState["inputs"],
): SignInActionState {
  return {
    ...state,
    success: false,
    message: "Invalid credentials",
    inputs,
    errors: {
      _form: ["Invalid email or password"],
    },
  };
}

export function zodIssueToActionErrors(
  issues: z.core.$ZodIssue[],
): SignInErrors["_errors"] {
  const errors: SignInErrors["_errors"] = {};

  for (const issue of issues) {
    const path = issue.path.join(".");

    /*  // Form-level error (rare but possible)
    if (!path) {
      errors._form ??= [];
      errors._form.push(issue.message);
    } */
    // const field = issue.path[0]  ; // flat field name

    const error = {
      type: issue.code,
      message: issue.message,
    };
    errors[path] = error;
  }

  return errors;
}
