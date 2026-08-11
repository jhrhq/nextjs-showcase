export const PROJECT_TECHNOLOGIES = [
  "Next.js",
  "React",
  "Vanilla JS",
  "TypeScript",
  "JavaScript",
  "Database",
  "API",
  "TanStack Query",
  "TanStack Table",
  "CSS",
  "TailwindCSS",
  "Bootstrap",
  "SCSS",
] as const;

export type ProjectTechnology = (typeof PROJECT_TECHNOLOGIES)[number];

export type Project = {
  id: string;
  title: string;
  description: string;
  img: string;
  category: "Nextjs" | "React" | "HTML / CSS" | "Vanilla JavaScript";
  technologies: ProjectTechnology[];
  live: string;
  github?: string;
};
