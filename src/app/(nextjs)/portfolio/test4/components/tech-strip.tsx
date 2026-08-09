import { CssIcon, HtmlIcon, JavascriptIcon, NextjsIcon, ReactIcon, TailwindIcon, ViteIcon } from "@/ui/shared/icons";

const TECHS = [
  { label: "HTML5", Icon: HtmlIcon },
  { label: "CSS3 / SCSS", Icon: CssIcon },
  { label: "JavaScript", Icon: JavascriptIcon },
  { label: "React", Icon: ReactIcon },
  { label: "Next.js", Icon: NextjsIcon },
  { label: "Tailwind CSS", Icon: TailwindIcon },
  { label: "Vite", Icon: ViteIcon },
];

function Pill({ label, Icon }: { label: string; Icon: React.FC<{ size?: number; className?: string }> }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-foreground whitespace-nowrap shrink-0 select-none">
      <Icon size={14} className="text-accent" />
      {label}
    </span>
  );
}

export function TechStrip() {
  return (
    <section id="stack" className="border-y border-border bg-secondary py-5 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-track flex items-center gap-3 w-max">
          {TECHS.map((t, i) => (
            <Pill key={i} label={t.label} Icon={t.Icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
