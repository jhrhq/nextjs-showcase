import type { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "Linker - SEO Link Management Tool",
  description: "Manage your SEO links and backlinks effectively",
};

export default async function LinkerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
