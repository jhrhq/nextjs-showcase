"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";

import { cn } from "@/lib/utils";
import { type SignUpInput, signUpSchema } from "@/lib/validations/auth.schema";
import { signUpAction } from "../../actions";
import { handleServerActionErrors } from "../../utils/form-helpers";
import { Button } from "../ui/button";

type SignUPFormProps = {
  /** Pre-validated callback path — where to go after sign-in succeeds. */
  callbackUrl: string;
};

export default function SignUpForm({ callbackUrl }: SignUPFormProps) {
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
  const boundAction = signUpAction.bind(null, callbackUrl);
  async function onSubmit(values: SignUpInput) {
    try {
      const result = await boundAction(values);
      handleServerActionErrors(form.setError, result);
    } catch (error) {
      handleServerActionErrors(form.setError, null, error);
    }
  }

  return (
    <form id="sign-up-form" noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="space-y-4">
        {/* Username Field */}
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="text"
                placeholder="User name"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
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
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
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

        {/* Confirm Password Field */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="password"
                placeholder="Confirm Password"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Root server error notification */}
        <FieldError errors={[form.formState.errors?.root?.serverError]} />
      </FieldGroup>

      <Button
        type="submit"
        form="sign-up-form"
        disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        {pending ? <span className="submitLoader" /> : "Continue"}
      </Button>
    </form>
  );
}
