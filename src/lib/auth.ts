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
  basePath: "hotel-booking/api/auth",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  // session: {
  //   expiresIn: 60 * 60 * 24 * 30, // 30-day rolling session

  //   updateAge: 60 * 60 * 24, // refresh the cookie if older than 1 day
  //   cookieCache: {
  //     // Allows the Proxy to read session data from the cookie without a DB
  //     // round-trip — this is what makes the middleware "fast/synchronous-style"
  //     // as the spec requires.
  //     enabled: true,
  //     maxAge: 60 * 5, // 5-minute client-side cache
  //   },
  // },
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
  plugins: [nextCookies()],
  advanced: {
    cookiePrefix: "hotel-booking",
    database: {
      generateId: false,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
