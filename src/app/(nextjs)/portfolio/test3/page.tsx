import { Footer } from "@/domains/portfolio/components/footer";
import { ArchivePreview } from "./archive-preview";
import { FeaturedProjects } from "./featured-projects";
import { Hero } from "./hero";
import { Navbar } from "./navbar";
import { TechStack } from "./tech-stack";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TechStack />
        <FeaturedProjects />
        <ArchivePreview />
      </main>

      <Footer />
    </>
  );
}
