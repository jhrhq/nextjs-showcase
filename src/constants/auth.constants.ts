export type AuthError = {
  status?: number;
  code?: string;
  message?: string;
};
export const AUTH_LIMITS = {
  NAME_MIN: 3,
  NAME_MAX: 32,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 64,
} as const;

export const AUTH_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",

  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_TOO_SHORT: `Password must be at least ${AUTH_LIMITS.PASSWORD_MIN} characters`,
  PASSWORD_TOO_LONG: `Password must be less than ${AUTH_LIMITS.PASSWORD_MAX} characters`,
  CONFIRM_PASSWORD_REQUIRED: "Please confirm your password",

  PASSWORDS_MUST_MATCH: "Passwords do not match",
  PASSWORDS_MUST_BE_DIFFERENT: "New password must be different from current password",

  NAME_REQUIRED: "Name is required",
  NAME_TOO_SHORT: `Name must be at least ${AUTH_LIMITS.NAME_MIN} characters`,
  NAME_TOO_LONG: `Name must be less than ${AUTH_LIMITS.NAME_MAX} characters`,

  POLICY_REQUIRED: "You must accept the terms and privacy policy",
} as const;

export const AUTH_CODE_MAP = {
  INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password.",
  USER_NOT_FOUND: "No account found with that email.",
  INVALID_PASSWORD: "Incorrect password.",
  USER_ALREADY_EXISTS: "An account with this email already exists.",
  TOO_MANY_REQUESTS: "Too many attempts. Please wait and try again.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
  ACCOUNT_DISABLED: "This account has been disabled. Contact support.",
  ACCOUNT_LOCKED: "Account has been locked due to multiple failed attempts",
  SESSION_EXPIRED: "Your session expired. Please sign in again.",
  INVALID_TOKEN: "Invalid or expired token.",
  NETWORK_ERROR: "Network error. Check your connection and try again.",
  SERVER_ERROR: "An unexpected error occurred. Please try again",
  INVALID_CREDENTIALS: "Invalid email or password",
  RATE_LIMIT: "Too many login attempts. Please try again later",
  VALIDATION_ERROR: "Please check your input and try again",

  // MongoDB / Node network error
  EAI_AGAIN: "Database server could not be reached (DNS timeout). Please check your internet connection.",
} as const;

export const STATUS_MAP = {
  400: "Invalid request. Check your details and try again.",
  401: "Incorrect email or password.",
  403: "Access denied.",
  404: "No account found with that email.",
  409: "An account with this email already exists.",
  422: "The data you entered is invalid.",
  429: "Too many attempts. Please wait and try again.",
  500: "Something went wrong on our end. Please try again shortly.",
  503: "Service unavailable. Please try again later.",
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
