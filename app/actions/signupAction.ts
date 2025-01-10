"use server";

import connectDB from "@/config/database";
import { signupSchema } from "@/formValidationSchema/signu-schema";
import User from "@/models/user-model";
import bcryptjs from "bcryptjs";

export async function handleSignUp({
  username,
  email,
  password,
  confirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const parsedCredentials = signupSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    });
    if (!parsedCredentials.success) {
      return {
        success: false,
        message: parsedCredentials.error.formErrors.fieldErrors,
      };
    }
    await connectDB();
    // check if the email is already taken
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Please Login to continue.",
      };
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({ name: username, email, password: hashedPassword });
    // redirect("/");
    return { success: true, message: "Account created successfully." };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
