export const AUTH_CONFIG = {
  RATE_LIMIT: {
    MAX_ATTEMPTS: 5,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  },
  /*   TOKENS: {
    ACCESS_TOKEN_TTL: "15m",
    REFRESH_TOKEN_TTL: "7d",
    ACCESS_SECRET: env.ACCESS_TOKEN_SECRET,
    REFRESH_SECRET: env.REFRESH_TOKEN_SECRET,
  }, */
  SESSION: {
    COOKIE_NAME: "hotel-booking",
    MAX_AGE: 60 * 5, // 5-minute client-side cache
    EXPIRES_IN: 60 * 60 * 24 * 30, //30 days
    REFRESH_AGE: 60 * 60 * 24, // refresh the cookie if older than 1 day
    /*    COOKIE_OPTIONS: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      }, */
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  ROUTES: {
    SIGN_IN: "/hotel-booking/signin",
    SIGN_UP: "/hotel-booking/signup",
    VERIFY: "/hotel-booking/verify",
    FORGOT_PASSWORD: "/hotel-booking/forgot-password",
    UPDATE_PASSWORD: "/hotel-booking/update-password",
    DASHBOARD: "/hotel-booking/dashboard",
    BOOK: "/hotel-booking/book",
    BOOKINGS: "/hotel-booking/bookings",
    CHECKOUT: "/hotel-booking/checkout",
    CREATE_HOTEL: "/hotel-booking/create-hotel",
    MANAGE_HOTELS: "/hotel-booking/manage-hotels",
    PROPERTY: "/hotel-booking/property",
  },
  // API: { ... },
} as const;
