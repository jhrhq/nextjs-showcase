import { authConfig } from "@/auth.config";
import connectDB from "@/config/database";
import client from "@/db/mongoClientPromise";
import { loginSchema } from "@/FormValidationSchema/login-schema";
import User from "@/models/user-model";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

      authorize: async (credentials) => {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        let user = null;

        await connectDB();
        // logic to verify if the user exists
        user = await User.findOne({
          email: credentials.email,
        });

        // if (!user) {
        //   throw new CustomError("Invalid credentials.");
        // }

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        if (!user.password) {
          console.log(
            "User has no password. They probably signed up with an oauth provider. or password mismatched "
          );
          return null;
        }

        // return JSON object with the user data
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  //   callbacks: {
  //     authorized({ request: { nextUrl }, auth }) {
  //         const isLoggedIn = !!auth?.user;
  //         const { pathname } = nextUrl;

  //         // Allow access to public routes for all users
  //         if (publicRoutes.includes(pathname)) {
  //             return true;
  //         }

  //         // Redirect logged-in users away from auth routes
  //         if (authRoutes.includes(pathname)) {
  //             if (isLoggedIn) {
  //                 return Response.redirect(new URL('/', nextUrl));
  //             }
  //             return true; // Allow access to auth pages if not logged in
  //         }

  //         // Allow access if the user is authenticated
  //         return isLoggedIn;
  //     },
  //     jwt({ token, user, trigger, session }) {
  //         if (user) {
  //             token.id = user.id as string;
  //             token.role = user.role as string;
  //         }
  //         if (trigger === "update" && session) {
  //             token = { ...token, ...session };
  //         }
  //         return token;
  //     },
  //     session({ session, token }) {
  //         session.user.id = token.id;
  //         session.user.role = token.role;
  //         return session;
  //     }
  // },
  // pages: {
  //     signIn: "/auth/signin"
  // }
});
