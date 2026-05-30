import UpdatePasswordForm from "@/domains/hotel-booking/components/auth/UpdatePasswordForm";
import connectDB from "@/domains/hotel-booking/config/database";
import PassResetTokenModel from "@/domains/hotel-booking/models/password-reset-token-model";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

const UpdatePassword = async ({ searchParams }: Props) => {
  const { token, userId } = searchParams;

  try {
    await connectDB();
    const resetToken = await PassResetTokenModel.findOne({ userId });
    if (!resetToken?.compare(token)) {
      throw new Error();
    }
  } catch {
    return notFound();
  }

  return <UpdatePasswordForm token={token} userId={userId} />;
};

export default UpdatePassword;
