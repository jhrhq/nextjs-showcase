import { FlagshipProjectCard } from "./flagship-project-card";
import { projects } from "./portfolio-data";
import { ProjectCard } from "./project-card";

const standardProjects = projects.filter((project) => project.id !== "flagship-saas" && project.featured);

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">01 / Featured Work</p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Work that represents how I build.
        </h2>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          From production SaaS architecture to full-stack products and frontend experiments, these projects showcase how
          I approach complex interfaces, data-driven applications, and modern frontend architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-2">
          <FlagshipProjectCard />
        </div>

        <div className="col-span-full grid gap-4 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-2">
          {standardProjects.slice(0, 2).map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        {standardProjects.slice(2).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
