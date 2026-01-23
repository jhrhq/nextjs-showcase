// ============================================================================
// FILE: src/components/shared/form-field-wrapper.tsx
// LOCATION: src/components/shared/form-field-wrapper.tsx
// PURPOSE: Reusable form field wrapper component
// ============================================================================

"use client";

import { Lock, LucideEye, LucideEyeOff, Mail } from "lucide-react";
import * as React from "react";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
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
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
          <InputGroup>
            <InputGroupInput
              {...field}
              id={userHtmlFor}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
              type={type}
            />
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
          </InputGroup>

          <FieldError>
            <FormError error={fieldState.error?.message} />
          </FieldError>
        </Field>
      )}
    />
  );
}
export function FormFieldWrapperPassword<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  htmlFor,
  required = false,
  placeholder = "Please enter you password.",
  type = "password",
  autoComplete = "off",
}: FormFieldWrapperProps<TFieldValues>) {
  const id = React.useId();
  const userHtmlFor = htmlFor || id;

  const [showPassword, setShowPassword] = React.useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={userHtmlFor} className="gap-0.5">
              Password {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
          <InputGroup>
            <InputGroupAddon>
              <Lock />
            </InputGroupAddon>
            <InputGroupInput
              {...field}
              id={userHtmlFor}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              type={showPassword ? "text" : type}
              autoComplete={autoComplete}
            />
            <InputGroupAddon align="inline-end">
              <Button className="m-0 p-0 size-auto" variant="ghost" type="button" onClick={togglePassword}>
                {showPassword ? (
                  <LucideEye strokeWidth="1" className="text-gray-900" />
                ) : (
                  <LucideEyeOff strokeWidth="1" />
                )}
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <FieldError>
            <FormError error={fieldState.error?.message} />
          </FieldError>
        </Field>
      )}
    />
  );
}
