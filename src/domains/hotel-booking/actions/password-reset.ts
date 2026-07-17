// import connectDB from "@/domains/hotel-booking/config/database";

import crypto from "node:crypto";
import PassResetTokenModel from "@/domains/hotel-booking/models/password-reset-token-model";
import UserModel from "@/domains/hotel-booking/models/user-model";
import { updatePasswordSchema } from "@/domains/hotel-booking/validationSchema/update-password-validation-schema";

interface ResetPassResponse {
  message?: string;
  error?: string;
  status: boolean;
}

export const generatePassResetLinkAction = async (
  // state: ResetPassResponse,
  data: { email: string }
): Promise<ResetPassResponse> => {
  const email = data.email;
  if (typeof email !== "string") return { status: false, message: "Invalid email!" };

  // await connectDB();
  const user = await UserModel.findOne({ email, provider: "credentials" });
  if (!user) return { status: false, message: "User not found" };

  const userId = user._id;
  const token = crypto.randomBytes(36).toString("hex");

  // await PassResetTokenModel.findOneAndDelete({ userId });
  // await PassResetTokenModel.create({ token, userId });
  const link = `${process.env.PASS_RESET_LINK}?token=${token}&userId=${userId}`;
  // await mail.sendPassResetMail({ link, name: user.name, to: user.email });

  return { status: false, message: "A rest link sent to your mail" };
};

interface AuthResponse {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  message?: string;
  status?: boolean;
}
export const updatePasswordAction = async (
  state: AuthResponse,
  {
    userId,
    token,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    token: string;
    oldPassword: string;
    newPassword: string;
  }
): Promise<AuthResponse> => {
  const result = updatePasswordSchema.safeParse({
    userId,
    token,
    oldPassword,
    newPassword,
  });
  if (!result.success) return { status: false, error: "Invalid Password!" };

  // await connectDB();
  const resetToken = await PassResetTokenModel.findOne({ userId });
  if (!resetToken?.compare(token)) {
    return { status: false, error: "Invalid request!" };
  }

  const user = await UserModel.findById(userId);
  if (!user)
    return {
      status: false,
      error: "Could not update password, user not found!",
    };
  if (user && user.password == newPassword)
    return {
      status: false,
      error: "Please use a new password",
    };

  user.password = newPassword;
  await user.save();

  await PassResetTokenModel.findByIdAndDelete(resetToken._id);
  return { status: true };
};
