import type React from "react";

export interface TechItem {
  name: string;
  icon?: React.ElementType;
}

export interface ProjectHighlight {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface ProjectScreenshots {
  light: string;
  dark: string;
  alt: string;
}

export interface ProjectLinks {
  website?: string;
  github?: string;
  demo?: string;
}

export interface ProjectData {
  title: string;
  badgeLabel: string;
  roleMeta: string;
  description: React.ReactNode[];
  callout?: React.ReactNode;
  links: ProjectLinks;
  screenshots: ProjectScreenshots;
  highlights: ProjectHighlight[];
  technologies: TechItem[];
  previewContent?: React.ReactNode;
}
