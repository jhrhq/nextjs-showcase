// import AuthProvider from "@/domains/context-providers/AuthProvider";

import { Toaster } from "sonner";
import { dbConnect } from "@/domains/movies/services/mongo";
import "./globals.css";

export const metadata = {
  title: "Movies - MOVIE DB",
  description: "A movie app",
};

export default async function RootLayout({ children }) {
  // db connect
  await dbConnect();
  // TODO: ADD authentication
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground transition-colors duration-200">
        {/* <AuthProvider>{children}</AuthProvider>*/}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
