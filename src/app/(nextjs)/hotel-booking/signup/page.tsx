// import GoogleLoginAction from "@/domains/hotel-booking/components/auth/GoogleLoginAction";
import SignUpForm from "@/domains/hotel-booking/components/auth/SignUpForm";

const Signup = () => {
  return (
    <div>
      <div className=" flex items-center justify-center h-screen">
        {/* Modal Container */}
        <div className="bg-white rounded-xl shadow w-96 p-6 relative ">
          {/* Modal Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sign up to Hotel Booking</h2>
            <p className="text-gray-600 text-sm mt-2">Welcome back! Let&apos;s get you signed in.</p>
          </div>
          {/* Social Login */}
          <div className="space-y-4 mb-4">
            {/* Google Login Button */}
            {/*<GoogleLoginAction />*/}

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="grow border-t border-gray-300" />
            </div>
            {/* Email Login Form */}
            <SignUpForm />
          </div>
          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Don&apos;t have an account?
              {/**
               * I used a instead of Link so that browser take full reload and not intercepted
               * Link uses soft navigation and intercepted by the login page
               */}
              <a href="/login" className="text-primary hover:underline ml-1">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
