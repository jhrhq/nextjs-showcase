"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { performLogin } from "@/domains/movies/actions";
import useAuth from "@/domains/movies/hooks/useAuth";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/lib/validations/auth.schema";
import { AUTH_CONFIG } from "../../constants/auth.constant";

const SignInForm = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const pending = form.formState.isSubmitting;
  async function onSubmit(data) {
    try {
      const response = await performLogin(data);
      if (response && response.errors) {
        Object.entries(response.errors).forEach(([key, value]) =>
          form.setError(key, { type: "manual", message: value })
        );
      } else if (response == null) {
        form.setError("root.random", {
          type: "random",
          message: "Email or password is not correct!",
        });
      } else {
        setAuth(response);
        router.push(AUTH_CONFIG.ROUTES.SIGN_IN);
      }
    } catch (err) {
      form.setError("root.random", {
        type: "random",
        message: err.message,
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* Email Field via Controller */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{" "}
            </Field>
          )}
        />

        {/* Password Field via Controller */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="password"
                placeholder="Password"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Root server error handling */}
      <FieldError className="rounded-full" errors={[form.formState.errors?.root?.serverError]} />
      {/* <ErrorAlert message={form.formState.errors?.root?.random?.message} />*/}

      <Button
        type="submit"
        form="sign-in-form"
        disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        {pending ? <span className="submitLoader" /> : "Continue"}
      </Button>
    </form>
  );
};

export default SignInForm;
