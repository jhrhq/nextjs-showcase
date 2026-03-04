"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { projectsApi } from "@/domains/linker/api/projects";
import type { CreateProjectInput, UpdateProjectAPIInput } from "@/domains/linker/validations/projects.validations";
import type { GenerateSentenceSuggestionsRequest } from "../validations/inbound.validation";

export function useProjects() {
  return useQuery({
    queryKey: ["linker-projects"],
    queryFn: projectsApi.getAll,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["linker-project", id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectInput) => projectsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linker-projects"] });
    },
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectAPIInput) => projectsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linker-projects"] });
      queryClient.invalidateQueries({ queryKey: ["linker-project", id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linker-projects"] });
    },
  });
}

export function useSiteReport(projectId: string) {
  return useQuery({
    queryKey: ["linker-site-report", projectId],
    queryFn: () => projectsApi.getSiteReport(projectId),
    enabled: !!projectId,
  });
}

export function useAnchorManager(projectId: string) {
  return useQuery({
    queryKey: ["linker-anchor-manager", projectId],
    queryFn: () => projectsApi.getAnchorManager(projectId),
    enabled: !!projectId,
  });
}

export function useSubmitInboundUrl() {
  return useMutation({
    mutationKey: ["linker-inbound-url"],
    mutationFn: ({ projectId, url }: { projectId: string; url: string }) =>
      projectsApi.generateInboundSuggestions(projectId, url),
  });
}
export function useGenerateSentenceSuggestions(payload: GenerateSentenceSuggestionsRequest, { enabled = true } = {}) {
  const queryClient = useQueryClient();
  const prefetch = React.useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["linker-inbound-sentence-suggestions", payload],
      queryFn: () => projectsApi.generateSentenceSuggestions(payload),
      staleTime: 60_000,
    });
  }, [payload, queryClient.prefetchQuery]);

  const query = useQuery({
    queryKey: ["linker-inbound-sentence-suggestions"],
    queryFn: () => projectsApi.generateSentenceSuggestions(payload),
    staleTime: 60_000,
    enabled,
  });

  return { ...query, prefetch };
}
/* 

export function useSiloStructure(projectId: string) {
  return useQuery({
    queryKey: ["linker-silo", projectId],
    queryFn: () => projectsApi.getSiloStructure(projectId),
    enabled: !!projectId,
  });
}



 */
