// ============================================================================
// FILE: src/app/(auth)/sign-in/page.tsx
// LOCATION: src/app/(auth)/sign-in/page.tsx
// PURPOSE: Sign in page
// ============================================================================

import type { Metadata } from "next";
import { SignInCard } from "@/components/linker/features/auth/sign-in-card";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignInCard />
    </div>
  );
}
