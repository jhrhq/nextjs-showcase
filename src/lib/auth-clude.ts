/**
 * lib/auth/auth.config.ts
 *
 * Better Auth v0.16 — server-side initialisation for the hotel-booking app.
 *
 * Isolation contract
 * ──────────────────
 *  • basePath    : "/api/auth/hotel-bookin"   (deliberate slug, no trailing g)
 *  • cookiePrefix: "hotel-booking"            (prevents bleed into /blog namespace)
 *  • DB client   : pulled from the already-open Mongoose pool via getMongoClient()
 *                  — Better Auth opens NO second connection.
 *
 * Call site requirement
 * ─────────────────────
 *  Always await connectDB() before importing / referencing `hotelAuth` so that
 *  getMongoClient() finds a live connection.
 */
/*
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod/v4";
import { getMongoClient } from "@/lib/db/mongoose";

// ---------------------------------------------------------------------------
// Environment validation (Zod v4 — mapped to .env keys)
// ---------------------------------------------------------------------------

const EnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be ≥ 32 chars"),
  BETTER_AUTH_URL: z.url(),
  NEXT_PUBLIC_BASE_URL: z.url(),
  HOTEL_BOOKING_GOOGLE_CLIENT_ID: z.string().min(1, "Google Client ID is required"),
  HOTEL_BOOKING_GOOGLE_CLIENT_SECRET: z.string().min(1, "Google Client Secret is required"),
  HOTEL_BOOKING_VERIFICATION_MAIL: z.email("Invalid verification mail address"),
});
type Env = z.infer<typeof EnvSchema>;

function parseEnv(): Env {
  const result = EnvSchema.safeParse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    HOTEL_BOOKING_GOOGLE_CLIENT_ID: process.env.HOTEL_BOOKING_GOOGLE_CLIENT_ID,
    HOTEL_BOOKING_GOOGLE_CLIENT_SECRET: process.env.HOTEL_BOOKING_GOOGLE_CLIENT_SECRET,
    HOTEL_BOOKING_VERIFICATION_MAIL: process.env.HOTEL_BOOKING_VERIFICATION_MAIL,
  });

  if (!result.success) {
    const messages = result.error.issues.map((i) => `  [${i.path.join(".")}] ${i.message}`).join("\n");
    throw new Error(`[auth.config.ts] Environment validation failed:\n${messages}`);
  }

  return result.data;
}
 */

// const env = parseEnv();

// ---------------------------------------------------------------------------
// Better Auth Server Instance
// ---------------------------------------------------------------------------
/*
export const hotelAuth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/auth/hotel-bookin",

  database: mongodbAdapter(getMongoClient(), {
    dbName: process.env.HOTEL_BOOKING_MONGODB_DATABASE_NAME,
  }),

  socialProviders: {
    google: {
      clientId: env.HOTEL_BOOKING_GOOGLE_CLIENT_ID,
      clientSecret: env.HOTEL_BOOKING_GOOGLE_CLIENT_SECRET,
    },
  },

  advanced: {
    cookiePrefix: "hotel-booking",
  },
});
*/
