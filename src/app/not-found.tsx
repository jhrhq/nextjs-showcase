import { FileQuestion, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <FileQuestion className="size-8 text-primary" />
        </div>

        <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          404 Error
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Page not found</h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or never existed.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button asChild variant="default" className="w-full sm:w-auto">
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
