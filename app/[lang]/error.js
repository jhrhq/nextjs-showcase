"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <>
      <div class="flex h-screen flex-col ">
        <div class="flex flex-1 items-center justify-center">
          <div class="mx-auto max-w-xl px-4 py-8 text-center">
            <h1 class="text-2xl font-bold tracking-tight  sm:text-4xl mb-4">
              {error?.message ?? "Something went wrong."}
            </h1>
            <Button
              className="bg-color-purple"
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
