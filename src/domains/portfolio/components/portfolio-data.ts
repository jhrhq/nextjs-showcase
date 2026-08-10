import { Database, Layers } from "lucide-react";
import type { ElementType } from "react";
import {
  CssIcon,
  HtmlIcon,
  JavascriptIcon,
  NextjsIcon,
  NodejsIcon,
  ReactIcon,
  TailwindIcon,
  ViteIcon,
} from "@/ui/shared/icons";

export type ProjectCategory = "Next.js" | "React/Vite" | "JavaScript" | "HTML/CSS/SCSS";

export interface ProjectTechnology {
  name: string;
  icon: ElementType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  featured?: boolean;
  commercial?: boolean;
  roleLabel?: string;
  technologies: ProjectTechnology[];
  demo?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "flagship-saas",
    title: "SaaS Platform",
    description:
      "A production-grade commercial SaaS frontend independently designed and built from the ground up. The architecture was recreated as a streamlined client-side Next.js experience with complex state management, performance optimization, and seamless API integrations.",
    category: "Next.js",
    featured: true,
    commercial: true,
    roleLabel: "Commercial SaaS Product · Previous Role",
    technologies: [
      {
        name: "Next.js",
        icon: NextjsIcon,
      },
      {
        name: "React",
        icon: ReactIcon,
      },
      {
        name: "Node.js",
        icon: NodejsIcon,
      },
      {
        name: "API Integration",
        icon: Layers,
      },
    ],
    demo: "#",
    github: "#",
  },

  {
    id: "hotel-booking",
    title: "Hotel Booking Platform",
    description:
      "A full-stack booking experience covering property discovery, availability, guest management, booking workflows, and responsive interfaces.",
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
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "A responsive React application focused on reusable UI architecture, data visualization, and dashboard interaction patterns.",
    category: "React/Vite",
    featured: true,
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
    id: "online-courses",
    title: "Online Courses",
    description: "A React-based course browsing experience built around reusable components and responsive layouts.",
    category: "React/Vite",
    featured: true,
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
    id: "the-venue",
    title: "The Venue",
    description:
      "A responsive event website exploring layout systems, typography, animations, and frontend interactions.",
    category: "React/Vite",
    featured: true,
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
    id: "developer-blog",
    title: "Developer Blog",
    description: "A minimal content-focused blog exploring modern React and Next.js patterns.",
    category: "Next.js",
    technologies: [
      {
        name: "Next.js",
        icon: NextjsIcon,
      },
      {
        name: "Tailwind CSS",
        icon: TailwindIcon,
      },
    ],
    demo: "#",
    github: "#",
  },
];

export const archiveStats = [
  {
    count: "22",
    label: "React / Vite Apps",
    icon: ReactIcon,
  },
  {
    count: "8",
    label: "JavaScript Projects",
    icon: JavascriptIcon,
  },
  {
    count: "11",
    label: "HTML / CSS / SCSS Builds",
    icon: HtmlIcon,
  },
];

export const totalArchiveProjects = 41;
