"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { useAuthStore } from "@/store/linker/auth-store";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  React.useEffect(() => {
    if (!hasHydrated) return;
    if (isAuthenticated) {
      router.replace(AUTH_CONFIG.ROUTES.DASHBOARD);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <main>{children}</main>;
}
