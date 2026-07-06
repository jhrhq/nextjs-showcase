"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldCustomError } from "@/domains/hotel-booking/components/field-error";
import { Field, FieldGroup, FieldError } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import { type SignUp, signUpSchema } from "@/domains/hotel-booking/validationSchema/signup-schema";
import { signUpAction } from "../../actions";
import FormError from "@/ui/shared/auth-errro-alert";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const pending = isSubmitting;

  async function onSubmit(values: SignUp) {
    try {
      await signUpAction(values);
    } catch (error) {
      setError("root.server", error);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Root server error notification */}
      <FieldCustomError errorMessage={errors?.root?.serverError?.message} />
      <FieldGroup className="space-y-4">
        {/* Username Field */}
        <Field>
          <Input
            type="text"
            placeholder="user name"
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("username")}
          />
          {errors.username?.message && (
            <FieldError>
              <FormError error={errors.username.message} />
            </FieldError>
          )}
        </Field>

        {/* Email Field */}
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

        {/* Password Field */}
        <Field>
          <Input
            type="password"
            placeholder="Password"
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("password")}
          />
          {errors.password?.message && (
            <FieldError>
              <FormError error={errors.password.message} />
            </FieldError>
          )}
        </Field>

        {/* Confirm Password Field */}
        <Field>
          <Input
            type="password"
            placeholder="Password"
            className="w-full h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <FieldError>
              <FormError error={errors.confirmPassword.message} />
            </FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button
        type="submit"
        disabled={pending}
        className={cn("w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition")}
      >
        {pending ? <span className="submitLoader" /> : "Continue"}
      </Button>{" "}
    </form>
  );
};

export default SignUpForm;
