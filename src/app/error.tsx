"use client";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center">
        {/* Icon Badge */}
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 shadow-sm">
          <AlertTriangle className="size-8 text-destructive" />
        </div>

        {/* Error Code & Title */}
        <span className="font-mono text-xs font-semibold tracking-widest text-destructive uppercase">
          Application Error
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Something went wrong!</h1>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground">
          An unexpected error occurred while processing your request. You can try refreshing the page or return home.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button onClick={() => reset()} variant="default" className="w-full sm:w-auto gap-2">
            <RotateCcw className="size-4" />
            Try again
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/" className="gap-2">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
