// utils/form-helpers.ts
import { FieldValues, UseFormSetError, Path } from 'react-hook-form';
import { ActionState } from '../actions/auth-action';

export function handleServerActionErrors<TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  result?: ActionState<TFieldValues> | null,
  catchError?: unknown
): void {

  // Scenario A: Handle validation field errors returned directly from the server action
  if (result && !result.status) {
    if (result.fieldErrors) {
      const errorEntries = Object.entries(result.fieldErrors) as Array<
        [keyof TFieldValues, string[] | undefined]
      >;
      for (const [field, messages] of errorEntries) {
        if (messages && messages.length > 0) {
          setError(field as Path<TFieldValues>, {
            type: 'server',
            message: messages[0]
          });
        }
      }
    }
    if (result.serverError) {
      setError('root.serverError' as Path<TFieldValues>, {
        type: 'custom',
        message: result.serverError,
      });
    }
    return;
  }


  // Scenario B: Handle an error caught inside the frontend onSubmit catch block
  if (catchError !== undefined && catchError !== null) {
    let fallbackMessage = 'An unexpected system error occurred.';

    // Check if the thrown exception matches your customized object signature
    if (
      typeof catchError === 'object' &&
      'serverError' in catchError &&
      typeof (catchError as any).serverError === 'string'
    ) {
      fallbackMessage = (catchError as any).serverError;
    }
    // Fallback for standard JavaScript Errors (like native Network / Next.js chunk failures)
    else if (catchError instanceof Error) {
      if(catchError.message === "NEXT_REDIRECT") return
      fallbackMessage = catchError.message;
    }

    setError('root.serverError' as Path<TFieldValues>, {
      type: 'custom',
      message: fallbackMessage,
    });
  }
}
