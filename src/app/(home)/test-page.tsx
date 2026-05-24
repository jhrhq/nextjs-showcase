"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LinkBossCaseStudy from "./case-study";

export default function PortfolioPage() {
  return (
    <main
      className="
      min-h-screen
      bg-background
      text-foreground
      overflow-hidden
      "
    >
      <LinkBossCaseStudy />
      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <header
        className="
        sticky
        top-0
        z-50
        border-b
        border-border/40
        bg-background/70
        backdrop-blur-xl
        "
      >
        <div
          className="
          mx-auto
          flex
          h-16
          max-w-6xl
          items-center
          justify-between
          px-6
          "
        >
          <Link
            href="/"
            className="
            text-sm
            font-medium
            tracking-wide
            transition-opacity
            hover:opacity-80
            "
          >
            rahim.dev
          </Link>

          <nav
            className="
            hidden
            items-center
            gap-8
            md:flex
            "
          >
            {["Projects", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
                "
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section
        className="
        relative
        overflow-hidden
        py-32
        md:py-40
        "
      >
        {/* Glow */}
        <div
          className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[-120px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-violet-500/20
          blur-[120px]
          "
        />

        {/* Grid */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),
          linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)]
          bg-[size:64px_64px]
          "
        />

        <div
          className="
          relative
          mx-auto
          max-w-6xl
          px-6
          "
        >
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="
              mb-6
              rounded-full
              border-border/60
              bg-background/40
              px-4
              py-1
              text-sm
              font-normal
              backdrop-blur-sm
              "
            >
              Frontend Developer
            </Badge>

            <h1
              className="
              text-5xl
              font-bold
              leading-[0.95]
              tracking-tight
              md:text-7xl
              "
            >
              Crafting clean, scalable web experiences.
            </h1>

            <p
              className="
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-muted-foreground
              md:text-xl
              "
            >
              Focused on modern UI systems, polished UX, and production-quality frontend architecture.
            </p>

            <div
              className="
              mt-10
              flex
              flex-wrap
              items-center
              gap-4
              "
            >
              <Button
                size="lg"
                className="
                rounded-full
                px-7
                shadow-lg
                shadow-violet-500/10
                "
              >
                View Projects
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                rounded-full
                border-border/60
                bg-background/40
                px-7
                backdrop-blur-sm
                hover:bg-accent
                "
              >
                GitHub
              </Button>
            </div>

            <div
              className="
              mt-8
              font-mono
              text-sm
              text-muted-foreground
              "
            >
              &gt; currently building cool interfaces
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SELECTED WORK */}
      {/* ===================================================== */}

      <section id="projects" className="py-24">
        <div
          className="
          mx-auto
          max-w-6xl
          px-6
          "
        >
          <div className="mb-12">
            <h2
              className="
              text-3xl
              font-bold
              tracking-tight
              md:text-4xl
              "
            >
              Selected Work
            </h2>

            <p
              className="
              mt-3
              max-w-2xl
              leading-relaxed
              text-muted-foreground
              "
            >
              A large-scale frontend platform focused on reusable architecture, advanced table systems, performant state
              management, and polished UX.
            </p>
          </div>

          <Card
            className="
            group
            overflow-hidden
            rounded-[32px]
            border-border/50
            bg-background/40
            backdrop-blur-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-border
            "
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <div
                className="
                absolute
                inset-0
                z-10
                bg-gradient-to-t
                from-background
                via-background/10
                to-transparent
                "
              />

              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="Linker"
                width={1600}
                height={1000}
                className="
                h-[420px]
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.02]
                "
              />
            </div>

            <CardContent className="p-8 md:p-10">
              <div
                className="
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-start
                lg:justify-between
                "
              >
                {/* LEFT */}
                <div className="max-w-3xl">
                  <Badge
                    className="
                    mb-5
                    rounded-full
                    border-0
                    bg-violet-500/10
                    text-violet-300
                    hover:bg-violet-500/20
                    "
                  >
                    Featured Project
                  </Badge>

                  <h3
                    className="
                    text-3xl
                    font-bold
                    tracking-tight
                    md:text-5xl
                    "
                  >
                    Linker
                  </h3>

                  <p
                    className="
                    mt-5
                    text-lg
                    leading-relaxed
                    text-muted-foreground
                    "
                  >
                    Built complex frontend workflows for handling large datasets, advanced filtering, dynamic tables,
                    reusable UI systems, and scalable state management across the platform.
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  className="
                  rounded-2xl
                  border
                  border-border/50
                  bg-background/50
                  p-5
                  backdrop-blur-sm
                  "
                >
                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-muted-foreground
                    "
                  >
                    Most Important Work
                  </p>

                  <p className="mt-2 font-medium">Enterprise Frontend Platform</p>
                </div>
              </div>

              {/* STACK */}
              <div
                className="
                mt-8
                flex
                flex-wrap
                gap-3
                "
              >
                {["React", "TypeScript", "shadcn/ui", "Zustand", "TanStack Query", "TanStack Table"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="
                    rounded-full
                    border
                    border-border/50
                    bg-background/50
                    px-4
                    py-2
                    text-sm
                    font-normal
                    backdrop-blur-sm
                    "
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* FOOTER */}
              <div
                className="
                mt-10
                flex
                flex-col
                gap-8
                border-t
                border-border/50
                pt-8
                lg:flex-row
                lg:items-center
                lg:justify-between
                "
              >
                {/* METRICS */}
                <div
                  className="
                  grid
                  gap-6
                  sm:grid-cols-3
                  "
                >
                  {[
                    {
                      label: "Architecture",
                      value: "Component-driven",
                    },
                    {
                      label: "Focus",
                      value: "Performance + UX",
                    },
                    {
                      label: "Scale",
                      value: "Enterprise Workflow",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <p
                        className="
                        text-sm
                        text-muted-foreground
                        "
                      >
                        {item.label}
                      </p>

                      <p className="mt-1 font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div
                  className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  "
                >
                  <Button
                    className="
                    rounded-full
                    px-6
                    shadow-lg
                    shadow-violet-500/10
                    "
                  >
                    View Case Study
                  </Button>

                  <Button
                    variant="outline"
                    className="
                    rounded-full
                    border-border/60
                    bg-background/40
                    px-6
                    backdrop-blur-sm
                    hover:bg-accent
                    "
                  >
                    Live Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ABOUT */}
      {/* ===================================================== */}

      <section id="about" className="py-24">
        <div
          className="
          mx-auto
          max-w-6xl
          px-6
          "
        >
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2
                className="
                text-3xl
                font-bold
                tracking-tight
                md:text-4xl
                "
              >
                About
              </h2>

              <p
                className="
                mt-6
                text-lg
                leading-relaxed
                text-muted-foreground
                "
              >
                I build scalable frontend applications with a strong focus on UI architecture, usability, performance,
                and thoughtful interactions.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Frontend",
                  items: ["React", "Next.js", "TypeScript", "Tailwind"],
                },
                {
                  title: "State & Data",
                  items: ["Zustand", "TanStack Query", "TanStack Table"],
                },
              ].map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 font-semibold">{group.title}</h3>

                  <div className="flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="
                        rounded-full
                        border
                        border-border/50
                        bg-background/40
                        px-4
                        py-2
                        text-sm
                        font-normal
                        "
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CONTACT */}
      {/* ===================================================== */}

      <section id="contact" className="py-32">
        <div
          className="
          mx-auto
          max-w-3xl
          px-6
          text-center
          "
        >
          <h2
            className="
            text-4xl
            font-bold
            tracking-tight
            md:text-5xl
            "
          >
            Interested in working together?
          </h2>

          <p
            className="
            mt-5
            text-lg
            leading-relaxed
            text-muted-foreground
            "
          >
            Open to freelance opportunities, collaborations, and frontend-focused product work.
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              className="
              rounded-full
              px-8
              shadow-lg
              shadow-violet-500/10
              "
            >
              Email Me
            </Button>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer
        className="
        border-t
        border-border/50
        py-8
        "
      >
        <div
          className="
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          justify-between
          gap-4
          px-6
          text-sm
          text-muted-foreground
          md:flex-row
          "
        >
          <p>© 2026 Rahim</p>

          <p>Built with Next.js + shadcn/ui</p>
        </div>
      </footer>
    </main>
  );
}
