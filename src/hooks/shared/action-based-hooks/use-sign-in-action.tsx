import { useRouter } from "next/navigation";
import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { SignInInput } from "@/domains/linker/validations/auth.validation";
import { signInAction } from "@/domains/portfolio/actions/auth";

export function useSignInAction(form: UseFormReturn<SignInInput>) {
  const router = useRouter();
  const [state, formAction, isPending] = React.useActionState(signInAction, null);
  const [isTransitioning, startTransition] = React.useTransition();

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  // Handle successful authentication
  React.useEffect(() => {
    if (state?.success) {
      router.push(state.data.redirectTo);
      router.refresh();
    }
  }, [state, router]);

  // Sync server errors to form
  React.useEffect(() => {
    if (state && !state.success) {
      if (state.fieldErrors) {
        Object.entries(state.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof SignInInput, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        setError("root", {
          type: "server",
          message: state.error,
        });
      }
    }
  }, [state, setError]);

  // Form submission handler
  const onSubmit = (data: SignInInput) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      formAction(formData);
    });
  };

  return {
    onSubmit,
    isLoading: isSubmitting || isPending || isTransitioning,
    state,
  };
}
