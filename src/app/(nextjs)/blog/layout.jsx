import { cookies } from "next/headers";
import "./styles.css";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import { COLOR_COOKIE_NAME, DARK_TOKENS, LIGHT_TOKENS } from "@/constants";
import Footer from "@/domains/blog/ui/Footer/Footer";
import Header from "@/domains/blog/ui/Header/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog",
  description: "Blog",
};

export default async function BlogLayout({ children }) {
  const savedTheme = await cookies();
  const themValue = savedTheme.get(COLOR_COOKIE_NAME);
  const theme = themValue?.value || "light";
  return (
    <html
      lang="en"
      className={inter.variable}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header initialTheme={theme} />
        <main>
          {/* <RespectMotionPreference> */}
          {children}
          {/* </RespectMotionPreference> */}
        </main>
        <Footer />
      </body>
    </html>
  );
}
