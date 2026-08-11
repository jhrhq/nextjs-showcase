import { Database, ShoppingBag } from "lucide-react";
import { CssIcon, HtmlIcon, NextjsIcon, NodejsIcon, ReactIcon, ViteIcon } from "@/ui/shared/icons";

export type ProjectCategory = "Next.js" | "React/Vite" | "HTML/CSS";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: {
    name: string;
    icon: React.ElementType;
  }[];
  href?: string;
  github?: string;
  featured?: boolean;
  size?: "large" | "medium" | "small";
  roleLabel?: string;
}

export const featuredProjects: Project[] = [
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
    github: "#",
    roleLabel: "Commercial SaaS Product (Previous Role)",
  },
  {
    id: "hotel-booking",
    title: "Hotel Booking Platform",
    description:
      "A full-stack hotel booking experience with property discovery, availability, booking flows and reviews.",
    category: "Next.js",
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
    featured: true,
    size: "medium",
  },
];

export const projects: Project[] = [
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description: "A responsive analytics dashboard focused on data visualization and reusable React components.",
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
    size: "medium",
  },
  {
    id: "ecommerce",
    title: "E-commerce UI",
    description: "A modern shopping interface with product cards, filtering and responsive layouts.",
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
      {
        name: "UI",
        icon: ShoppingBag,
      },
    ],
    size: "medium",
  },
  {
    id: "course-app",
    title: "Online Courses",
    description: "A course browsing experience built while exploring reusable React component patterns.",
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
    size: "medium",
  },
  {
    id: "venue",
    title: "The Venue",
    description: "A responsive event and venue landing page rebuilt using modern React patterns.",
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
    size: "medium",
  },
  {
    id: "blog",
    title: "Blog Practice",
    description: "A typography-focused blog interface exploring semantic HTML and responsive CSS.",
    category: "HTML/CSS",
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
    size: "medium",
  },
  {
    id: "landing-page",
    title: "Landing Page Collection",
    description: "A collection of responsive landing pages created while experimenting with CSS layouts.",
    category: "HTML/CSS",
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
    size: "medium",
  },
];

export const labs = [
  {
    year: "2026",
    title: "Responsive CSS Experiments",
    description: "Container queries, subgrid and modern responsive layouts.",
  },
  {
    year: "2025",
    title: "CSS Grid Collection",
    description: "Experiments with grid systems, cards and editorial layouts.",
  },
  {
    year: "2024",
    title: "Bootstrap Practice",
    description: "Early responsive UI experiments using Bootstrap.",
  },
  {
    year: "2023",
    title: "HTML & CSS Fundamentals",
    description: "Small interfaces built while learning frontend fundamentals.",
  },
];
