// ============================================================================
// FILE: src/app/(auth)/layout.tsx
// LOCATION: src/app/(auth)/layout.tsx
// PURPOSE: Auth pages layout
// ============================================================================

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative min-h-screen bg-background">{children}</div>;
}
