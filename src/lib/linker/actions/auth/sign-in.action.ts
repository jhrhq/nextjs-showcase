// ============================================================================
// FILE: src/lib/actions/auth/sign-in.action.ts
// LOCATION: src/lib/actions/auth/sign-in.action.ts
// PURPOSE: Server action for sign in
// ============================================================================

"use server";

import z from "zod";
import { AUTH_CONFIG } from "@/lib/linker/constants/auth.constants";
import { AuthError } from "@/lib/linker/errors/auth.error";
import { authService } from "@/lib/linker/services/auth/auth.service";
import { rateLimitService } from "@/lib/linker/services/auth/rate-limit.service";
import { sessionService } from "@/lib/linker/services/auth/session.service";
import type { ActionResult } from "@/lib/linker/types/action.types";
import { signInSchema } from "@/lib/linker/validations/auth.validation";

export interface SignInResult {
  redirectTo: string;
}

/**
 * Sign In Server Action
 *
 * Handles complete authentication flow:
 * 1. Input validation (Zod)
 * 2. Rate limiting
 * 3. User authentication
 * 4. Session creation
 * 5. Cookie management
 *
 * @param _prevState - Previous state from useActionState (unused)
 * @param formData - Form data containing email and password
 * @returns ActionResult with redirect URL or error
 */
export async function signInAction(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResult<SignInResult>> {
  try {
    // 1. Parse and validate input
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationResult = signInSchema.safeParse(rawData);

    if (!validationResult.success) {
      const validationErrors = z.flattenError(validationResult.error);
      return {
        success: false,
        error: "Please check your input and try again",
        code: "VALIDATION_ERROR",
        fieldErrors: validationErrors.fieldErrors as Record<string, string[]>,
      };
    }

    const { email, password } = validationResult.data;

    // 2. Check rate limiting
    rateLimitService.check(email);

    // 3. Authenticate user
    const user = await authService.authenticate(email, password);

    // 4. Create session
    await sessionService.create(user.id);

    // 5. Clear rate limit on successful login
    rateLimitService.reset(email);

    // 6. Return success with redirect
    return {
      success: true,
      data: {
        redirectTo: AUTH_CONFIG.ROUTES.DASHBOARD,
      },
      message: "Sign in successful",
    };
  } catch (error) {
    // Handle known authentication errors
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    }

    // Log unexpected errors for monitoring
    console.error("[SignIn Action Error]", {
      error,
      timestamp: new Date().toISOString(),
    });

    // Return generic error to user
    return {
      success: false,
      error: "An unexpected error occurred. Please try again",
      code: "SERVER_ERROR",
    };
  }
}
