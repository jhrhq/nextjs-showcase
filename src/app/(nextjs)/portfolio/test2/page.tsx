import { Footer } from "@/domains/portfolio/components/footer";
import { Navbar } from "@/domains/portfolio/components/navbar";
import { FeaturedProjects } from "./featured-projects";
import { Hero } from "./hero";
import { Labs } from "./labs";
import { TechStack } from "./tech-stack";

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
