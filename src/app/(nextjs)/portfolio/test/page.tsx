import { FeaturedProjects } from "@/domains/portfolio/components/featured-projects";
import { Footer } from "@/domains/portfolio/components/footer";
import { Hero } from "@/domains/portfolio/components/hero";
import { Labs } from "@/domains/portfolio/components/labs";
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
        <Labs />
      </main>

      <Footer />
    </>
  );
}
