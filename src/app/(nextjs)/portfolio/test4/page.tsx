import type { Metadata } from "next";
import { ArchiveSection } from "./components/archive";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { Projects } from "./components/projects";
import { TechStrip } from "./components/tech-strip";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jhr — Frontend Developer",
  description: "Self-taught frontend developer specialising in React, Next.js, and web applications.",
};
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStrip />
        <Projects />
        <ArchiveSection />
      </main>
      <Footer />
    </>
  );
}
