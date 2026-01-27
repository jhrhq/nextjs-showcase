// ============================================================================
// FILE: src/lib/constants/auth.constants.ts
// LOCATION: src/lib/constants/auth.constants.ts
// PURPOSE: Centralized authentication configuration
// ============================================================================

export const AUTH_CONFIG = {
  RATE_LIMIT: {
    MAX_ATTEMPTS: 5,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  },
  TOKENS: {
    ACCESS_TOKEN_TTL: "15m",
    REFRESH_TOKEN_TTL: "7d",
    // ACCESS_SECRET: env.ACCESS_TOKEN_SECRET,
    // REFRESH_SECRET: env.REFRESH_TOKEN_SECRET,
  },
  SESSION: {
    COOKIE_NAME: "session",
    MAX_AGE: 60 * 60 * 24 * 7, // 7 days
    COOKIE_OPTIONS: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    },
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  ROUTES: {
    SIGN_IN: "/linker/sign-in",
    DASHBOARD: "/linker/dashboard",
    VERIFY_EMAIL: "/linker/verify-email",
  },
  API: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    VERIFY_EMAIL: "/auth/verify-email",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    PROJECTS: "/linker/projects",
    INBOUNDS: "/inbounds",
    SILO: "/inbounds",
    LINKS_REPORT: "/links-report",
    SITE_REPORT: "/site-report",
  },
} as const;

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  ACCOUNT_DISABLED: "ACCOUNT_DISABLED",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  RATE_LIMIT: "RATE_LIMIT",
  SERVER_ERROR: "SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export const AUTH_ERROR_MESSAGES: Record<keyof typeof AUTH_ERROR_CODES, string> = {
  INVALID_CREDENTIALS: "Invalid email or password",
  ACCOUNT_LOCKED: "Account has been locked due to multiple failed attempts",
  ACCOUNT_DISABLED: "This account has been disabled",
  EMAIL_NOT_VERIFIED: "Please verify your email address before signing in",
  RATE_LIMIT: "Too many login attempts. Please try again later",
  SERVER_ERROR: "An unexpected error occurred. Please try again",
  VALIDATION_ERROR: "Please check your input and try again",
};
