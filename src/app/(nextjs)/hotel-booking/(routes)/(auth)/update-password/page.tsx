import type { Metadata } from "next";
import UpdatePasswordForm from "@/domains/hotel-booking/components/auth/UpdatePasswordForm";

export const metadata: Metadata = {
  title: "Update Password | Hotel Booking",
  description: "Update your Hotel Booking account password to regain access to your reservations and account details.",
  robots: {
    index: false,
    follow: false,
  },
};
interface Props {
  searchParams: Promise<{
    token: string;
    userId: string;
  }>;
}

const UpdatePassword = async ({ searchParams }: Props) => {
  const { token: _token, userId: _userId } = await searchParams;

  // try {
  //   // await connectDB();
  //   const resetToken = await PassResetTokenModel.findOne({ userId });
  //   if (!resetToken?.compare(token)) {
  //     throw new Error();
  //   }
  // } catch (error) {
  //   return notFound();
  // }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 border border-gray-200/80 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 shadow-xs space-y-6">
        {/* Card Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Update Password
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
        </div>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default UpdatePassword;
