// ============================================================================
// FILE: src/app/dashboard/page.tsx
// LOCATION: src/app/dashboard/page.tsx
// PURPOSE: Protected dashboard page
// ============================================================================

import { redirect } from "next/navigation";
import { AUTH_CONFIG } from "@/lib/linker/constants/auth.constants";
import { sessionService } from "@/lib/linker/services/auth/session.service";

export default async function DashboardPage() {
  const session = await sessionService.get();

  if (!session) {
    redirect(AUTH_CONFIG.ROUTES.SIGN_IN);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-muted-foreground">You are successfully signed in!</p>
    </div>
  );
}
