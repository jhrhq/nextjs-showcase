import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js"; // Essential Next.js cookie synchronizer
import { MongoClient } from "mongodb";

// import { sendEmail } from "@better-auth/infra"; // Replace with Resend/Nodemailer if not using infra

if (!process.env.HOTEL_BOOKING_MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "HOTEL_BOOKING_MONGODB_URI"');
}
const client = new MongoClient(process.env.HOTEL_BOOKING_MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth/hotel-booking",
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    minPasswordLength: 8,
  },
  session: {
    // 30-day rolling session
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24, // refresh the cookie if older than 1 day
    cookieCache: {
      // Allows the Proxy to read session data from the cookie without a DB
      // round-trip — this is what makes the middleware "fast/synchronous-style"
      // as the spec requires.
      enabled: true,
      maxAge: 60 * 5, // 5-minute client-side cache
    },
  },
  /*  emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: false, // Ensures user logs in manually after confirming
      sendVerificationEmail: async ({ user, url }) => {
        // Replace this block with your production transactional mailer (e.g., Resend, Nodemailer)
        console.log(`Sending verification link to ${user.email}: ${url}`);
      },
      }, */
  /* socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },*/
  plugins: [
    /* bearer(),
    jwt({
          jwt: {
            expirationTime: "15m", // Access Token lifespan
            definePayload: ({ user }) => ({
              id: user.id,
              email: user.email,
            }),
          },
          jwks: {
            rotationInterval: 60 * 60 * 24 * 30, // Auto-rotate signing keys every 30 days
            gracePeriod: 60 * 60 * 24 * 2,
          },
          }),*/
    nextCookies(), // MUST be the absolute last plugin in your array for Next.js
  ],
  advanced: {
    cookiePrefix: "hotel-booking",
    database: {
      generateId: false, // "serial" for auto-incrementing numeric IDs
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
