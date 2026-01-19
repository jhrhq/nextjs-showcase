import type { Metadata } from "next";
import { SignInCard } from "@/components/linker/features/auth/sign-in-card";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center h-dvh">
        <div className="flex min-h-screen items-center justify-center p-4 w-full">
          <SignInCard />
        </div>
      </div>
    </div>
  );
}
