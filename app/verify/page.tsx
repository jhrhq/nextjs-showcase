import Verification from "@/components/Verification";
import UserModel from "@/models/user-model";
import VerificationTokenModel from "@/models/verification-token-model";
import { notFound } from "next/navigation";
import { FC } from "react";
interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

const Verify: FC<Props> = async ({ searchParams }) => {
  const { token, userId } = searchParams;
  try {
    const verificationToken = await VerificationTokenModel.findOne({ userId });
    if (verificationToken?.compare(token)) {
      // token is verified
      await UserModel.findByIdAndUpdate(userId, { verified: true });
      await VerificationTokenModel.findByIdAndDelete(verificationToken._id);
    } else {
      throw new Error();
    }
  } catch (error) {
    notFound();
  }

  return <Verification />;
};

export default Verify;
