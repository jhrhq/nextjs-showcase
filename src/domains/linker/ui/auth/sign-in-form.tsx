// ============================================================================
// FILE: src/components/features/auth/sign-in-form.tsx
// LOCATION: src/components/features/auth/sign-in-form.tsx
// PURPOSE: Sign in form with React Hook Form + Server Actions
// ============================================================================

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useSignInForm } from "@/domains/linker/hooks/use-sign-in";
import { type SignInInput, signInSchema } from "@/domains/linker/validations/auth.validation";
import { cn } from "@/lib/utils";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper, FormFieldWrapperPassword } from "@/ui/shared/form-field-wrapper";

export function SignInForm() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: {
      email: "test@example.com",
      password: "password123",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { onSubmit, isLoading } = useSignInForm(form);

  return (
    <form id="signin" onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FieldGroup>
        <FormFieldWrapper
          control={control}
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="off"
          required={true}
        />
        <FormFieldWrapperPassword
          control={control}
          label={"Password"}
          name="password"
          type="password"
          required={true}
        />
      </FieldGroup>
      {/* General Error Alert */}
      <FormError error={errors.root?.message} />
      <UserAction />
      <Field orientation="horizontal">
        <SubmitButton isLoading={isLoading} />
      </Field>
    </form>
  );
}

function UserAction() {
  return (
    <div className="flex gap-2 items-center justify-between my-2">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Remember Me</Label>
      </div>
      <Link href="/linker/forgot-password" className="font-medium text-primary">
        Forgot Password?
      </Link>
    </div>
  );
}

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
}

export function SubmitButton({ isLoading, className }: SubmitButtonProps) {
  return (
    <Button form="signin" type="submit" className={cn("w-full", className)} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}
