"use client";

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
