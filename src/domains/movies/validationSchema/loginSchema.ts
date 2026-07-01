import { z } from "zod";

const loginSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Please enter a valid email address."),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Please choose a longer password")
    .max(64, "Consider using a short password"),
});

export { loginSchema };
