"use client";

import { loginSchema } from "@/app/_validationSchema/login-schema";
import { performLogin } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import ErrorAlert from "@/components/auth/ErrorAlert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await performLogin(data);
      if (response && response.errors) {
        Object.entries(response.errors).forEach(([key, value]) =>
          form.setError(key, { type: "manual", message: value })
        );
      } else if (response == null) {
        form.setError("root.random", {
          type: "random",
          message: "Email or password is not correct!",
        });
      } else {
        setAuth(response);
        router.push("/");
      }
    } catch (err) {
      form.setError("root.random", {
        type: "random",
        message: err.message,
      });
    }
  }

  return (
    <Form {...form}>
      <ErrorAlert message={form.formState.errors?.root?.random?.message} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
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
                  placeholder="Create Password"
                  className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
