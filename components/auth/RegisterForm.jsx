"use client";
import { performRegister } from "@/app/actions";
import ErrorAlert from "@/components/auth/ErrorAlert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(50, {
        message: "First name must not be longer than 255 characters.",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(50, {
        message: "Last name must not be longer than 255 characters.",
      }),

    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Please choose a longer password")
      .max(64, "Consider using a short password"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    policyAgreement: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password did not match",
  })
  .superRefine(({ policyAgreement }, ctx) => {
    if (!policyAgreement) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["policyAgreement"],
        message: "You must  agree to the Terms of Service and Privacy Policy.",
      });
    }
  });

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      policyAgreement: false,
    },
  });

  async function onSubmit(data) {
    const { confirmPassword, ...rest } = data;

    try {
      const response = await performRegister(rest);
      if (response) {
        console.log(response);
        router.push("/login");
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="w-full  p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Last Name"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
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
          name="policyAgreement"
          render={({ field }) => (
            <FormItem className="text-left text-moviedb-gray text-sm">
              <FormLabel className="flex items-center font-normal text-slate-500">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mr-2"
                  />
                </FormControl>
                I agree to the Terms of Service and Privacy Policy
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </Form>
  );
};

export default RegisterForm;
