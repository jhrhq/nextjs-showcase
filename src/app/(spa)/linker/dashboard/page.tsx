// ============================================================================
// FILE: src/app/dashboard/page.tsx
// LOCATION: src/app/dashboard/page.tsx
// PURPOSE: Protected dashboard page
// ============================================================================
"use client";
export default function DashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold"> Dashboard</h1>
      <p className="mt-4 text-muted-foreground">You are successfully signed in!</p>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
