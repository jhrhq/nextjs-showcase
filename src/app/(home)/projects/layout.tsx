import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Experiments | Johir Haq",
  description:
    "Explore Johir Haq's projects and experiments, from production SaaS and full-stack applications to React, Vite, JavaScript, and HTML/CSS builds.",
  openGraph: {
    title: "Johir Haq — Frontend Developer",
    description:
      "Explore Johir Haq's projects and experiments, from production SaaS and full-stack applications to React, Vite, JavaScript, and HTML/CSS builds.",
    type: "website",
    url: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
