"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { projectsApi } from "@/domains/linker/api/projects";
import type { CreateProjectInput, UpdateProjectAPIInput } from "@/domains/linker/validations/projects.validations";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { db } from "../db/indexdb";
import type { CreateCustomNetworkResponseSchemaValues } from "../ui/custom-network/custom-network-card";
import type {
  CustomNetworkCollectionNestedPayloadValues,
  CustomNetworkCollectionPayloadValues,
  CustomNetworkNestedLinkPayloadValues,
  CustomNetworkNestedLinkStatusPayloadValues,
  CustomNetworkPayloadValues,
  createCustomNetworkPayload,
} from "../validations/custom-network.validation";
import type { GenerateSentenceSuggestionsRequest, SentenceSelectionPayload } from "../validations/inbound.validation";

/*
 *TODO
 * Add structured query queryKey
 * make them type safe if possible
 */

export function useProjects() {
  const { isFetching, error, isError } = useQuery({
    queryKey: ["linker-projects"],
    queryFn: projectsApi.getAll,
  });

  const projects = useLiveQuery(() => db.projects.toArray(), []);

  return { projects: projects ?? [], isFetching, error, isError };
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
  const { isFetching } = useQuery({
    queryKey: ["linker-site-report", projectId],
    queryFn: () => projectsApi.getSiteReport(projectId),
    enabled: !!projectId,
  });
  const siteReport = useLiveQuery(() => db.siteReports.get(projectId), [projectId]);
  return { siteReport, isFetching: siteReport === undefined || isFetching };
}

export function useAnchorManager(projectId: string) {
  const { isFetching } = useQuery({
    queryKey: ["linker-anchor-manager", projectId],
    queryFn: () => projectsApi.getAnchorManager(projectId),
    enabled: !!projectId,
  });
  const anchorData = useLiveQuery(() => db.anchorManagers.get(projectId), [projectId]);
  return { anchorData, isFetching: anchorData === undefined || isFetching };
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
export function useSumbitSentence() {
  return useMutation({
    mutationKey: ["linker-inbound-sentence-submit"],
    mutationFn: (payload: SentenceSelectionPayload) => projectsApi.submitSentence(payload),
  });
}

export function useSumbitCustomNetowrkUrls() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["linker-custom-network-submit-urls"],
    mutationFn: (payload: createCustomNetworkPayload) => projectsApi.submitCustomNetworkUrls(payload),
    onSuccess: (data: CreateCustomNetworkResponseSchemaValues) => {
      queryClient.invalidateQueries({ queryKey: ["linker-custom-network", data.projectId, data.id] });
      router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}/${data.projectId}/${AUTH_CONFIG.API.CUSTOM_NETWORK}/${data.id}`);

      toast.success("Updated Successfully", {
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });
}

export function useCustomNetworkStructures(projectId: string) {
  const { isFetching } = useQuery({
    queryKey: ["linker-custom-networks", projectId],
    queryFn: () => projectsApi.getCustomNetworkStructures(projectId),
    enabled: !!projectId,
  });

  const data = useLiveQuery(() => db.customNetworks.get(projectId), [projectId]);
  return { data, isFetching: data === undefined || isFetching };
}
export function useCustomNetworkStructure(projectId: string, customNetworkId: string) {
  return useQuery({
    queryKey: ["linker-custom-network", projectId, customNetworkId],
    queryFn: () => projectsApi.getCustomNetworkStructure(projectId, customNetworkId),
    enabled: !!projectId && !!customNetworkId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
}

export function useUpdateCustomNetworkNestedLink(projectId: string, customNetworkId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomNetworkNestedLinkStatusPayloadValues | CustomNetworkNestedLinkPayloadValues) =>
      projectsApi.updateCustomNetworkNestedLink(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["linker-custom-network", projectId, customNetworkId] }),
  });
}

export function useRemoveCustomNetwork(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomNetworkPayloadValues) => projectsApi.removeCustomNetwork(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["linker-custom-network", projectId] }),
  });
}

export function useRemoveCustomNetworkCollection(projectId: string, customNetworkId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomNetworkCollectionPayloadValues) => projectsApi.removeCustomNetworkCollection(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["linker-custom-network", projectId, customNetworkId] }),
  });
}
export function useRemoveCustomNetworkCollectionNestedLink(projectId: string, customNetworkId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomNetworkCollectionNestedPayloadValues) =>
      projectsApi.removeCustomNetworkCollectionNestedLink(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["linker-custom-network", projectId, customNetworkId] }),
  });
}
