"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldCustomError } from "@/domains/hotel-booking/components/field-error";
import SubmitButton from "@/domains/hotel-booking/components/SubmitButton";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/domains/hotel-booking/components/ui/form";
import { Input } from "@/domains/hotel-booking/components/ui/input";

import { type SignIn, signInSchema } from "@/domains/hotel-booking/validationSchema/login-schema";
import { signInAction } from "../../actions/auth-action";

// used when action = {formAction}
// const INITIAL_STATE: ActionState = {};

const LoginForm = () => {
  // used when action = {formAction}
  // const [state, formAction, isPending] = useActionState(signInAction, INITIAL_STATE);

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: SignIn) {
    try {
      const result = await signInAction(values);
      if (!result?.status) {
        form.setError("root", result?.message);
      }
    } catch (error) {
      form.setError("root.server", result?.message);
    }
  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldCustomError errorMessage={form.formState?.errors?.root?.serverError?.message} />

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

        <SubmitButton>Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
