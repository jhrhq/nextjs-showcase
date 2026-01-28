import { AxiosError } from "axios";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { AUTH_ERROR_MESSAGES } from "@/domains/linker/constants/auth.constants";
import { useCreateProject } from "@/domains/linker/hooks/use-projects";
import type { CreateProjectInput } from "@/domains/linker/validations/projects.validations";

type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export function useCreateProjectForm(form: UseFormReturn<CreateProjectInput>, setOpen: () => void) {
  const { data, mutate, isPending } = useCreateProject();
  const {
    setError,
    formState: { isSubmitting },
    reset,
  } = form;

  function onSubmit(data: CreateProjectInput) {
    mutate(data, {
      onSuccess: (data) => {
        toast.success("Project Created Successfully:", {
          description: data.name,
          position: "bottom-right",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
          } as React.CSSProperties,
        });
        reset();
        setOpen();
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const apiError = error.response?.data as ApiError;
          if (apiError.errors) {
            Object.entries(apiError.errors).forEach(([field, messages]) => {
              setError(field as keyof CreateProjectInput, {
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
