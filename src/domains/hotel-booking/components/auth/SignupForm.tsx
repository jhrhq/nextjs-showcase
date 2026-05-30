"use client";

import SubmitButton from "@/domains/hotel-booking/components/SubmitButton";
import { Input } from "@/domains/hotel-booking/components/ui/input";

import { useForm } from "react-hook-form";

import { FieldCustomError } from "@/domains/hotel-booking/components/field-error";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/domains/hotel-booking/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUp, signupSchema } from "@/domains/hotel-booking/validationSchema/signup-schema";
import { handleSignUp } from "@/app/(nextjs)/hotel-booking/actions/signupAction";
import { clientFormErrorState, clientSuccessErrorState } from "@/domains/hotel-booking/utils/client-form-error";

const SignupForm = () => {
  const form = useForm<SignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUp) {
    try {
      const result = await handleSignUp(values);
      if (!result?.status) {
        clientSuccessErrorState(result.message, form.setError);
      }
    } catch (error) {
      clientFormErrorState(error, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldCustomError errorMessage={form.formState?.errors?.root?.serverError?.message} />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="user name"
                  className="w-full  h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full  h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full  h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full  h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default SignupForm;
