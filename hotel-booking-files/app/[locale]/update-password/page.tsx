import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import connectDB from "@/config/database";
import PassResetTokenModel from "@/models/password-reset-token-model";
import { notFound } from "next/navigation";
import { FC } from "react";

interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

const UpdatePassword: FC<Props> = async ({ searchParams }) => {
  const { token, userId } = searchParams;

  try {
    await connectDB();
    const resetToken = await PassResetTokenModel.findOne({ userId });
    if (!resetToken?.compare(token)) {
      throw new Error();
    }
  } catch (error) {
    return notFound();
  }

  return <UpdatePasswordForm token={token} userId={userId} />;
};

export default UpdatePassword;
