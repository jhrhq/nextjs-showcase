// import UpdatePasswordForm from "@/domains/hotel-booking/components/auth/UpdatePasswordForm";
// import connectDB from "@/domains/hotel-booking/config/database";

import { notFound } from "next/navigation";
import PassResetTokenModel from "@/domains/hotel-booking/models/password-reset-token-model";

interface Props {
  searchParams: Promise<{
    token: string;
    userId: string;
  }>;
}

const UpdatePassword = async ({ searchParams }: Props) => {
  const { token, userId } = await searchParams;

  // try {
  //   // await connectDB();
  //   const resetToken = await PassResetTokenModel.findOne({ userId });
  //   if (!resetToken?.compare(token)) {
  //     throw new Error();
  //   }
  // } catch (error) {
  //   return notFound();
  // }

  // return <UpdatePasswordForm token={token} userId={userId} />;
  return <h1 className="text-6xl">Update password</h1>;
};

export default UpdatePassword;
