import { ProjectCard } from "@/domains/linker/ui/dashboard/project-card";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";

type ProjectGridProps = {
  projects: ProjectDTO[];
  onEdit: (project: ProjectDTO) => void;
  onDelete: (id: string) => void;
};
export function ProjectGrid({ projects, onEdit, onDelete }: ProjectGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
