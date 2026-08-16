import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { PORTFO_CONFIG } from "@/domains/portfolio/constants/constants";
import { CopyToClipboardWithCustom } from "@/ui/shared/copy-to-clipboard";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="size-96 rounded-full bg-muted/50 blur-3xl dark:bg-muted/20" />
      </div>

      <div className="pb-24 pt-24 sm:pt-32 lg:pb-36 lg:pt-40">
        <div className="max-w-5xl">
          {/* Eyebrow */}

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Frontend Developer
          </div>

          {/* Heading */}

          <div className="space-y-4">
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-8xl">
              Building thoughtful web applications.
            </h1>

            <p className="text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">
              React · Next.js · Modern Frontend Architecture
            </p>
          </div>

          {/* Experience statement */}

          <p className="mt-8 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I spent 3 years as the sole frontend developer for a production SaaS platform, owning its architecture, UI,
            data flows, and API-driven workflows from the ground up.
          </p>

          {/* Supporting statement */}

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Self-taught and product-minded, I enjoy turning complex requirements into intuitive interfaces and
            maintainable frontend systems.
          </p>

          {/* Actions */}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#featured-projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore Flagship Work
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
              href={PORTFO_CONFIG.SOCIAL.GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon />
            </Link>

            <Link
              href={PORTFO_CONFIG.SOCIAL.LINKEDIN}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon />
            </Link>

            <span className="text-muted-foreground transition-colors hover:text-foreground">
              <CopyToClipboardWithCustom
                value={PORTFO_CONFIG.SOCIAL.GMAIL}
                label="Copy email address"
                copiedLabel="Email copied!"
                icon={<Mail className="size-7 stroke-2" />}
              />
            </span>
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
