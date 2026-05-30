import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string({ message: "username is required" })
      .min(2, "User name is required")
      .max(32, "User name must be less than 32 characters"),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Please Enter a valid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(1, "Password is required")
      .min(4, "Password must be more than 4 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(1, "Confirm password is required")
      .min(4, "Confirm password must be more than 4 characters")
      .max(32, "Confirm password must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUp = z.infer<typeof signupSchema>;
