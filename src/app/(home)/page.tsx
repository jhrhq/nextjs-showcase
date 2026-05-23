import { ArrowUpRight, BookOpen, Code2, FolderGit2, Link2, TableProperties } from "lucide-react";
import type React from "react";
import type { SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/ui/shared/theme-toggle";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "saas" | "side-project" | "ui" | "blog";
  categoryLabel: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  actionText: string;
  href: string;
  isFeatured?: boolean;
}

const projects: ProjectItem[] = [
  {
    id: "linker",
    title: "Linker Application",
    description: "A simplified version of the real-life SEO internal linking SaaS application I worked on.",
    category: "saas",
    categoryLabel: "SaaS App",
    tags: ["Next.js", "TypeScript", "Tailwind v4", "IndexedDB"],
    icon: Link2,
    actionText: "Open Application",
    href: "/linker",
    isFeatured: true,
  },
  {
    id: "expandable-table",
    title: "Expandable Table",
    description: "A custom, high-performance UI implementation for nested data rows using TanStack Table.",
    category: "ui",
    categoryLabel: "UI / Component",
    tags: ["TanStack Table", "React", "Optimization"],
    icon: TableProperties,
    actionText: "View Table",
    href: "/expandable-table",
  },
  {
    id: "blog-platform",
    title: "Developer Blog",
    description: "Articles, coding write-ups, and guides on frontend development and clean code practices.",
    category: "blog",
    categoryLabel: "Blog",
    tags: ["Server Actions", "UI/UX", "Architecture"],
    icon: BookOpen,
    actionText: "Read Articles",
    href: "/blog",
  },
];

export default function DeveloperShowcaseHome() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans transition-colors duration-200">
      {/* Universal Global Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
            <span className="font-semibold text-sm tracking-tight">Portfolio & Showcase</span>
          </div>

          <nav className="flex items-center gap-5 text-xs font-medium text-muted-foreground">
            <ModeToggle />
            <a href="#work" className="hover:text-foreground transition-colors">
              My Work
            </a>
            <a href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        {/* Simple, No-Fluff Hero Section */}
        <section className="max-w-2xl mb-16 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Hey, I'm a Web Developer</h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
            Welcome to my personal site. Here, I showcase simplified versions of real-life SaaS applications I've worked
            on, along with my side projects, technical UI components, and personal blog posts.
          </p>
        </section>

        {/* Showcase Grid */}
        <section id="work" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <FolderGit2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Projects & Components
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Card
                  key={project.id}
                  className="bg-card border-border flex flex-col justify-between transition-all hover:border-muted-foreground/40 shadow-sm hover:shadow-md"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-md bg-muted border border-border text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <CardTitle className="text-base font-bold tracking-tight">{project.title}</CardTitle>
                      <CardDescription className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-normal">
                        {project.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      asChild
                      variant={project.isFeatured ? "default" : "secondary"}
                      className={`w-full text-xs font-medium h-9 ${
                        project.isFeatured
                          ? "bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white"
                          : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
                      }`}
                    >
                      <a href={project.href} className="flex items-center justify-center gap-1">
                        {project.actionText}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

interface LinkedInIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  altTitle?: string;
}

const LinkedInIcon = ({ size = 16, altTitle = "LinkedIn Profile", className = "", ...props }: LinkedInIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={altTitle}
      className={`fill-current text-muted-foreground hover:text-foreground transition-colors ${className}`}
      {...props}
    >
      <title>{altTitle}</title>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
};

interface GitHubIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  altTitle?: string;
}

const GitHubIcon = ({ size = 16, altTitle = "GitHub Profile", className = "", ...props }: GitHubIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={altTitle}
      className={`fill-current text-muted-foreground hover:text-foreground transition-colors ${className}`}
      {...props}
    >
      <title>{altTitle}</title>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};
