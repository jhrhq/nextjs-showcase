"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface EditListingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-segment error boundary for /hotel-booking/hosting/listing/[id]/edit.
 *
 * Renders a recovery UI when the page or any of its Server Components throw.
 * The `reset()` function re-runs the failed segment without a full page reload.
 */
export default function EditListingError({ error, reset }: EditListingErrorProps) {
  useEffect(() => {
    // Log to your error tracking service here (e.g. Sentry.captureException)
    console.error("[EditListingError]", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-10">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            We couldn&apos;t load the edit form. This is usually a temporary issue — try again and it should resolve.
          </CardDescription>
        </CardHeader>

        {process.env.NODE_ENV === "development" && (
          <CardContent>
            <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs text-muted-foreground">
              {error.message}
              {error.digest ? `\n\nDigest: ${error.digest}` : ""}
            </pre>
          </CardContent>
        )}

        <CardFooter className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go back
          </Button>
          <Button onClick={reset}>Try again</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
