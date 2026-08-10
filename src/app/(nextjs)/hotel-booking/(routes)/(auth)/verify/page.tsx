import Verification from "@/domains/hotel-booking/components/Verification";

const Verify = async () => {
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
