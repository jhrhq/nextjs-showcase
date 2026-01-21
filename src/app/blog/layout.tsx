import { cookies } from "next/headers";
import Footer from "@/components/blog/Footer";
import Header from "@/components/blog/Header";
import { COLOR_COOKIE_NAME, DARK_TOKENS, LIGHT_TOKENS } from "@/constants";
import "./styles.css";

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = await cookies();
  const themValue = savedTheme.get(COLOR_COOKIE_NAME);
  const theme = themValue?.value || "light";
  return (
    <div data-color-theme={theme} style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}>
      <Header initialTheme={theme} />
      <main>
        {/* <RespectMotionPreference> */}
        {children}
        {/* </RespectMotionPreference> */}
      </main>
      <Footer />
    </div>
  );
}
