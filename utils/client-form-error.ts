import { AuthError } from "next-auth";

export type FormState = {
  status: "UNSET" | "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_FORM_STATE: FormState = {
  status: "UNSET" as const,
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const clientFormErrorState = (error: unknown, setError) => {
  if (error instanceof Error && error.message == "NEXT_REDIRECT") {
    // user is signed in
    // just handling the error
    return setError("root.serverError", {
      type: "manual",
      message: error.message,
    });
  } else if (error instanceof Error) {
    return setError("root.serverError", {
      type: "manual",
      message: error.message,
    });
  } else if (error instanceof AuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        return setError("root.serverError", {
          type: "manual",
          message: "Email or Password does not match",
        });

      default:
        return setError("root.serverError", {
          type: "manual",
          message: "Something went wrong",
        });
    }
  } else {
    return setError("root.serverError", {
      type: "manual",
      message: "An unknown error occurred",
    });
  }
};

export const toFormState = (
  status: FormState["status"],
  message: string
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
