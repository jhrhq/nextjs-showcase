import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { connectToDatabase } from "@/domains/hotel-booking/config/database";

export default async function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  await connectToDatabase();

  return (
    <html lang="en">
      <body className="antialiased">
        {auth}
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
