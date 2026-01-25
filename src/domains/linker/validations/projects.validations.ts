import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  domain: z.url("Must be a valid URL"),
  description: z.string().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters").optional(),
  domain: z.url("Must be a valid URL").optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
});

export const projectSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  domain: z.url(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  totalLinks: z.number().int().nonnegative(),
  totalSilos: z.number().int().nonnegative(),
  lastCrawled: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const projectsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectDTO = z.infer<typeof projectSchema>;
