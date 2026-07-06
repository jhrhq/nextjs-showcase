"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { FieldCustomError } from "@/domains/hotel-booking/components/field-error";
import { Field, FieldGroup, FieldError } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import {
  type UpdatePasswordType,
  updatePasswordSchema,
} from "@/domains/hotel-booking/validationSchema/update-password-validation-schema";
import FormError from "@/ui/shared/auth-errro-alert";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  token: string;
  userId: string;
}

const UpdatePasswordForm: FC<Props> = ({ userId, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      userId: "",
      token: "",
    },
    values: { userId, token },
  });

  const pending = isSubmitting;

  async function onSubmit(values: UpdatePasswordType) {
    console.log(values);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Root server error notification */}
      <FieldCustomError errorMessage={errors?.root?.serverError?.message} />

      {/* Hidden Fields for state sync */}
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("token")} />

      <FieldGroup className="space-y-4">
        {/* Old Password Field */}
        <Field>
          <Input
            type="password"
            placeholder="Email" // Maintained original placeholder text choice
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("oldPassword")}
          />
          {errors.oldPassword?.message && (
            <FieldError>
              <FormError error={errors.oldPassword.message} />
            </FieldError>
          )}
        </Field>

        {/* New Password Field */}
        <Field>
          <Input
            type="password"
            placeholder="Email" // Maintained original placeholder text choice
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("newPassword")}
          />
          {errors.newPassword?.message && (
            <FieldError>
              <FormError error={errors.newPassword.message} />
            </FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        Update
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
