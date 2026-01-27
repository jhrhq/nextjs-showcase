"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { Topbar } from "@/domains/linker/ui/dashboard/project-header";
import { useAuthStore } from "@/store/linker/auth-store";
import { AppSidebar } from "@/ui/shared/app-sidebar";
import "../dashboard.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  React.useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.replace(AUTH_CONFIG.ROUTES.SIGN_IN);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) {
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
