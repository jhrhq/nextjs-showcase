"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations/auth.schema";

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const pending = form.formState.isSubmitting;
  const rootError = form.formState.errors?.root?.random || form.formState.errors?.root?.serverError;

  async function onSubmit() {
    // Clear root errors before new attempt
    form.clearErrors("root");
  }

  return (
    <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup className="space-y-4">
        {/* Username Field */}
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-1.5">
              <Input
                {...field}
                type="text"
                placeholder="Username"
                className={cn(
                  "w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-lg text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all",
                  fieldState.invalid && "border-destructive focus-visible:ring-destructive"
                )}
                aria-invalid={fieldState.invalid}
                autoComplete="username"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-1.5">
              <Input
                {...field}
                type="email"
                placeholder="Email address"
                className={cn(
                  "w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-lg text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all",
                  fieldState.invalid && "border-destructive focus-visible:ring-destructive"
                )}
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-1.5">
              <Input
                {...field}
                type="password"
                placeholder="Create password"
                className={cn(
                  "w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-lg text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all",
                  fieldState.invalid && "border-destructive focus-visible:ring-destructive"
                )}
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm Password Field */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-1.5">
              <Input
                {...field}
                type="password"
                placeholder="Confirm password"
                className={cn(
                  "w-full px-4 py-3 bg-secondary/50 border border-border text-foreground rounded-lg text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all",
                  fieldState.invalid && "border-destructive focus-visible:ring-destructive"
                )}
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Root random/server error handling */}
      {rootError && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center"
        >
          {rootError.message}
        </div>
      )}

      <Button
        type="submit"
        form="sign-up-form"
        disabled={pending}
        className={cn(
          "w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold text-sm shadow-md cursor-pointer disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        {pending ? (
          <div className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span>Creating account...</span>
          </div>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
