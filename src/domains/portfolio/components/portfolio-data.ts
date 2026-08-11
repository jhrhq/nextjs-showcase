import { Layers } from "lucide-react";
import type { ElementType } from "react";
import {
  AxiosIcon,
  BetterAuthIcon,
  HtmlIcon,
  JavascriptIcon,
  MongodbIcon,
  MongooseIcon,
  NextjsIcon,
  NodejsIcon,
  ReactIcon,
  ShadcnIcon,
  StripeIcon,
  TailwindIcon,
  TanstackQueryIcon,
  TypescriptIcon,
} from "@/ui/shared/icons";
import { PORTFO_CONFIG } from "../constants/constants";
import type { ProjectScreenshots } from "../types/project.types";

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
  screenshots: ProjectScreenshots;
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
    screenshots: {
      light: "",
      dark: "",
      alt: "",
    },
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
        name: "React",
        icon: ReactIcon,
      },
      {
        name: "Tailwind CSS",
        icon: TailwindIcon,
      },
      {
        name: "Shadcn",
        icon: ShadcnIcon,
      },
      {
        name: "Better Auth",
        icon: BetterAuthIcon,
      },
      {
        name: "Stripe",
        icon: StripeIcon,
      },
      {
        name: "Node.js",
        icon: NodejsIcon,
      },
      {
        name: "MongoDB",
        icon: MongodbIcon,
      },
      {
        name: "Mongoose",
        icon: MongooseIcon,
      },
    ],
    demo: PORTFO_CONFIG.PROJECTS.HOTEL_BOOKING,
    github: PORTFO_CONFIG.PROJECTS_GITHUB.HOTEL_BOOKING,
    screenshots: {
      light: "/portfolio/hotel-booking-light.png",
      dark: "/portfolio/hotel-booking-dark.png",
      alt: "Hotel Booking Platform",
    },
  },

  {
    id: "Movies",
    title: "Movies",
    description:
      "Explore millions of movies, TV shows, and cast details powered by TMDB. Compare 3 movies side by side. Add movies to watch later list.",
    category: "Next.js",
    featured: true,
    screenshots: {
      light: "/portfolio/movies-light.png",
      dark: "/portfolio/movies-dark.png",
      alt: "Linkboss SaaS application interface preview",
    },
    technologies: [
      {
        name: "Next.js",
        icon: NextjsIcon,
      },
      { name: "React", icon: ReactIcon },
      { name: "TypeScript", icon: TypescriptIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "Axios", icon: AxiosIcon },
      { name: "Shadcn", icon: ShadcnIcon },
      { name: "Tanstack Query", icon: TanstackQueryIcon },
      { name: "MongoDB", icon: MongodbIcon },
    ],
    demo: PORTFO_CONFIG.PROJECTS.MOVIES,
    github: PORTFO_CONFIG.PROJECTS_GITHUB.MOVIES,
  },
];

export const archiveStats = [
  {
    count: 19,
    label: "React / Vite Apps",
    icon: ReactIcon,
  },
  {
    count: 8,
    label: "JavaScript Projects",
    icon: JavascriptIcon,
  },
  {
    count: 9,
    label: "HTML / CSS / SCSS Builds",
    icon: HtmlIcon,
  },
];

export const totalArchiveProjects = 36;
