import type { Metadata } from "next";
import {
  ArchitectureEvolution,
  ComplexInterfaces,
  CurrentRecreation,
  DataArchitecture,
  EngineeringLessons,
  FormsAndContent,
  Header,
  Hero,
  MultiSiteState,
  ProductGrowth,
  StartingPoint,
  TechnologyEvolution,
  Visualization,
} from "@/domains/portfolio/components/linkboss";

export const metadata: Metadata = {
  title: "Linkboss — Engineering Case Study | Johir Haque",
  description:
    "A technical case study covering the architecture, tooling evolution, complex data-driven interfaces, state management, API integration, and engineering challenges behind three years of Linkboss SaaS development.",
  openGraph: {
    title: "Linkboss — Engineering Case Study | Johir Haq",
    description:
      "A technical walkthrough of the engineering decisions and challenges behind three years of Linkboss SaaS development.",
    type: "article",
    url: "/linkboss-architecture",
  },
};

export default function LinkbossArchitecturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <Hero />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <TechnologyEvolution />
        <StartingPoint />
        <ProductGrowth />
        <ArchitectureEvolution />
        <DataArchitecture />
        <MultiSiteState />
        <ComplexInterfaces />
        <FormsAndContent />
        <Visualization />
        <EngineeringLessons />
        <CurrentRecreation />
      </div>
    </main>
  );
}
