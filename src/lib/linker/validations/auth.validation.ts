// ============================================================================
// FILE: src/lib/validations/auth.validation.ts
// LOCATION: src/lib/validations/auth.validation.ts
// PURPOSE: Zod schemas for authentication
// ============================================================================

import { z } from "zod";
import { AUTH_CONFIG } from "@/lib/linker/constants/auth.constants";

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
    .min(
      AUTH_CONFIG.PASSWORD.MIN_LENGTH,
      `Password must be at least ${AUTH_CONFIG.PASSWORD.MIN_LENGTH} characters`,
    )
    .max(
      AUTH_CONFIG.PASSWORD.MAX_LENGTH,
      `Password must not exceed ${AUTH_CONFIG.PASSWORD.MAX_LENGTH} characters`,
    ),
});

export type SignInInput = z.infer<typeof signInSchema>;

/**
 * Additional validation schemas can be added here:
 * - signUpSchema
 * - forgotPasswordSchema
 * - resetPasswordSchema
 * - changePasswordSchema
 */
