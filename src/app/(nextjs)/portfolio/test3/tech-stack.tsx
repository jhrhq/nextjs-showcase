import { CssIcon, HtmlIcon, JavascriptIcon, NextjsIcon, ReactIcon, TailwindIcon, ViteIcon } from "@/ui/shared/icons";

const technologies = [
  {
    name: "HTML5",
    icon: HtmlIcon,
  },
  {
    name: "CSS3 / SCSS",
    icon: CssIcon,
  },
  {
    name: "JavaScript",
    icon: JavascriptIcon,
  },
  {
    name: "React",
    icon: ReactIcon,
  },
  {
    name: "Next.js",
    icon: NextjsIcon,
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
  },
  {
    name: "Vite",
    icon: ViteIcon,
  },
];
export function TechStack() {
  return (
    <section id="stack" className="border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {technologies.map((technology) => {
            const Icon = technology.icon;

            return (
              <div
                key={technology.name}
                className="group flex h-28 flex-col items-center justify-center gap-3 border-b border-r border-border text-muted-foreground transition-colors hover:bg-card hover:text-foreground lg:border-b-0"
              >
                <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />

                <span className="text-xs font-medium">{technology.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
