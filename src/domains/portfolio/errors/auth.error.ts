import { AUTH_ERROR_CODES, AUTH_ERROR_MESSAGES } from "@/domains/portfolio/auth.constants";
import type { AuthErrorCode } from "@/domains/portfolio/types/auth.types";

export class AuthError extends Error {
  public readonly code: AuthErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(code: AuthErrorCode, message?: string, statusCode: number = 401) {
    super(message || AUTH_ERROR_MESSAGES[code]);
    this.name = "AuthError";
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = true;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  static invalidCredentials(): AuthError {
    return new AuthError(AUTH_ERROR_CODES.INVALID_CREDENTIALS, undefined, 401);
  }

  static accountLocked(): AuthError {
    return new AuthError(AUTH_ERROR_CODES.ACCOUNT_LOCKED, undefined, 423);
  }

  static accountDisabled(): AuthError {
    return new AuthError(AUTH_ERROR_CODES.ACCOUNT_DISABLED, undefined, 403);
  }

  static emailNotVerified(): AuthError {
    return new AuthError(AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED, undefined, 403);
  }

  static rateLimitExceeded(): AuthError {
    return new AuthError(AUTH_ERROR_CODES.RATE_LIMIT, undefined, 429);
  }

  static serverError(message?: string): AuthError {
    return new AuthError(AUTH_ERROR_CODES.SERVER_ERROR, message || AUTH_ERROR_MESSAGES.SERVER_ERROR, 500);
  }
}
