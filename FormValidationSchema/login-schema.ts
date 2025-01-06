import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Please Enter a valid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(4, "Please enter your password")
    .max(100),
});

export type Login = z.infer<typeof loginSchema>;
