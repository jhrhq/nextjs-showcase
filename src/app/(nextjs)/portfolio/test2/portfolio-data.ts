import { Database } from "lucide-react";
import { CssIcon, HtmlIcon, NextjsIcon, NodejsIcon, ReactIcon, TailwindIcon, ViteIcon } from "@/ui/shared/icons";

export type ProjectCategory = "Next.js" | "React/Vite" | "HTML/CSS Labs";

export interface ProjectTechnology {
  name: string;
  icon: React.ElementType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  featured?: boolean;
  size?: "large" | "medium";
  technologies: ProjectTechnology[];
  demo?: string;
  github?: string;
  image?: string;
  roleLabel?: string;
}

export const projects: Project[] = [
  {
    id: "hotel-booking",
    title: "Hotel Booking Platform",
    description:
      "A full-stack booking platform for discovering properties, checking availability and completing reservations.",
    category: "Next.js",
    featured: true,
    technologies: [
      {
        name: "Next.js",
        icon: NextjsIcon,
      },
      {
        name: "Node.js",
        icon: NodejsIcon,
      },
      {
        name: "MongoDB",
        icon: Database,
      },
    ],
    demo: "#",
    github: "#",
  },

  {
    id: "saas-platform",
    title: "SaaS Platform",
    description:
      "Independently designed and built the complete frontend architecture from the ground up, managing complex application state, performance optimization, and seamless API integrations.",
    category: "Next.js",
    featured: true,
    size: "medium",
    technologies: [
      {
        name: "Next.js",
        icon: NextjsIcon,
      },
      {
        name: "Node.js",
        icon: NodejsIcon,
      },
      {
        name: "PostgreSQL",
        icon: Database,
      },
    ],
    demo: "#",
    github: "#",
    roleLabel: "Commercial SaaS Product (Previous Role)",
  },

  {
    id: "blog",
    title: "Developer Blog",
    description: "A minimal content-focused blog built around a modern Next.js architecture.",
    category: "Next.js",
    technologies: [
      {
        name: "Next.js",
        icon: NextjsIcon,
      },
      {
        name: "Tailwind",
        icon: TailwindIcon,
      },
    ],
    demo: "#",
    github: "#",
  },

  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description: "A responsive React dashboard focused on reusable components and data visualization.",
    category: "React/Vite",
    technologies: [
      {
        name: "React",
        icon: ReactIcon,
      },
      {
        name: "Vite",
        icon: ViteIcon,
      },
    ],
    demo: "#",
    github: "#",
  },

  {
    id: "course-app",
    title: "Online Courses",
    description: "A course browsing application built while exploring reusable React component patterns.",
    category: "React/Vite",
    technologies: [
      {
        name: "React",
        icon: ReactIcon,
      },
      {
        name: "Vite",
        icon: ViteIcon,
      },
    ],
    demo: "#",
    github: "#",
  },

  {
    id: "venue",
    title: "The Venue",
    description: "A responsive event website exploring modern layouts, typography and interaction patterns.",
    category: "React/Vite",
    technologies: [
      {
        name: "React",
        icon: ReactIcon,
      },
      {
        name: "CSS",
        icon: CssIcon,
      },
    ],
    demo: "#",
    github: "#",
  },

  {
    id: "html-labs",
    title: "HTML & CSS Experiments",
    description: "A collection of foundational frontend experiments exploring layouts, typography and responsive CSS.",
    category: "HTML/CSS Labs",
    technologies: [
      {
        name: "HTML",
        icon: HtmlIcon,
      },
      {
        name: "CSS",
        icon: CssIcon,
      },
    ],
    demo: "#",
    github: "#",
  },
];
