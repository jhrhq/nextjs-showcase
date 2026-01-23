import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { useSignIn } from "@/domains/linker/hooks/use-auth";
import type { SignInInput } from "@/domains/linker/validations/auth.validation";

export function useSignInForm(form: UseFormReturn<SignInInput>) {
  const { data, mutate, isPending, isSuccess } = useSignIn();

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  // Sync server errors to form
  React.useEffect(() => {
    if (isSuccess) {
      if (data.fieldErrors) {
        Object.entries(data.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof SignInInput, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        setError("root", {
          type: "server",
          message: data.error,
        });
      }
    }
  }, [isSuccess, data, setError]);

  // Form submission handler
  const onSubmit = (data: SignInInput) => {
    mutate(data);
  };

  return {
    onSubmit,
    isLoading: isSubmitting || isPending,
    data,
  };
}
