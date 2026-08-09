import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="size-[32rem] rounded-full bg-muted/40 blur-3xl dark:bg-muted/20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Full-Stack Developer
          </div>

          {/* Heading */}
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-8xl">
            Building high-performance
            <br className="hidden sm:block" />
            web applications <span className="text-muted-foreground">with precision.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I&apos;m a self-taught full-stack developer specializing in React, Next.js, and Node.js. I build clean,
            scalable, and production-ready web applications with a strong focus on user experience and engineering
            quality.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore Projects
              <ArrowUpRight className="size-4" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-card-foreground transition-colors hover:bg-accent"
            >
              Get in Touch
            </Link>
          </div>

          {/* Social links */}
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 flex items-center gap-3 text-xs text-muted-foreground">
          <ArrowDown className="size-3" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
