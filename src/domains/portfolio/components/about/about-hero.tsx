import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";
import { PORTFO_CONFIG } from "../../constants/constants";

export function AboutHero() {
  return (
    <section id="About me" className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="size-96 rounded-full bg-muted/50 blur-3xl dark:bg-muted/20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-5xl">
          <div className="mb-7 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            About Me
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Frontend developer who enjoys turning complex ideas into simple interfaces.
          </h1>

          <div className="mt-8 max-w-3xl space-y-4">
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              I&apos;m Johir Haque, a frontend developer with professional experience building production SaaS
              applications. My work has primarily centered around React and TypeScript, with a strong focus on
              application architecture, data-driven interfaces, and thoughtful user experiences.
            </p>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              My path into web development has been largely self-directed. I learn by building, and I&apos;m currently
              expanding that foundation into full-stack development with Node.js, Express, SQL, and MongoDB.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={PORTFO_CONFIG.SOCIAL.GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium text-card-foreground transition-colors hover:bg-accent"
            >
              <GithubIcon />
              GitHub
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Link
              href={PORTFO_CONFIG.SOCIAL.LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium text-card-foreground transition-colors hover:bg-accent"
            >
              <LinkedinIcon />
              LinkedIn
              <ArrowUpRight className="size-3.5" />
            </Link>

            {/*<Link
              href={`mailto:${PORTFO_CONFIG.SOCIAL.GMAIL}`}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" />
              Get in touch
            </Link>*/}
          </div>
        </div>
      </div>
    </section>
  );
}
