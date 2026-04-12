"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useCreateProjectForm } from "@/domains/linker/hooks/use-create-project-form";
import { type CreateProjectInput, createProjectSchema } from "@/domains/linker/validations/projects.validations";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "mock test",
      domain: "https://mock.com",
      description: "This is a mock project to test the create project.",
    },
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  function closeDialog() {
    setOpen(false);
  }

  const { onSubmit, isLoading } = useCreateProjectForm(form, closeDialog);

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader className="mb-4">
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Add a new project to start tracking your SEO links and performance.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Domain"
              name="domain"
              placeholder="https://example.com"
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
          <FormError error={errors.root?.message} />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
