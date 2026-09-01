import type { Metadata } from "next";
import { AboutApproach } from "@/domains/portfolio/components/about/about-approach";
import { AboutContact } from "@/domains/portfolio/components/about/about-contact";
import { AboutEducation } from "@/domains/portfolio/components/about/about-education";
import { AboutExperience } from "@/domains/portfolio/components/about/about-experience";
import { AboutHero } from "@/domains/portfolio/components/about/about-hero";
import { AboutLearning } from "@/domains/portfolio/components/about/about-learning";
import { Navbar } from "@/domains/portfolio/components/about/about-navbar";
import { AboutProfile } from "@/domains/portfolio/components/about/about-profile";
import { AboutTechnology } from "@/domains/portfolio/components/about/about-technology";
import { Footer } from "@/domains/portfolio/components/footer";

export const metadata: Metadata = {
  title: "About | Johir Haq",
  description:
    "Johir Haq is a frontend developer with 3 years of production SaaS experience, specializing in React and TypeScript and expanding into full-stack development with Node.js, Express, SQL, and MongoDB.",

  openGraph: {
    title: "About | Johir Haq",
    description: "Frontend developer with production SaaS experience, specializing in React and TypeScript.",
    type: "profile",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 sm:px-2">
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
