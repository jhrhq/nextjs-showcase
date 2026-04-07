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

/**
 * Generic form field wrapper built on top of React Hook Form's `Controller`.
 *
 * Provides a consistent API for rendering controlled inputs with:
 * - label + required indicator
 * - validation state handling
 * - error display
 * - flexible input rendering (input / textarea)
 * - composable UI addons (start/end/top/bottom)
 *
 * Strongly typed via `TFieldValues`, ensuring:
 * - `name` is restricted to valid keys of your form schema
 * - `field.value` and updates stay type-safe
 *
 * @template TFieldValues extends FieldValues
 *
 * @param props.control - RHF control instance from `useForm<T>()`
 * @param props.name - Field path, type-safe against `TFieldValues`
 *
 * @param props.label - Optional label text
 * @param props.htmlFor - Custom id (falls back to `useId`)
 * @param props.required - Adds visual required indicator (does NOT enforce validation)
 *
 * @param props.placeholder - Input placeholder
 * @param props.type - Native input type (ignored for textarea)
 * @param props.autoComplete - Browser autocomplete behavior
 *
 * @param props.startAddon - Inline element before input (e.g. icon)
 * @param props.endAddon - Inline element after input (e.g. button)
 * @param props.topAddon - Block element above input
 * @param props.bottomAddon - Block element below input
 *
 * @param props.as - Switch between `"input"` and `"textarea"`
 *
 * @remarks
 * - Validation rules should be defined in `useForm` or schema (e.g. Zod), not here
 * - `required` is purely visual; use RHF validation for actual enforcement
 * - Avoid passing uncontrolled props (value/defaultValue) — RHF manages state
 *
 * @example Type-safe usage
 * ```ts
 * type FormValues = {
 *   email: string;
 *   message: string;
 * };
 *
 * const form = useForm<FormValues>();
 *
 * // ✅ Valid: "email" exists in FormValues
 * <FormFieldWrapper<FormValues>
 *   control={form.control}
 *   name="email"
 *   label="Email"
 *   type="email"
 * />
 *
 * // ❌ Type error: "username" is not in FormValues
 * <FormFieldWrapper<FormValues>
 *   control={form.control}
 *   name="username" // TS error
 * />
 * ```
 *
 * @example With addons
 * ```tsx
 * <FormFieldWrapper
 *   control={control}
 *   name="amount"
 *   label="Amount"
 *   startAddon={<span>$</span>}
 *   endAddon={<span>USD</span>}
 * />
 * ```
 */
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
  showToggle?: boolean;
  defaultVisible?: boolean;
  lockIcon?: React.ReactNode;
  showIcon?: React.ReactNode;
  hideIcon?: React.ReactNode;
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
