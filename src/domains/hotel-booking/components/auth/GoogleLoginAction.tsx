"use client";
import { GoogleSvg } from "@/domains/hotel-booking/components/svg-component/GoogleSvg";
import { Button } from "@/domains/hotel-booking/components/ui/button";
import { signIn } from "next-auth/react";

const GoogleLoginAction = () => {
  const handleAuth = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };
  return (
    <Button
      onClick={handleAuth}
      className="w-full h-auto text-base flex items-center justify-center border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition [&_svg]:size-auto"
      variant="outline"
    >
      <GoogleSvg />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginAction;
