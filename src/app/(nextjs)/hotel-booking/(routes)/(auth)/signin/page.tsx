import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthHeaderWithProvider from "@/domains/hotel-booking/components/auth/AuthHeaderWithProvider";
import SignInForm from "@/domains/hotel-booking/components/auth/SignInForm";
import { auth } from "@/lib/auth";
import { resolveCallbackUrl } from "@/lib/callback-urls";

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export const metadata: Metadata = {
  title: "Sign In | Hotel Booking",
  description: "Sign in to your Hotel Booking account to manage reservations, view trips, and access your account.",
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams(resolvedParams as Record<string, string>);
  const callbackUrl = resolveCallbackUrl(params);
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect(callbackUrl);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow w-96 p-6 relative ">
        <AuthHeaderWithProvider isSignIn={true} callbackUrl={callbackUrl}>
          <SignInForm callbackUrl={callbackUrl} />
        </AuthHeaderWithProvider>
      </div>
    </div>
  );
};

export default SignInPage;
