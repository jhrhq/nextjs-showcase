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

  return <main>{children}</main>;
}
