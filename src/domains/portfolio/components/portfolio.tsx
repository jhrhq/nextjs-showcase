"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { featuredProjects, labs, type ProjectCategory, projects } from "@/domains/portfolio/lib/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";
import { ModeToggle } from "@/ui/shared/theme-toggle";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", "Next.js", "React/Vite", "HTML/CSS"];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Navigation */}
      <header className="border-b border-zinc-800/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="text-sm font-semibold tracking-tight text-white">
            jhr<span className="text-zinc-600">.</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-500 sm:flex">
            <a href="#work" className="transition-colors hover:text-zinc-200">
              Work
            </a>

            <a href="#labs" className="transition-colors hover:text-zinc-200">
              Labs
            </a>

            <a href="#contact" className="transition-colors hover:text-zinc-200">
              Contact
            </a>
          </nav>

          <Button
            variant="outline"
            size="sm"
            className="border-zinc-800 bg-transparent text-zinc-200 hover:bg-zinc-900 hover:text-white"
            asChild
          >
            <a href="#contact">Let's talk</a>
          </Button>
          <ModeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-sm text-zinc-500">Available for selected projects</span>
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              Building digital
              <br />
              products that <span className="text-zinc-500">matter.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
              React developer focused on building clean, scalable and production-ready web applications with modern
              frontend technologies.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button className="bg-white text-black hover:bg-zinc-200" asChild>
                <a href="#work">
                  View my work
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>

              <Button variant="outline" className="border-zinc-800 bg-transparent hover:bg-zinc-900" asChild>
                <a href="mailto:hello@example.com">
                  <Mail className="mr-2 size-4" />
                  Get in touch
                </a>
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <SocialLink href="#" label="GitHub">
                <GithubIcon />{" "}
              </SocialLink>

              <SocialLink href="#" label="LinkedIn">
                <LinkedinIcon />
              </SocialLink>

              <SocialLink href="#" label="Twitter">
                Twitter
              </SocialLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          eyebrow="01 / Featured"
          title="Selected work"
          description="A few projects that represent how I approach product development."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} large={index === 0} />
          ))}
        </div>
      </section>

      {/* Project Gallery */}
      <section className="border-t border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="02 / Projects"
            title="More experiments"
            description="Smaller applications and interfaces built across React, Vite and the web platform."
          />

          {/* Filters */}
          <div className="mt-10 flex flex-wrap gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1 w-fit">
            {filters.map((filter) => {
              const active = filter === activeFilter;

              return (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="relative rounded-md px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {active && (
                    <motion.span
                      layoutId="active-filter"
                      className="absolute inset-0 rounded-md bg-zinc-800"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>

          {/* Gallery */}
          <motion.div layout className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Labs */}
      <section id="labs" className="border-t border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="03 / Labs"
            title="The archive"
            description="Old projects, experiments and frontend exercises."
          />

          <div className="mt-10 divide-y divide-zinc-800 border-y border-zinc-800">
            {labs.map((lab, index) => (
              <motion.a
                key={lab.title}
                href="#"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group grid gap-4 py-6 transition-colors hover:bg-zinc-950 md:grid-cols-[100px_1fr_auto]"
              >
                <span className="font-mono text-xs text-zinc-600">{lab.year}</span>

                <div>
                  <h3 className="font-medium text-zinc-200 transition-colors group-hover:text-white">{lab.title}</h3>

                  <p className="mt-1 text-sm text-zinc-500">{lab.description}</p>
                </div>

                <ArrowUpRight className="size-4 text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-zinc-800/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-medium text-white">Let's build something useful.</p>

            <p className="mt-1 text-sm text-zinc-500">Open to interesting products and engineering challenges.</p>
          </div>

          <a href="mailto:hello@example.com" className="text-sm text-zinc-400 transition-colors hover:text-white">
            hello@example.com
          </a>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">{eyebrow}</p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>

      <p className="mt-4 text-zinc-500">{description}</p>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-md border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
    >
      {children}
    </a>
  );
}

function FeaturedCard({ project, large }: { project: (typeof featuredProjects)[number]; large: boolean }) {
  return (
    <motion.a
      href={project.href ?? "#"}
      layout
      whileHover={{ scale: 0.985 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex min-h-105 flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700 ${
        large ? "lg:col-span-2" : "lg:col-span-1"
      }`}
    >
      {/* Visual */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.08),transparent_35%)] opacity-60 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-400">
            Featured
          </span>

          <ArrowUpRight className="size-4 text-zinc-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-zinc-300" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-400"
              >
                <Icon className="size-3" />
                {tech.name}
              </span>
            );
          })}
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>

        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">{project.description}</p>
      </div>
    </motion.a>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.a
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -3 }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 350,
          damping: 30,
        },
        opacity: {
          duration: 0.2,
        },
      }}
      href={project.href ?? "#"}
      className="group flex min-h-75 flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="text-xs text-zinc-600">{project.category}</span>

          <ArrowUpRight className="size-4 text-zinc-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-zinc-300" />
        </div>

        {/* Project visual placeholder */}
        <div className="mt-6 aspect-video overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%)] bg-size[20px_20px]">
            <span className="font-mono text-xs text-zinc-700">PROJECT / {project.id}</span>
          </div>
        </div>

        <h3 className="mt-5 font-medium tracking-tight text-zinc-200 group-hover:text-white">{project.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">{project.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => {
          const Icon = tech.icon;

          return (
            <span
              key={tech.name}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-800 px-2 py-1 text-[11px] text-zinc-500"
            >
              <Icon className="size-3" />
              {tech.name}
            </span>
          );
        })}
      </div>
    </motion.a>
  );
}
