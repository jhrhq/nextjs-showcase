import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    userId: z
      .string({ message: "Password is required" })
      .min(1, "Password is required")
      .min(4, "Password must be more than 4 characters")
      .optional(),
    token: z
      .string({ message: "Password is required" })
      .min(1, "Password is required")
      .min(4, "Password must be more than 4 characters")
      .optional(),

    oldPassword: z
      .string({ message: "Password is required" })
      .min(1, "Password is required")
      .min(4, "Password must be more than 4 characters")
      .max(32, "Password must be less than 32 characters"),
    newPassword: z
      .string({ message: "Password is required" })
      .min(1, "Password is required")
      .min(4, "Password must be more than 4 characters")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Old and new passwords can not be same",
    path: ["newPassword"],
  });

export const forgetPasswordSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Please Enter a valid email" }),
});

export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;
