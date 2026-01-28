"use client";

import { Lock, LucideEye, LucideEyeOff } from "lucide-react";
import * as React from "react";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import FormError from "@/ui/shared/auth-errro-alert";

type FormFieldWrapperProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;

  label?: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: string;

  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  topAddon?: React.ReactNode;
  bottomAddon?: React.ReactNode;

  as?: "input" | "textarea";
};

export function FormFieldWrapper<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  htmlFor,
  required = false,
  placeholder,
  type = "text",
  autoComplete = "off",
  startAddon,
  endAddon,
  topAddon,
  bottomAddon,
  as = "input",
}: FormFieldWrapperProps<TFieldValues>) {
  const id = React.useId();
  const userHtmlFor = htmlFor || id;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={userHtmlFor} className="gap-0.5">
              {label}
              {required && (
                <>
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">Required</span>
                </>
              )}
            </FieldLabel>
          )}

          <InputGroup>
            {topAddon && <InputGroupAddon align="block-start">{topAddon}</InputGroupAddon>}

            {startAddon && <InputGroupAddon align="inline-start">{startAddon}</InputGroupAddon>}

            {as === "textarea" ? (
              <InputGroupTextarea
                {...field}
                id={userHtmlFor}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            ) : (
              <InputGroupInput
                {...field}
                id={userHtmlFor}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete={autoComplete}
                type={type}
              />
            )}

            {endAddon && <InputGroupAddon align="inline-end">{endAddon}</InputGroupAddon>}

            {bottomAddon && <InputGroupAddon align="block-end">{bottomAddon}</InputGroupAddon>}
          </InputGroup>

          <FieldError>
            <FormError error={fieldState.error?.message} />
          </FieldError>
        </Field>
      )}
    />
  );
}

type FormFieldWrapperPasswordProps<TFieldValues extends FieldValues> = FormFieldWrapperProps<TFieldValues> & {
  showToggle?: boolean; // enable / disable eye button
  defaultVisible?: boolean; // start with password visible
  lockIcon?: React.ReactNode; // left icon override
  showIcon?: React.ReactNode; // eye open icon
  hideIcon?: React.ReactNode; // eye closed icon
};

export function FormFieldWrapperPassword<TFieldValues extends FieldValues>({
  control,
  name,
  label = "Password",
  htmlFor,
  required = false,
  placeholder = "Please enter your password.",
  type = "password",
  autoComplete = "off",

  showToggle = true,
  defaultVisible = false,
  lockIcon = <Lock className="size-4 text-muted-foreground" />,
  showIcon = <LucideEye className="size-4" />,
  hideIcon = <LucideEyeOff className="size-4" />,
}: FormFieldWrapperPasswordProps<TFieldValues>) {
  const id = React.useId();
  const userHtmlFor = htmlFor || id;

  const [showPassword, setShowPassword] = React.useState(defaultVisible);

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={userHtmlFor} className="gap-0.5">
              {label}
              {required && (
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              )}
            </FieldLabel>
          )}

          <InputGroup>
            {/* Left icon */}
            <InputGroupAddon>{lockIcon}</InputGroupAddon>

            <InputGroupInput
              {...field}
              id={userHtmlFor}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              aria-required={required}
              required={required}
              type={showPassword ? "text" : type}
              autoComplete={autoComplete}
            />

            {/* Right toggle button (conditional) */}
            {showToggle && (
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={togglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? showIcon : hideIcon}
                </Button>
              </InputGroupAddon>
            )}
          </InputGroup>

          <FieldError>
            <FormError error={fieldState.error?.message} />
          </FieldError>
        </Field>
      )}
    />
  );
}
