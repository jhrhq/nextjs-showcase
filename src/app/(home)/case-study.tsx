"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function LinkBossCaseStudy() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-medium hover:opacity-70 transition">
            ← Back
          </Link>

          <span className="text-sm text-muted-foreground">Case Study</span>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* glow */}
        <div className="pointer-events-none absolute -right-50 -top-50 h-125 w-125 rounded-full bg-violet-500/25 blur-[140px]" />

        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                  SaaS Platform
                </Badge>

                <Badge variant="secondary" className="rounded-full">
                  Solo Frontend Engineer
                </Badge>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              LinkBoss Frontend Platform
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              I built the entire frontend application from scratch for a production SaaS platform focused on AI-powered
              internal linking and SEO automation.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Button className="rounded-full px-6">Visit App</Button>

              <Button variant="outline" className="rounded-full">
                Marketing Site
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-3">
          {[
            { label: "Role", value: "Solo Frontend Engineer" },
            { label: "Stack", value: "React, TS, shadcn, Zustand, TanStack" },
            { label: "Type", value: "Production SaaS Dashboard" },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= IMAGES ================= */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6 space-y-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden border-border/50 bg-background/40">
                <Image
                  src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop`}
                  alt="LinkBoss UI"
                  width={1600}
                  height={900}
                  className="w-full object-cover hover:scale-[1.02] transition duration-700"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ENGINEERING ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold">Engineering Highlights</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Scalable Architecture",
                desc: "Feature-based structure designed for large SaaS systems.",
              },
              {
                title: "Complex Tables",
                desc: "TanStack Table with filtering, pagination, and large datasets.",
              },
              {
                title: "State Management",
                desc: "Zustand for UI state + TanStack Query for server caching.",
              },
              {
                title: "Design System",
                desc: "Consistent UI using shadcn/ui + Tailwind tokens.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-border/50 bg-background/40"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold">Impact</h2>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-6 space-y-3 text-muted-foreground"
          >
            {[
              "Built full production SaaS frontend from scratch",
              "Handled complex SEO workflows and large datasets",
              "Improved scalability and UI consistency",
              "Delivered enterprise-grade frontend architecture",
            ].map((item) => (
              <motion.li key={item} variants={fadeUp}>
                • {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold">Built from scratch as a solo frontend engineer</h2>

            <p className="mt-6 text-muted-foreground">
              LinkBoss represents real-world SaaS engineering — not a demo project, but a production system designed for
              scale.
            </p>

            <Button className="mt-10 rounded-full px-8">Visit Live App</Button>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
          <p>© 2026 Your Name</p>
          <p>Built with Next.js + shadcn/ui + Framer Motion</p>
        </div>
      </footer>
    </main>
  );
}
