import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Movies - MOVIE DB",
  description: "A movie app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-moviedb-black min-h-screen flex items-center justify-center p-4`}
      >
        <div className="container mx-auto px-4 py-4">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
