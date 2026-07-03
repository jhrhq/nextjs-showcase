import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { bearer, jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js"; // Essential Next.js cookie synchronizer
// import { sendEmail } from "@better-auth/infra"; // Replace with Resend/Nodemailer if not using infra

// if (!process.env.HOTEL_BOOKING_MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "HOTEL_BOOKING_MONGODB_URI"');
// }
// const client = new MongoClient(process.env.HOTEL_BOOKING_MONGODB_URI);
// const db = client.db();

// export const auth = betterAuth({
//   database: mongodbAdapter(db, { client }),
//   emailAndPassword: {
//     enabled: true,
//     // requireEmailVerification: true,
//   },
//   // socialProviders: {
//   //   google: {
//   //     clientId: process.env.GOOGLE_CLIENT_ID!,
//   //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   //   },
//   // },
//   plugins: [
//     bearer(),
//     jwt({
//       jwt: { expirationTime: "15m" }
//     }),
//     nextCookies() // MUST be the absolute last plugin in your array for Next.js
//   ],
// });
