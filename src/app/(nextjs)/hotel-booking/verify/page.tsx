import Verification from "@/domains/hotel-booking/components/Verification";
import UserModel from "@/domains/hotel-booking/models/user-model";
// import VerificationTokenModel from "@/domains/hotel-booking/models/verification-token-model";
import { notFound } from "next/navigation";


interface Props {
  searchParams:
  Promise<{
    token: string;
    userId: string;
    }>
}

const Verify = async ({ searchParams }:Props) => {
  const { token, userId } = await searchParams;
  // try {
  //   const verificationToken = await VerificationTokenModel.findOne({ userId });
  //   if (verificationToken?.compare(token)) {
  //     // token is verified
  //     await UserModel.findByIdAndUpdate(userId, { verified: true });
  //     await VerificationTokenModel.findByIdAndDelete(verificationToken._id);
  //   } else {
  //     throw new Error();
  //   }
  // } catch (error) {
  //   notFound();
  // }

  return <Verification />;
};

export default Verify;
