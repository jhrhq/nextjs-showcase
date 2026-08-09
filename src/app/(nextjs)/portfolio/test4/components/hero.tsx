import { ArrowRight, Code2, Mail, Terminal } from "lucide-react";

/* Syntax-highlighted pseudo-code for the terminal panel */
function TerminalCard() {
  return (
    <div className="terminal-card font-mono text-sm leading-relaxed">
      {/* Traffic-light bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
        <span className="ml-3 text-xs text-muted-foreground">useSaasDashboard.ts</span>
      </div>

      {/* Code body */}
      <div className="p-5 space-y-1 text-foreground">
        <p>
          <span className="syn-keyword">import</span> <span className="syn-str">&lsquo;server-only&rsquo;</span>
        </p>
        <p className="pt-1 syn-comment">{"// Production SaaS – 40k+ lines, 3 regions"}</p>
        <p className="pt-1">
          <span className="syn-keyword">export</span> <span className="syn-keyword">async</span>{" "}
          <span className="syn-keyword">function</span> <span className="syn-fn">fetchDashboard</span>
          {"("}
          <span className="syn-prop">userId</span>
          {": "}
          <span className="syn-tag">string</span>
          {")"}
        </p>
        <p className="pl-4 syn-comment">{"// dynamic, edge-cached, streamed"}</p>
        <p className="pl-4">
          <span className="syn-keyword">const</span> <span className="syn-prop">data</span> {"= "}
          <span className="syn-keyword">await</span> <span className="syn-fn">db</span>
          {"."}
          <span className="syn-fn">query</span>
          {"({ "}
          <span className="syn-prop">userId</span>
          {", "}
          <span className="syn-prop">cache</span>
          {": "}
          <span className="syn-str">&lsquo;force-cache&rsquo;</span>
          {" })"}
        </p>
        <p className="pl-4">
          <span className="syn-keyword">return</span> <span className="syn-fn">buildResponse</span>
          {"("}
          <span className="syn-prop">data</span>
          {", "}
          <span className="syn-prop">userId</span>
          {")"}
        </p>
        <p className="pt-2">
          <span className="syn-keyword">const</span> <span className="syn-prop">Component</span>
          {" = () => ("}
        </p>
        <p className="pl-4">
          {"<"}
          <span className="syn-tag">Suspense</span> <span className="syn-prop">fallback</span>
          {"={<"}
          <span className="syn-tag">Skeleton</span>
          {" />}>"}
        </p>
        <p className="pl-8">
          {"<"}
          <span className="syn-tag">Dashboard</span> <span className="syn-prop">data</span>
          {"={"}
          <span className="syn-fn">data</span>
          {"} />"}
        </p>
        <p className="pl-4">
          {"</"}
          <span className="syn-tag">Suspense</span>
          {">"}
        </p>
        <p>{")"}</p>
      </div>

      {/* Footer bar */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal size={11} />
          <span>Next.js 15 · App Router · TypeScript</span>
        </div>
        <span className="text-xs text-accent font-medium">▲ Production</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-bg py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-8">
              <Code2 size={12} className="text-accent" />
              Frontend Developer · Self-Taught · Remote
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight mb-5">
              Crafting interfaces that{" "}
              <span className="relative">
                perform
                <span aria-hidden className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent opacity-60" />
              </span>{" "}
              at scale
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Specialising in <strong className="text-foreground font-semibold">React</strong>,{" "}
              <strong className="text-foreground font-semibold">Next.js</strong>, and{" "}
              <strong className="text-foreground font-semibold">high-performance</strong> web applications — from
              production SaaS frontends to polished micro-UIs. Over 40 shipped projects and counting.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Explore Flagship Work
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold hover:bg-secondary transition-colors duration-200"
              >
                <Mail size={15} />
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right — terminal card */}
          <div className="hidden lg:block">
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
