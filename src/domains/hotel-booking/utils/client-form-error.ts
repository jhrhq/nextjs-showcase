import { AuthError } from "next-auth";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
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

/**
 * Expected shape for Zod validation errors returned to the client
 */
export type FormValidationError<T extends FieldValues> = {
  status: "ERROR";
  message: string;
  fieldErrors: Partial<Record<keyof T, string[]>>;
  timestamp: number;
};

/**
 * Handles complex errors (Zod, Next.js Redirects, Auth, and Generic Errors)
 */
export const clientFormErrorState = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): FormValidationError<T> | void => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR" as const,
      message: "",
      fieldErrors: error.flatten().fieldErrors as Partial<
        Record<keyof T, string[]>
      >,
      timestamp: Date.now(),
    };
  }

  if (error instanceof Error) {
    if (error.message === "NEXT_REDIRECT") {
      // Next.js handles redirects via thrown errors. Usually, you want to rethrow this
      // so Next.js can actually perform the redirect, but keeping your logic here:
      return setError("root.serverError", {
        type: "manual",
        message: error.message,
      });
    }

    return setError("root.serverError", {
      type: "manual",
      message: error.message,
    });
  }

  if (error instanceof AuthError) {
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
  }

  // Fallback for completely unknown errors
  return setError("root.serverError", {
    type: "manual",
    message: "An unknown error occurred",
  });
};

/**
 * Handles mapping server-side field errors (often formatted as { fieldName: ["Error message"] })
 * directly back into React Hook Form states.
 */
export function clientSuccessErrorState<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): void {
  if (error && typeof error === "object") {
    Object.entries(error).forEach(([key, value]) => {
      const errorMessage =
        Array.isArray(value) && typeof value[0] === "string"
          ? value[0]
          : "Invalid input";

      setError(key as Path<T>, {
        type: "manual",
        message: errorMessage,
      });
    });
  } else {
    // Fixed: Removed the 'return' keyword here
    setError("root.serverError", {
      type: "manual",
      message: typeof error === "string" ? error : "An unknown error occurred",
    });
  }
}
export const toFormState = (
  status: FormState["status"],
  message: string,
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
