export const AUTH_CONFIG = {
  RATE_LIMIT: {
    MAX_ATTEMPTS: 5,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  },
  // TOKENS: {
  //   ACCESS_TOKEN_TTL: "15m",
  //   REFRESH_TOKEN_TTL: "7d",
  //   ACCESS_SECRET: env.ACCESS_TOKEN_SECRET,
  //   REFRESH_SECRET: env.REFRESH_TOKEN_SECRET,
  // },
  // SESSION: {
  //   COOKIE_NAME: "session",
  //   MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  //   COOKIE_OPTIONS: {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "lax" as const,
  //     path: "/",
  //   },
  // },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  ROUTES: {
    SIGN_IN: "/hotel-booking/sign-in",
    VERIFY_EMAIL: "/hotel-booking/verify-email",
    DASHBOARD: "/hotel-booking/dashboard",
    SETTINGS: "/settings",
  },
  API: {
    SIGN_IN: "/hotel-booking/signin",
    SIGN_UP: "/hotel-booking/signup",
    VERIFY_EMAIL: "/hotel-booking/verify-email",
    REFRESH: "/hotel-booking/refresh",
    LOGOUT: "/hotel-booking/logout",
    DASHBOARD: "/hotel-booking/dashboard",
  },
} as const;
