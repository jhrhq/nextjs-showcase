import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";

if (!process.env.HOTEL_BOOKING_MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "HOTEL_BOOKING_MONGODB_URI"');
}

const client = new MongoClient(process.env.HOTEL_BOOKING_MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  basePath: "hotel-booking/api/auth",

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },
  /* session: {
    expiresIn: 60 * 60 * 24 * 30, // 30-day rolling session

    updateAge: 60 * 60 * 24, // refresh the cookie if older than 1 day
    cookieCache: {
      // Allows the Proxy to read session data from the cookie without a DB
      // round-trip — this is what makes the middleware "fast/synchronous-style"
      // as the spec requires.
      enabled: true,
      maxAge: 60 * 5, // 5-minute client-side cache
    },
  }, */

  /* socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },*/
  plugins: [nextCookies()],
  advanced: {
    cookiePrefix: AUTH_CONFIG.SESSION.COOKIE_NAME,
    database: {
      generateId: false,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
