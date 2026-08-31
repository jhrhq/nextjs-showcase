import type { NavbarItem } from "../../types/project.types";

const PROJECTS_NAV_ITEMS: NavbarItem[] = [
  { label: "Home", href: "/", type: "page" },
  { label: "About me", href: "/about", type: "page" },
  { label: "Projects", href: "/projects", type: "page" },
] as const;

const ABOUT_NAV_ITEMS: NavbarItem[] = [
  { label: "Home", href: "/", type: "page" },
  { label: "About me", href: "/about", type: "page" },
  { label: "Profile", href: "#profile", type: "section" },
  { label: "Experience", href: "#experience", type: "section" },
  { label: "Work", href: "#work", type: "section" },
  { label: "Technology", href: "#technology", type: "section" },
  { label: "Education", href: "#education", type: "section" },
  { label: "Learning", href: "#learning", type: "section" },
  { label: "Projects", href: "/projects", type: "page" },
] as const;

const HOME_NAV_ITEMS: NavbarItem[] = [
  { label: "Home", href: "/", type: "section" },
  { label: "Stack", href: "#stack", type: "section" },
  { label: "Featured Projects", href: "#featured-projects", type: "section" },
  { label: "Archive", href: "#archive", type: "section" },
  { label: "Contact", href: "#contact", type: "section" },
  { label: "Projects", href: "/projects", type: "page" },
  { label: "About me", href: "/about", type: "page" },
] as const;

export { ABOUT_NAV_ITEMS, HOME_NAV_ITEMS, PROJECTS_NAV_ITEMS };
