import { Braces, Code2, Database, FileCode2, Globe, Server, Wind } from "lucide-react";

const technologies = [
  {
    name: "HTML5",
    icon: Globe,
  },
  {
    name: "CSS3",
    icon: FileCode2,
  },
  {
    name: "JavaScript",
    icon: Braces,
  },
  {
    name: "React",
    icon: Code2,
  },
  {
    name: "Next.js",
    icon: Globe,
  },
  {
    name: "Tailwind CSS",
    icon: Wind,
  },
  {
    name: "Node.js",
    icon: Server,
  },
  {
    name: "Databases",
    icon: Database,
  },
];

export function TechStack() {
  return (
    <section id="stack" className="border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
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
