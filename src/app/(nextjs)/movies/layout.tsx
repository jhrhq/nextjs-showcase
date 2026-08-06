"use client";

import { Toaster } from "sonner";

import "./globals.css";
import { Providers } from "./provider";

// `export const metadata = {
//   title: "Movies - MOVIE DB",
//   description: "A movie app",
// };`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // await connectToDatabase();
  // TODO: ADD authentication
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground transition-colors duration-200">
        {/* <AuthProvider>{children}</AuthProvider>*/}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
