// ============================================================================
// FILE: src/lib/validations/auth.validation.ts
// LOCATION: src/lib/validations/auth.validation.ts
// PURPOSE: Zod schemas for authentication
// ============================================================================

import { z } from "zod";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";

/**
 * Sign in form validation schema
 * Shared between client and server for consistent validation
 *
 */
export const signInSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .max(AUTH_CONFIG.EMAIL.MAX_LENGTH, "Email is too long")
    .toLowerCase()
    .trim(),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(AUTH_CONFIG.PASSWORD.MIN_LENGTH, `Password must be at least ${AUTH_CONFIG.PASSWORD.MIN_LENGTH} characters`)
    .max(AUTH_CONFIG.PASSWORD.MAX_LENGTH, `Password must not exceed ${AUTH_CONFIG.PASSWORD.MAX_LENGTH} characters`),
});

export type SignInInput = z.infer<typeof signInSchema>;

/**
 * Additional validation schemas can be added here:
 * - signUpSchema
 * - forgotPasswordSchema
 * - resetPasswordSchema
 * - changePasswordSchema
 */

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Project schemas
export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  domain: z.url("Must be a valid URL"),
  description: z.string().optional(),
});

// Account schemas
export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
