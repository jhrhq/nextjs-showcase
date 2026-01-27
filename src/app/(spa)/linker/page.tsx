"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { useAuthStore } from "@/store/linker/auth-store";

export default function LinkerPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(AUTH_CONFIG.ROUTES.DASHBOARD);
    } else {
      router.replace(AUTH_CONFIG.ROUTES.SIGN_IN);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}
