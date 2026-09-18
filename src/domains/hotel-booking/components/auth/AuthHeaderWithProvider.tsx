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
        <h2 className="text-2xl font-bold text-foreground">{isSignIn ? "Sign in" : "Sign up"} to Hotel Booking</h2>
        <p className="text-muted-foreground text-sm mt-2">
          {isSignIn ? "Welcome back! Let's get you signed in." : "Let's get you signed up."}
        </p>
      </div>
      {/*<div className="flex items-center mt-4">
        <div className="grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="grow border-t border-gray-300" />
      </div>*/}
      {children}
      <div className="text-center text-sm text-muted-foreground mt-2">
        <p>
          {isSignIn ? "Don't" : "Already"} have an account?{" "}
          {modal ? (
            <Link
              href={href}
              replace={modal}
              className="text-primary font-medium underline-offset-4 hover:underline cursor-pointer"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          ) : (
            <a href={href} className="text-primary hover:underline">
              {isSignIn ? "Sign up" : "Sign in"}
            </a>
          )}
        </p>
      </div>
    </>
  );
};

export default AuthHeaderWithProvider;
