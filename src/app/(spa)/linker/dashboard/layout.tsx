"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import React from "react";
import { useAuthStore } from "@/store/linker/auth-store";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => !state.isAuthenticated);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/linker/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <h1>Navbar</h1>
      <div className="flex">
        <h2>Sidebar</h2>
        <main className="flex-1 p-6 ml-64">{children}</main>
      </div>
    </div>
  );
}
