"use server";
import crypto from "crypto";
// import mail from "@/domains/hotel-booking/utils/mail";
import UserModel, { createNewUser } from "@/domains/hotel-booking/models/user-model";
import VerificationTokenModel from "@/domains/hotel-booking/models/verification-token-model";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const handleVerificationToken = async (user: { id: string; name: string; email: string }) => {
  const userId = user.id;
  const token = crypto.randomBytes(36).toString("hex");
  //   randomToken = 1234hgh = db (hash)

  await VerificationTokenModel.findOneAndDelete({ userId });
  await VerificationTokenModel.create({ token, userId });
  const link = `${process.env.VERIFICATION_LINK}?token=${token}&userId=${userId}`;
  // await mail.sendVerificationMail({ link, name: user.name, to: user.email });
};




interface VerificationResponse {
  status?: boolean;
  message?: string;
}
export const generateVerificationLink = async ()// state: VerificationResponse,
: Promise<VerificationResponse> => {
  const session = await auth.api.getSession({
         headers: await headers()
  })

  if (!session) return { status: false, message: "Something went wrong" };

  const user = await UserModel.findById(session?.user?.id);
  if (!user) return { status: false, message: "User does not exixt" };
  if (user?.verified) {
    // user is already verified
    return { status: false, message: "User is already verified" };
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
