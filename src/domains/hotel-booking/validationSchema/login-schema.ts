import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Please Enter a valid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password is required")
    .min(4, "Password must be more than 4 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type SignIn = z.infer<typeof signInSchema>;
