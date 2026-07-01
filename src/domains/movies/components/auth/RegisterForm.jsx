"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { performRegister } from "@/domains/movies/actions";
import ErrorAlert from "@/domains/movies/components/auth/ErrorAlert";
import { Button } from "@/domains/movies/components/ui/button";
import { Checkbox } from "@/domains/movies/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/domains/movies/components/ui/form";
import { Input } from "@/domains/movies/components/ui/input";
import { registerFormSchema } from "@/domains/movies/validationSchema/registerSchema";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
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
    try {
      const response = await performRegister(data);
      if (response.errors) {
        Object.entries(response.errors).forEach(([key, value]) =>
          form.setError(key, { type: "manual", message: value })
        );
      } else {
        toast.success(response.message);
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
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mr-2" />
                </FormControl>
                I agree to the Terms of Service and Privacy Policy
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
