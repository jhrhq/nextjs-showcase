"use client";

import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO: ADD authentication
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground transition-colors duration-200">
        {/* <AuthProvider>{children}</AuthProvider>*/}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
