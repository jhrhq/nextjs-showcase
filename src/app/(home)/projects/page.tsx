"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactCard } from "@/domains/portfolio/components/contact-card";
import { projects } from "@/domains/portfolio/projects/data";
import { ProjectFilter } from "@/domains/portfolio/projects/project-filter";
import { ProjectGrid } from "@/domains/portfolio/projects/project-grid";
import type { ProjectTechnology } from "@/domains/portfolio/projects/types";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<ProjectTechnology[]>([]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.category.toLowerCase().includes(normalizedSearch) ||
        project.technologies.some((technology) => technology.toLowerCase().includes(normalizedSearch));

      const matchesTechnology =
        selectedTechnologies.length === 0 ||
        selectedTechnologies.every((technology) => project.technologies.includes(technology));

      return matchesSearch && matchesTechnology;
    });
  }, [search, selectedTechnologies]);

  function toggleTechnology(technology: ProjectTechnology) {
    setSelectedTechnologies((current) =>
      current.includes(technology) ? current.filter((item) => item !== technology) : [...current, technology]
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedTechnologies([]);
  }

  // const hasFilters = search.length > 0 || selectedTechnologies.length > 0;

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium mb-4">
                <ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                Home
              </Link>
              <p className=" mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground ">
                Project archive / 2020—2026
              </p>
              <h1 className=" max-w-4xl text-5xl font-medium tracking-[-0.055em] sm:text-6xl lg:text-8xl lg:leading-[0.95] ">
                Projects
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className=" max-w-md text-sm leading-7 text-muted-foreground ">
                A collection of projects built while exploring frontend development, UI design, JavaScript, React and
                modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl ">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className=" flex min-h-16 flex-col justify-center gap-3 py-3 sm:flex-row sm:items-center sm:justify-between ">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className=" absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground " />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
                className=" h-10 rounded-full border-border bg-muted/30 pl-10 pr-10 shadow-none focus-visible:ring-1 "
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className=" absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground "
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {filteredProjects.length} of {projects.length} projects
              </p>
              <ProjectFilter selected={selectedTechnologies} onToggle={toggleTechnology} onClear={clearFilters} />
            </div>
          </div>
          {/* Active filters */}
          {selectedTechnologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border py-3">
              {selectedTechnologies.map((technology) => (
                <button
                  key={technology}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground bg-foreground px-3 py-1 text-[10px] text-background transition-colors hover:bg-background hover:text-foreground"
                  onClick={() => toggleTechnology(technology)}
                >
                  {technology} <X className="size-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {filteredProjects.length > 0 ? (
          <ProjectGrid projects={filteredProjects} />
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </section>
      <ContactCard />
      <footer className="border-t border-border">
        <div className=" mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 ">
          <span>Project archive</span> <span>{projects.length} projects / 2020—2026</span>
        </div>
      </footer>
    </main>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className=" flex min-h-105 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 text-center ">
      <span className=" font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground ">
        No projects found
      </span>
      <h2 className=" mt-3 text-2xl font-medium tracking-tight "> Nothing matches your search. </h2>
      <p className=" mt-2 max-w-sm text-sm leading-6 text-muted-foreground ">
        Try a different search term or remove some of your technology filters.
      </p>
      <Button variant="outline" onClick={onClear} className="mt-6 rounded-full shadow-none">
        Clear filters{" "}
      </Button>
    </div>
  );
}
