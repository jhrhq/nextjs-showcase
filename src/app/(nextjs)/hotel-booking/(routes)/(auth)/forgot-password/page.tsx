import type { Metadata } from "next";
import ForgetPasswordForm from "@/domains/hotel-booking/components/auth/ForgetPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Hotel Booking",
  description: "Reset your Hotel Booking account password to regain access to your reservations and account details.",
  robots: {
    index: false,
    follow: false,
  },
};

const ForgetPassword = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 border border-border rounded-3xl bg-card text-card-foreground shadow-sm space-y-6">
        {/* Card Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Reset Password</h1>
        </div>

        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <div className="w-full h-px bg-border" />
        </div>
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPassword;
