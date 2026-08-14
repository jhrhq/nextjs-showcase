import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Experiments | Johir Haq",
  description:
    "Explore Johir Haq's projects and experiments, from production SaaS and full-stack applications to React, Vite, JavaScript, and HTML/CSS builds.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
