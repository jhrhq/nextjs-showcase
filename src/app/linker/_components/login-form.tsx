"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, LucideEye, LucideEyeOff } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
// import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  // FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { signInAction } from "@/lib/linker/actions";
import {
  type LoginFormData,
  loginSchema,
  type SignInActionState,
} from "@/lib/linker/types";

export const signInInitialState: SignInActionState = {
  success: false,
  message: "",
  inputs: {
    email: null,
    password: null,
  },
  errors: {},
};

export function LoginForm() {
  const [actionState, formAction, pending] = React.useActionState(
    signInAction,
    signInInitialState,
  );
  const [_, startTransition] = React.useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@mail.com",
      password: "123456789",
    },
    errors: actionState.errors?._errors,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  // console.log(actionState);
  /* 
  function onSubmit(data: LoginFormData) {
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

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Please login to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          id="form-rhf-demo"
          onSubmit={form.handleSubmit((_, e) => {
            startTransition(() => {
              const formData = new FormData(e?.target);
              formAction(formData);
            });
          })}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="email@mail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}>
                      <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{fieldState.error?.message}.</AlertTitle>
                      </Alert>
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Please enter you password."
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-end">
                      <Button
                        className="m-0 p-0 size-auto"
                        variant="ghost"
                        type="button"
                        onClick={togglePassword}
                      >
                        {showPassword ? (
                          <LucideEye
                            strokeWidth="1"
                            className="text-gray-900"
                          />
                        ) : (
                          <LucideEyeOff strokeWidth="1" />
                        )}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}>
                      <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{fieldState.error?.message}.</AlertTitle>
                      </Alert>
                    </FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo" disabled={pending}>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
