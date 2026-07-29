import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ActionState } from "@/types/shared/action.types";

function isFormPath<T extends FieldValues>(key: string): key is Path<T> {
  return typeof key === "string" && key.length > 0;
}

export function bindFormErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  result?: ActionState<unknown> | null,
  catchError?: unknown
): void {
  if (result?.message === "NEXT_REDIRECT") return;
  if (catchError instanceof Error && catchError.message === "NEXT_REDIRECT") return;

  if (result && !result.success) {
    if (result.fieldErrors) {
      for (const [key, messages] of Object.entries(result.fieldErrors)) {
        if (messages?.[0] && isFormPath<T>(key)) {
          setError(key, { type: "server", message: messages[0] });
        }
      }
    }

    const rootMessage = result.message || result.formErrors?.[0];
    if (rootMessage) {
      setError("root.serverError", { type: "custom", message: rootMessage });
    }
    return;
  }

  if (catchError) {
    const message = catchError instanceof Error ? catchError.message : "An unexpected error occurred.";
    if (message !== "NEXT_REDIRECT") {
      setError("root.serverError", { type: "custom", message });
    }
  }
}
