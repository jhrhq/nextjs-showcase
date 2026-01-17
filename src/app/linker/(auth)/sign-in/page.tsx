// ============================================================================
// FILE: src/app/(auth)/sign-in/page.tsx
// LOCATION: src/app/(auth)/sign-in/page.tsx
// PURPOSE: Sign in page
// ============================================================================

import { SignInCard } from "@/components/linker/features/auth/sign-in-card";

export const metadata = {
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
