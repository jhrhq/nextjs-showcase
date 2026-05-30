import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { isValidObjectId } from "mongoose";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import client from "./db/mongoClientPromise";
import { loginSchema } from "./validationSchema/login-schema";
import connectDB from "./config/database";
import UserModel, { createNewUser } from "./models/user-model";

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
}

declare module "next-auth" {
  interface Session {
    user: SessionUserProfile;
  }
}

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  code = "custom_error";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) throw new CustomError("Please provide a valid email & password!");

        const { email, password } = result.data;
        await connectDB();
        const user = await UserModel.findOne({ email });

        if (!user?.compare(password)) throw new CustomError("Email/Password mismatched!");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          verified: user.verified,
          avatar: user?.avatar?.url || null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // storing new user if the user is coming from google
      if (account?.provider === "google") {
        if (!profile?.email || !profile.name) return false;

        await connectDB();
        const oldUser = await UserModel.findOne({ email: profile.email });
        if (!oldUser) {
          await createNewUser({
            name: profile.name,
            email: profile.email,
            provider: "google",
            verified: profile.email_verified || false,
            avatar: { url: profile.picture },
          });
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (!isValidObjectId(user.id)) {
          const dbUser = await UserModel.findOne({ email: user.email });
          if (dbUser) {
            token = {
              ...token,
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name,
              verified: dbUser.verified,
              avatar: dbUser.avatar?.url || null,
            };
          }
        } else {
          token = { ...token, ...user };
        }
      }

      if (trigger === "update") {
        token = { ...token, ...session };
      }

      return token;
    },
    session({ token, session }) {
      let user = token as typeof token & SessionUserProfile;

      if (token.user) {
        user = token.user as any;
      }

      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          email: user.email,
          name: user.name,
          verified: user.verified,
          avatar: user.avatar,
        };
      }

      return session;
    },
  },
  /*   callbacks: {
      authorized({ request: { nextUrl }, auth }) {
          const isLoggedIn = !!auth?.user;
          const { pathname } = nextUrl;

          // Allow access to public routes for all users
          if (publicRoutes.includes(pathname)) {
              return true;
          }

          // Redirect logged-in users away from auth routes
          if (authRoutes.includes(pathname)) {
              if (isLoggedIn) {
                  return Response.redirect(new URL('/', nextUrl));
              }
              return true; // Allow access to auth pages if not logged in
          }

          // Allow access if the user is authenticated
          return isLoggedIn;
      },
      jwt({ token, user, trigger, session }) {
          if (user) {
              token.id = user.id as string;
              token.role = user.role as string;
          }
          if (trigger === "update" && session) {
              token = { ...token, ...session };
          }
          return token;
      },
      session({ session, token }) {
          session.user.id = token.id;
          session.user.role = token.role;
          return session;
      }
  }, */
  pages: {
    signIn: "/auth/signin",
  },
});
