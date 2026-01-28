import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";
import type { BadgeVariant } from "@/types/shared/variants.types";

export type ProjectStatus = ProjectDTO["status"];

export type ProjectStatusVariant = Record<ProjectStatus, BadgeVariant>;
