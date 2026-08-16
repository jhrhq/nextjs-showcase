import type { Metadata } from "next";
import { ArchivePreview } from "@/domains/portfolio/components/archive-preview";
import { ContactCard } from "@/domains/portfolio/components/contact-card";
import { FeaturedProjects } from "@/domains/portfolio/components/featured-projects";
import { Footer } from "@/domains/portfolio/components/footer";
import { Hero } from "@/domains/portfolio/components/hero";
import { Navbar } from "@/domains/portfolio/components/navbar";
import { TechStack } from "@/domains/portfolio/components/tech-stack";

export const metadata: Metadata = {
  title: "Johir Haq — Frontend Developer",
  description:
    "Johir Haq is a frontend developer specializing in React, Next.js, and TypeScript, with 3 years of experience building production SaaS applications and high-performance web experiences.",
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="container mx-auto">
        <Hero />
        <TechStack />
        <FeaturedProjects />
        <ArchivePreview />
        <ContactCard />
      </main>
      <Footer />
    </>
  );
}
