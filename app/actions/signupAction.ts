"use server";
import { auth, signIn } from "@/auth";
import connectDB from "@/config/database";
import UserModel, { createNewUser } from "@/models/user-model";
import VerificationTokenModel from "@/models/verification-token-model";
import mail from "@/utils/mail";
import { signupSchema } from "@/validationSchema/signup-schema";
import crypto from "crypto";

const handleVerificationToken = async (user: {
  id: string;
  name: string;
  email: string;
}) => {
  const userId = user.id;
  const token = crypto.randomBytes(36).toString("hex");
  //   randomToken = 1234hgh = db (hash)

  await connectDB();
  await VerificationTokenModel.findOneAndDelete({ userId });
  await VerificationTokenModel.create({ token, userId });
  const link = `${process.env.VERIFICATION_LINK}?token=${token}&userId=${userId}`;
  await mail.sendVerificationMail({ link, name: user.name, to: user.email });
};

interface AuthResponse {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  status?: boolean;
  message?: string;
}

export const handleSignUp = async (
  state: AuthResponse,
  {
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
): Promise<AuthResponse> => {
  const result = signupSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });
  if (!result.success) {
    // Show error to the users
    return { status: false, errors: result.error.formErrors.fieldErrors };
  }

  await connectDB();
  const existingUser = await UserModel.findOne({ email });
  if (existingUser)
    return {
      status: false,
      error: "User already exists! Please Login to continue.",
    };

  const user = await createNewUser({
    name: username,
    email,
    password,
    provider: "credentials",
    verified: false,
  });

  // send verification email
  await handleVerificationToken({ email, id: user._id, name: username });
  await signIn("credentials", { email, password, redirectTo: "/" });

  return { status: true };
};

interface VerificationResponse {
  success?: boolean;
}
export const generateVerificationLink = async (
  state: VerificationResponse
): Promise<VerificationResponse> => {
  const session = await auth();
  if (!session) return { status: false };

  const user = await UserModel.findById(session?.user?.id);
  if (user?.verified) {
    // user is already verified
    return { status: false };
  }

  const { email, id, name } = session?.user;
  await handleVerificationToken({ email, id, name });
  return { status: true };
};

// export async function handleSignUp({
//   username,
//   email,
//   password,
//   confirmPassword,
// }: {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }) {
//   try {
//     const parsedCredentials = signupSchema.safeParse({
//       username,
//       email,
//       password,
//       confirmPassword,
//     });
//     if (!parsedCredentials.success) {
//       return {
//         status: false,
//         message: parsedCredentials.error.formErrors.fieldErrors,
//       };
//     }
//     await connectDB();
//     // check if the email is already taken
//     const existingUser = await UserModel.findOne({
//       email,
//     });

//     if (existingUser) {
//       return {
//         status: false,
//         message: "Email already exists. Please Login to continue.",
//       };
//     }

//     // hash the password
//     const hashedPassword = await bcryptjs.hash(password, 10);

//     await UserModel.create({ name: username, email, password: hashedPassword });
//     // redirect("/");
//     return { status: true, message: "Account created successfully." };
//   } catch (error) {
//     console.error("Error creating account:", error);
//     return {
//       status: false,
//       message: "An unexpected error occurred. Please try again.",
//     };
//   }
// }
