// ============================================================================
// FILE: src/components/features/auth/sign-in-form.tsx
// LOCATION: src/components/features/auth/sign-in-form.tsx
// PURPOSE: Sign in form with React Hook Form + Server Actions
// ============================================================================

"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldWrapper,
  FormFieldWrapperPassword,
} from "@/components/linker/shared/form-field-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/lib/linker/actions/auth";
import type {
  SignInInput,
  // signInSchema,
} from "@/lib/linker/validations/auth.validation";

/**
 * Sign In Form Component
 *
 * Combines:
 * - React Hook Form (client validation & UX)
 * - Server Actions (server-side auth)
 * - useActionState (progressive enhancement)
 * - shadcn/ui (accessible components)
 * - Lucide icons (visual feedback)
 *
 * Features:
 * - Client-side validation with instant feedback
 * - Server-side validation and authentication
 * - Loading states and error handling
 * - Accessibility (ARIA, keyboard navigation)
 * - Progressive enhancement (works without JS)
 */
export function SignInForm() {
  const router = useRouter();

  // Server Action state management
  const [state, formAction, isPending] = React.useActionState(
    signInAction,
    null,
  );

  // React Hook Form setup
  const form = useForm<SignInInput>({
    // resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    control,
  } = form;

  // Handle successful authentication
  React.useEffect(() => {
    if (state?.success) {
      router.push(state.data.redirectTo);
      router.refresh();
    }
  }, [state, router]);

  // Sync server errors to React Hook Form
  React.useEffect(() => {
    if (state && !state.success) {
      if (state.fieldErrors) {
        // Set field-specific errors
        Object.entries(state.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof SignInInput, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        // Set general form error
        setError("root", {
          type: "server",
          message: state.error,
        });
      }
    }
  }, [state, setError]);

  // Form submission handler
  const onSubmit = (data: SignInInput) => {
    clearErrors();

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    formAction(formData);
  };
  /*   function onSubmit(data: LoginFormData) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),

      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  } */

  const isLoading = isSubmitting || isPending;
  console.log(state);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FieldGroup>
        {/* Email Field */}
        <FormFieldWrapper
          control={control}
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        {/* Password Field */}
        <FormFieldWrapperPassword
          label={"Password"}
          name="password"
          control={control}
          required={true}
        />
      </FieldGroup>
      {/* General Error Alert */}
      {errors.root && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}
      <UserAction />
      <Field orientation="horizontal">
        <Button
          className="w-full"
          type="submit"
          form="form-rhf-demo"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}{" "}
        </Button>
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
