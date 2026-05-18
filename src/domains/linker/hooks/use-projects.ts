"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import {
  anchorManagerApi,
  customNetworkApi,
  inboundApi,
  projectsApi,
  siteReportApi,
} from "@/domains/linker/api/projects";
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
import type {
  SentenceSelectionPayload,
  SuggestedSentencesPayloadValues,
  TargetUrlPayloadValues,
} from "../validations/inbound.validation";

// ==========================================
// QUERY KEY FACTORY
// ==========================================
/**
 * Senior Note: Hierarchical design based on project containment.
 * Everything except the top-level projects list is safely nested under a projectId.
 */
export const linkerKeys = {
  // Global projects list (not inside a project context yet)
  projects: {
    list: () => ["projects", "list"] as const,
  },

  // Scope containing everything happening INSIDE a selected project
  project: (projectId: string) => {
    const base = ["project", projectId] as const;

    return {
      all: () => base,
      detail: () => [...base, "detail"] as const,

      siteReports: {
        detail: () => [...base, "site-reports"] as const,
      },

      anchorManagers: {
        detail: () => [...base, "anchor-managers"] as const,
      },

      inbound: {
        sentenceSuggestions: (payload: SuggestedSentencesPayloadValues) =>
          [...base, "inbound", "suggestions", payload] as const,
      },

      customNetworks: {
        all: () => [...base, "custom-networks"] as const,
        list: () => [...base, "custom-networks", "list"] as const,
        detail: (customNetworkId: string) => [...base, "custom-networks", "detail", customNetworkId] as const,
      },
    };
  },
};

// ==========================================
// PROJECT HOOKS
// ==========================================
export function useProjects() {
  return useQuery({
    queryKey: linkerKeys.projects.list(),
    queryFn: projectsApi.getAll,
  });
}

export function useProject(projectId: string) {
  const projects = useLiveQuery(() => db.projects.toArray(), []);
  const project = projects?.find((p) => p.id === projectId);
  return {
    project,
    isPending: projects === undefined,
  };
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectInput) => projectsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.projects.list() });
    },
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectAPIInput) => projectsApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.projects.list() });
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(id).detail() });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => projectsApi.delete(projectId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.projects.list() });
      // Senior Touch: Wipes out the entire sub-tree for this specific project instantly
      queryClient.removeQueries({ queryKey: linkerKeys.project(variables).all() });
    },
  });
}

// ==========================================
// SITE REPORT & ANCHOR HOOKS
// ==========================================
export function useSiteReport(projectId: string) {
  return useQuery({
    queryKey: linkerKeys.project(projectId).siteReports.detail(),
    queryFn: () => siteReportApi.getSiteReport(projectId),
    enabled: !!projectId,
  });
}

export function useAnchorManager(projectId: string) {
  return useQuery({
    queryKey: linkerKeys.project(projectId).anchorManagers.detail(),
    queryFn: () => anchorManagerApi.getAnchorManager(projectId),
    enabled: !!projectId,
  });
}

// ==========================================
// INBOUND HOOKS
// ==========================================
export function useSubmitInboundUrl() {
  return useMutation({
    mutationFn: (payload: TargetUrlPayloadValues) => inboundApi.getInboundSuggestions(payload),
  });
}

export function useGetSuggestedSentences(payload: SuggestedSentencesPayloadValues, { enabled = true } = {}) {
  const queryClient = useQueryClient();

  const prefetch = React.useCallback(() => {
    // Note: Assuming payload contains your projectId context here to evaluate the root
    queryClient.prefetchQuery({
      queryKey: linkerKeys.project(payload.projectId).inbound.sentenceSuggestions(payload),
      queryFn: () => inboundApi.getSuggestedSentences(payload),
      staleTime: 60_000,
    });
  }, [payload, queryClient]);

  const query = useQuery({
    queryKey: linkerKeys.project(payload.projectId).inbound.sentenceSuggestions(payload),
    queryFn: () => inboundApi.getSuggestedSentences(payload),
    staleTime: 60_000,
    enabled,
  });

  return { ...query, prefetch };
}

export function useSumbitSentence() {
  return useMutation({
    mutationFn: (payload: SentenceSelectionPayload) => inboundApi.submitSentence(payload),
  });
}

// ==========================================
// CUSTOM NETWORK HOOKS
// ==========================================
export function useSumbitCustomNetowrkUrls() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: createCustomNetworkPayload) => customNetworkApi.submitCustomNetworkUrls(payload),
    onSuccess: (data: CreateCustomNetworkResponseSchemaValues) => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(data.projectId).customNetworks.list() });
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(data.projectId).customNetworks.detail(data.id) });

      router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}/${data.projectId}/${AUTH_CONFIG.API.CUSTOM_NETWORK}/${data.id}`);

      toast.success("Updated Successfully", {
        position: "bottom-right",
        classNames: { content: "flex flex-col gap-2" },
        style: { "--border-radius": "calc(var(--radius) + 4px)" } as React.CSSProperties,
      });
    },
  });
}

export function useCustomNetworks(projectId: string) {
  return useQuery({
    queryKey: linkerKeys.project(projectId).customNetworks.list(),
    queryFn: () => customNetworkApi.getCustomNetworks(projectId),
    enabled: !!projectId,
  });
}

export function useCustomNetwork(projectId: string, customNetworkId: string) {
  return useQuery({
    queryKey: linkerKeys.project(projectId).customNetworks.detail(customNetworkId),
    queryFn: () => customNetworkApi.getCustomNetwork(projectId, customNetworkId),
    enabled: !!projectId && !!customNetworkId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
}

export function useUpdateCustomNetworkNestedLink(projectId: string, customNetworkId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CustomNetworkNestedLinkStatusPayloadValues | CustomNetworkNestedLinkPayloadValues) =>
      customNetworkApi.updateCustomNetworkNestedLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.list() });
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.detail(customNetworkId) });
    },
  });
}

export function useRemoveCustomNetwork(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CustomNetworkPayloadValues) => customNetworkApi.removeCustomNetwork(data),
    onSuccess: () => {
      // Invalidate everything custom-network related to this project context safely
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.all() });
    },
  });
}

export function useRemoveCustomNetworkCollection(projectId: string, customNetworkId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CustomNetworkCollectionPayloadValues) => customNetworkApi.removeCustomNetworkCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.list() });
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.detail(customNetworkId) });
    },
  });
}

export function useRemoveCustomNetworkCollectionNestedLink(projectId: string, customNetworkId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CustomNetworkCollectionNestedPayloadValues) =>
      customNetworkApi.removeCustomNetworkCollectionNestedLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.list() });
      queryClient.invalidateQueries({ queryKey: linkerKeys.project(projectId).customNetworks.detail(customNetworkId) });
    },
  });
}
