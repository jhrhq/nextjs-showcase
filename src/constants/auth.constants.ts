export type AuthError = {
  status?: number;
  code?: string;
  message?: string;
};

export const CODE_MAP: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password.",
  USER_NOT_FOUND: "No account found with that email.",
  INVALID_PASSWORD: "Incorrect password.",
  USER_ALREADY_EXISTS: "An account with this email already exists.",
  TOO_MANY_REQUESTS: "Too many attempts. Please wait and try again.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
  ACCOUNT_DISABLED: "This account has been disabled. Contact support.",
  SESSION_EXPIRED: "Your session expired. Please sign in again.",
  INVALID_TOKEN: "Invalid or expired token.",
  NETWORK_ERROR: "Network error — check your connection and try again.",
  // mongodb error
  EAI_AGAIN: "Database server could not be reached (DNS timeout). Please check your internet connection.",
};

export const STATUS_MAP: Record<number, string> = {
  400: "Invalid request. Check your details and try again.",
  401: "Incorrect email or password.",
  403: "Access denied.",
  404: "No account found with that email.",
  409: "An account with this email already exists.",
  422: "The data you entered is invalid.",
  429: "Too many attempts. Please wait and try again.",
  500: "Something went wrong on our end. Please try again shortly.",
  503: "Service unavailable. Please try again later.",
};
