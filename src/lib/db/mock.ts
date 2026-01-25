import { hash } from "bcryptjs";

import { type ProjectDTO, projectSchema } from "@/domains/linker/validations/projects.validations";

export type MockUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "Mock User",
    passwordHash: await hash("password123", 10),
  },
];

const now = () => new Date().toISOString();

export const mockProjects: ProjectDTO[] = [
  {
    id: crypto.randomUUID(),
    name: "TechCorp Website",
    domain: "https://techcorp.com",
    description: "Main corporate website",
    status: "active",
    totalLinks: 1250,
    totalSilos: 8,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: crypto.randomUUID(),
    name: "E-commerce Store",
    domain: "https://mystore.com",
    description: "Online retail platform",
    status: "active",
    totalLinks: 3420,
    totalSilos: 15,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: crypto.randomUUID(),
    name: "Blog Platform",
    domain: "https://myblog.com",
    description: "Content publishing site",
    status: "inactive",
    totalLinks: 890,
    totalSilos: 5,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: crypto.randomUUID(),
    name: "Portfolio Site",
    domain: "https://johndesigner.com",
    description: "Personal portfolio website",
    status: "pending",
    totalLinks: 45,
    totalSilos: 2,
    lastCrawled: null,
    createdAt: now(),
    updatedAt: now(),
  },
];

export function getProjects(_useId: string, limit?: number): ProjectDTO[] {
  const validated = mockProjects.map((p) => projectSchema.parse(p));
  return limit ? validated.slice(0, limit) : validated;
}
