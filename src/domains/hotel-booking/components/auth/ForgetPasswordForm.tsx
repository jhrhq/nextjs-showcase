"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generatePassResetLinkAction } from "@/domains/hotel-booking/actions/password-reset";
import { FieldCustomError } from "@/domains/hotel-booking/components/field-error";
import { Field, FieldGroup, FieldError } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import {
  type ForgetPasswordType,
  forgetPasswordSchema,
} from "@/domains/hotel-booking/validationSchema/update-password-validation-schema";
import FormError from "@/ui/shared/auth-errro-alert";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgetPasswordType) {
    try {
      const result = await generatePassResetLinkAction(values);
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldCustomError errorMessage={errors?.root?.serverError?.message} />
      <FieldGroup>
        <Field>
          <Input
            type="email"
            placeholder="Email"
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("email")}
          />

          {errors.email?.message && (
            <FieldError>
              <FormError error={errors.email.message} />
            </FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button
        type="submit"
        // disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        Send
      </Button>{" "}
    </form>
  );
};

export default ForgetPasswordForm;
