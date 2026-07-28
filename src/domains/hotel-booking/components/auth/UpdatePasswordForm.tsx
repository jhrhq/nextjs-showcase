"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import { cn } from "@/lib/utils";
import { type UpdatePasswordInput, updatePasswordSchema } from "@/lib/validations/auth.schema";
import { Button } from "../ui/button";

export default function UpdatePasswordForm() {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: UpdatePasswordInput) {
    console.log(values);
  }

  return (
    <form id="update-password-form" noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="space-y-4">
        {/* Old Password Field */}
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="password"
                placeholder="Old Password"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* New Password Field */}
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="password"
                placeholder="New Password"
                className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {form.formState.errors?.root?.serverError && <FieldError errors={[form.formState.errors.root.serverError]} />}

      <Button
        type="submit"
        form="update-password-form"
        disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        Update
      </Button>
    </form>
  );
}
