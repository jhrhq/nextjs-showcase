import { BetterAuthError } from "better-auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

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

export const fromErrorToFormState = (error: unknown) => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR" as const,
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error && error.message == "NEXT_REDIRECT") {
    // user is signed in
    redirect("/");
    // just handling the error
    return {
      status: "ERROR" as const,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR" as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else if (error instanceof BetterAuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        return {
          status: "ERROR" as const,
          message: "Email is not found!",
          fieldErrors: {},
          timestamp: Date.now(),
        };

      default:
        return {
          status: "ERROR" as const,
          message: "Something went wrong!",
          fieldErrors: {},
          timestamp: Date.now(),
        };
    }
  } else {
    return {
      status: "ERROR" as const,
      message: "An unknown error occurred",
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};

export const toFormState = (status: FormState["status"], message: string): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
