import { AboutApproach } from "@/domains/portfolio/components/about/about-approach";
import { AboutContact } from "@/domains/portfolio/components/about/about-contact";
import { AboutEducation } from "@/domains/portfolio/components/about/about-education";
import { AboutExperience } from "@/domains/portfolio/components/about/about-experience";
import { AboutHero } from "@/domains/portfolio/components/about/about-hero";
import { AboutLearning } from "@/domains/portfolio/components/about/about-learning";
import { AboutProfile } from "@/domains/portfolio/components/about/about-profile";
import { AboutTechnology } from "@/domains/portfolio/components/about/about-technology";
import { Footer } from "@/domains/portfolio/components/footer";
import { Navbar } from "@/domains/portfolio/components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <AboutHero />
        <AboutProfile />
        <AboutExperience />
        <AboutApproach />
        <AboutTechnology />
        <AboutEducation />
        <AboutLearning />
        <AboutContact />
      </main>

      <Footer />
    </>
  );
}
