"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldGroup, FieldError } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import { Button } from "../ui/button";

import { signInSchema } from "@/domains/hotel-booking/validationSchema/login-schema";
import { signInAction } from "../../actions/auth-action";
import { handleServerActionErrors } from "../../utils/form-helpers";
import { cn } from "@/lib/utils";

export default function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "john.doe@example.com",
      password: "password1234",
    },
  });

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: any) {
    try {
      const result = await signInAction(values);
      handleServerActionErrors(form.setError, result);
    } catch (error) {
      handleServerActionErrors(form.setError, null, error);
    }
  }

  return (
    <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
}
