// import GoogleLoginAction from "@/domains/hotel-booking/components/auth/GoogleLoginAction";
// import LoginForm from "@/domains/hotel-booking/components/auth/LoginForm";
// import LoginNavigation from "@/domains/hotel-booking/components/auth/LoginNavigation";

import Link from "next/link";
import { AUTH_CONFIG } from "../../constants/auth.constants";

type SignInHeaderWithGoogleProviderProps = {
  children: React.ReactNode;
  isSignIn?: boolean;
  callbackUrl: string;
  modal?: boolean;
};

const AuthHeaderWithProvider = ({ children, isSignIn, callbackUrl, modal }: SignInHeaderWithGoogleProviderProps) => {
  const href = `${isSignIn ? AUTH_CONFIG.ROUTES.SIGN_UP : AUTH_CONFIG.ROUTES.SIGN_IN}?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isSignIn ? "Sign in" : "Sign up"} to Hotel Booking</h2>
        <p className="text-gray-600 text-sm mt-2">
          {isSignIn ? "Welcome back! Let's get you signed in." : "Let's get you signed up."}
        </p>
      </div>
      <div className="flex items-center mt-4">
        <div className="grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="grow border-t border-gray-300" />
      </div>
      {children}
      <div className="text-center text-sm text-gray-600 mt-2">
        <p>
          {isSignIn ? "Don't" : "Already"} have an account?{" "}
          <Link href={href} replace={modal} className="text-primary hover:underline hover:cursor-pointer">
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </>
  );
};

export default AuthHeaderWithProvider;
