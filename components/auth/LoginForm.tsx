"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginFormAction } from "@/app/actions";
import { FieldCustomError } from "@/components/field-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  clientFormErrorState,
  clientSuccessErrorState,
} from "@/utils/client-form-error";
import { Login, loginSchema } from "@/validationSchema/login-schema";

const LoginForm = () => {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const [formState, action] = useFormState(loginFormAction, EMPTY_FORM_STATE);
  // const formRef = useFormReset(formState);

  async function onSubmit(values: Login) {
    try {
      const result = await loginFormAction(values);
      if (!result?.status) {
        clientSuccessErrorState(result?.message, form.setError);
      }
    } catch (error) {
      clientFormErrorState(error, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldCustomError
          errorMessage={form.formState?.errors?.root?.serverError?.message}
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

        <SubmitButton>Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
