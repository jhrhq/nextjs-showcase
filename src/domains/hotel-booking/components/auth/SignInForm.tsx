"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldCustomError } from "@/domains/hotel-booking/components/field-error";
import { Field, FieldGroup, FieldError } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import { type SignIn, signInSchema } from "@/domains/hotel-booking/validationSchema/login-schema";
import { signInAction } from "../../actions/auth-action";
import FormError from "@/ui/shared/auth-errro-alert";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { handleServerActionErrors } from "../../utils/form-helpers";
import { error } from "better-auth/api";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "john.doe@example.com",
      password: "password1234",
    },
  });

  const pending = isSubmitting;

  async function onSubmit(values: SignIn) {
    try {
      const result = await signInAction(values);
      handleServerActionErrors(setError, result)
    } catch (error) {
      handleServerActionErrors(setError, null, error)
     }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <FieldGroup >
        {/* Email Field */}
        <Field>
          <Input
            type="email"
            placeholder="Email"
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("email")}
          />
            <FieldError>
              <FormError error={errors.email?.message} />
            </FieldError>
        </Field>

        {/* Password Field */}
        <Field>
          <Input
            type="password"
            placeholder="Password"
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("password")}
          />
            <FieldError>
              <FormError error={errors.password?.message} />
            </FieldError>
        </Field>
      </FieldGroup>
      {/* Root server error handling */}
      <FieldCustomError
        errorMessage={errors?.root?.serverError?.message}
      />

      <Button
        type="submit"
        disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        {pending ? <span className="submitLoader" /> : "Continue"}
      </Button>
    </form>
  );
};

export default SignInForm;
