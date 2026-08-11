import { ArchivePreview } from "@/domains/portfolio/components/archive-preview";
import { ContactCard } from "@/domains/portfolio/components/contact-card";
import { FeaturedProjects } from "@/domains/portfolio/components/featured-projects";

import { Footer } from "@/domains/portfolio/components/footer";
import { Hero } from "@/domains/portfolio/components/hero";
import { Navbar } from "@/domains/portfolio/components/navbar";
import { TechStack } from "@/domains/portfolio/components/tech-stack";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
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
