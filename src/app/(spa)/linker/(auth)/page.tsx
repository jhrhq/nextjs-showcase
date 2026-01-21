"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/linker/auth-store";

export default function SPAAppPage() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl">SPA Application</CardTitle>
          <CardDescription>Client-side rendered experience</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isAuthenticated ? (
            <>
              <p className="text-center text-lg font-medium">
                Welcome back, <span className="font-semibold">{user?.name}</span>!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/spa/dashboard" className="flex-1">
                  <Button className="w-full">Dashboard</Button>
                </Link>

                <Link href="/spa/settings" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Settings
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-muted-foreground">Please log in to continue</p>

              <Link href="/login">
                <Button className="w-full">Login</Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
