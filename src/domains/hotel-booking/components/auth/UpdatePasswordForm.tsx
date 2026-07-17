"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import { updatePasswordSchema } from "@/domains/hotel-booking/validationSchema/update-password-validation-schema";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  token: string;
  userId: string;
}

export default function UpdatePasswordForm({ userId, token }: Props) {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      userId: userId || "",
      token: token || "",
    },
  });

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <form id="update-password-form" noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Hidden Fields for state sync inside hook form context */}
      <Controller name="userId" control={form.control} render={({ field }) => <input type="hidden" {...field} />} />
      <Controller name="token" control={form.control} render={({ field }) => <input type="hidden" {...field} />} />

      <FieldGroup className="space-y-4">
        {/* Old Password Field */}
        <Controller
          name="oldPassword"
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
