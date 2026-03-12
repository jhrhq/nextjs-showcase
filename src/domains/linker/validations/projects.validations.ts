import { z } from "zod";

export const projectSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  domain: z.url(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  totalLinks: z.number().int().nonnegative(),
  totalCustomNetworks: z.number().int().nonnegative(),
  lastCrawled: z.iso.datetime().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const createProjectSchema = z.object({
  name: z.string("Project name must be at least 2 characters").min(2, "Project name must be at least 2 characters"),
  domain: z.url("Must be a valid URL"),
  description: z
    .string("Project description must be at least 10 characters")
    .min(10, "Project description must be at least 10 characters"),
});

export const updateProjectSchema = z
  .object({
    name: z.string().min(2, "Project name must be at least 2 characters").optional(),
    description: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val))
      .pipe(z.string().min(10, "Description must be at least 10 characters").optional()),
    status: z.enum(["active", "inactive", "pending"]).optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided",
  });

export const updateProjectApiSchema = updateProjectSchema.extend({
  projectId: z.string(),
});

export const projectsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type UpdateProjectAPIInput = z.infer<typeof updateProjectApiSchema>;
export type ProjectDTO = z.infer<typeof projectSchema>;
