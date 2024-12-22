"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <>
      <div className="flex h-screen flex-col ">
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto max-w-xl px-4 py-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight  sm:text-4xl mb-4">
              {error?.message ?? "Something went wrong."}
            </h1>
            <Button
              className="bg-primary text-foreground h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 "
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try refreshing the app
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
