"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { useUpdateProject } from "@/domains/linker/hooks/use-projects";
import { useUpdateProjectForm } from "@/domains/linker/hooks/use-update-project-form";
import {
  type ProjectDTO,
  type UpdateProjectInput,
  updateProjectSchema,
} from "@/domains/linker/validations/projects.validations";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";

type ProjectUpdateFormProps = {
  project: ProjectDTO;
};

export default function ProjectUpdateForm({ project }: ProjectUpdateFormProps) {
  const updateProject = useUpdateProject(project.id);

  const form = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project?.name,
      description: project?.description,
      // status: project?.status,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { onSubmit, isLoading: projectUpdateLoading } = useUpdateProjectForm(form);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <FormFieldWrapper
          control={control}
          label="Project Name"
          name="name"
          placeholder="My Awesome Project"
          autoComplete="off"
          required={true}
          // startAddon={<Mail />}
        />
        <FormFieldWrapper
          control={control}
          label="Description"
          name="description"
          placeholder="Brief description of your project (optional)"
          autoComplete="off"
          required={true}
          as="textarea"
          // startAddon={<Mail />}
        />
      </FieldGroup>
      {/* General Error */}
      <FieldError errors={[errors.root]} />

      <Button type="submit" disabled={projectUpdateLoading}>
        {updateProject.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}
