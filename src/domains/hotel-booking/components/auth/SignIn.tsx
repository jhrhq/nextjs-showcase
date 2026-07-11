import SignInForm from "./SignInForm";

// import GoogleLoginAction from "@/domains/hotel-booking/components/auth/GoogleLoginAction";
// import LoginForm from "@/domains/hotel-booking/components/auth/LoginForm";
// import LoginNavigation from "@/domains/hotel-booking/components/auth/LoginNavigation";

const SignIn = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Log in to Hotel Booking</h2>
        <p className="text-gray-600 text-sm mt-2">Welcome back! Let&apos;s get you signed in.</p>
      </div>
      <div className="space-y-4 mb-4">
        {/* Email Login Form */}
        <SignInForm />
        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="grow border-t border-gray-300" />
        </div>

        {/* Google Login Button */}
        {/*<GoogleLoginAction />*/}
      </div>
    </>
  );
};

export default SignIn;
