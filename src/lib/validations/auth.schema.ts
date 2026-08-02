import { z } from "zod";
import { AUTH_LIMITS, AUTH_MESSAGES } from "@/constants/auth.constants";

export const emailField = z.email(AUTH_MESSAGES.EMAIL_INVALID);

export const passwordField = z
  .string({ message: AUTH_MESSAGES.PASSWORD_REQUIRED })
  .min(1, AUTH_MESSAGES.PASSWORD_REQUIRED)
  .min(AUTH_LIMITS.PASSWORD_MIN, AUTH_MESSAGES.PASSWORD_TOO_SHORT)
  .max(AUTH_LIMITS.PASSWORD_MAX, AUTH_MESSAGES.PASSWORD_TOO_LONG);

export const nameField = z
  .string({ message: AUTH_MESSAGES.NAME_REQUIRED })
  .trim()
  .min(3, AUTH_MESSAGES.NAME_REQUIRED)
  .min(AUTH_LIMITS.NAME_MIN, AUTH_MESSAGES.NAME_TOO_SHORT)
  .max(AUTH_LIMITS.NAME_MAX, AUTH_MESSAGES.NAME_TOO_LONG);

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const signUpSchema = z
  .object({
    username: nameField,
    email: emailField,
    password: passwordField,
    confirmPassword: z
      .string({ message: AUTH_MESSAGES.CONFIRM_PASSWORD_REQUIRED })
      .min(1, AUTH_MESSAGES.CONFIRM_PASSWORD_REQUIRED),
    // policyAgreement: z.boolean().refine((val) => val === true, {
    //   message: AUTH_MESSAGES.POLICY_REQUIRED,
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.PASSWORDS_MUST_MATCH,
    path: ["confirmPassword"],
  });

export const forgetPasswordSchema = z.object({
  email: emailField,
});

export const updatePasswordSchema = z
  .object({
    currentPassword: passwordField,
    newPassword: passwordField,
    confirmPassword: z
      .string({ message: AUTH_MESSAGES.CONFIRM_PASSWORD_REQUIRED })
      .min(1, AUTH_MESSAGES.CONFIRM_PASSWORD_REQUIRED),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: AUTH_MESSAGES.PASSWORDS_MUST_MATCH,
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: AUTH_MESSAGES.PASSWORDS_MUST_BE_DIFFERENT,
    path: ["newPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
