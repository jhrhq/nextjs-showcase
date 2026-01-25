import { AxiosError } from "axios";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { AUTH_ERROR_MESSAGES } from "@/domains/linker/constants/auth.constants";
import { useSignIn } from "@/domains/linker/hooks/use-auth";
import type { SignInInput } from "@/domains/linker/validations/auth.validation";

type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export function useSignInForm(form: UseFormReturn<SignInInput>) {
  const { data, mutate, isPending } = useSignIn();
  const {
    setError,
    formState: { isSubmitting },
  } = form;

  function onSubmit(data: SignInInput) {
    mutate(data, {
      onSuccess: (data) => {
        toast.success("Login Successful:", {
          description: data.user.name,
          position: "bottom-right",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
          } as React.CSSProperties,
        });
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const apiError = error.response?.data as ApiError;
          if (apiError.errors) {
            Object.entries(apiError.errors).forEach(([field, messages]) => {
              setError(field as keyof SignInInput, {
                type: "server",
                message: messages[0],
              });
            });
          } else if (apiError?.message) {
            form.setError("root", {
              type: "server",
              message: apiError.message,
            });
          } else {
            form.setError("root", {
              type: "server",
              message: AUTH_ERROR_MESSAGES.SERVER_ERROR,
            });
          }
        } else {
          form.setError("root", {
            type: "server",
            message: AUTH_ERROR_MESSAGES.SERVER_ERROR,
          });
        }
      },
    });
  }

  return {
    onSubmit,
    isLoading: isSubmitting || isPending,
    data,
  };
}
