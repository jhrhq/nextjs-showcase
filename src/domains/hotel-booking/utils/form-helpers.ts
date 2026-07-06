import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { ActionState } from "../actions/auth-action";

export function handleServerActionErrors<TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  result?: ActionState<TFieldValues> | null,
  catchError?: unknown
): void {

  if (result && !result.status) {
    if (result.fieldErrors) {
      const errorEntries = Object.entries(result.fieldErrors) as Array<[keyof TFieldValues, string[] | undefined]>;
      for (const [field, messages] of errorEntries) {
        if (messages && messages.length > 0) {
          setError(field as Path<TFieldValues>, {
            type: "server",
            message: messages[0],
          });
        }
      }
    }
    if (result.serverError) {
      setError("root.serverError" as Path<TFieldValues>, {
        type: "custom",
        message: result.serverError,
      });
    }
    return;
  }


  if (catchError !== undefined && catchError !== null) {
    let fallbackMessage = "An unexpected system error occurred.";

    if (
      typeof catchError === "object" &&
      "serverError" in catchError &&
      typeof (catchError as any).serverError === "string"
    ) {
      fallbackMessage = (catchError as any).serverError;
    }

    else if (catchError instanceof Error) {
      if (catchError.message === "NEXT_REDIRECT") return;
      fallbackMessage = catchError.message;
    }

    setError("root.serverError" as Path<TFieldValues>, {
      type: "custom",
      message: fallbackMessage,
    });
  }
}
