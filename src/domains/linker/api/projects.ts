import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import type {
  GenerateSentenceSuggestionsRequest,
  InboundData,
  SentenceSelectionPayload,
  SentenceSuggestions,
} from "@/domains/linker/validations/inbound.validation";
import type {
  CreateProjectInput,
  ProjectDTO,
  UpdateProjectAPIInput,
} from "@/domains/linker/validations/projects.validations";
import { db } from "../db/indexdb";
import type {
  CreateCustomNetworkResponseSchemaValues,
  createCustomNetworkPayload,
} from "../validations/custom-network.validation";
import { linkerApi } from "./axios-instance";

export const projectsApi = {
  getAll: async (): Promise<ProjectDTO[]> => {
    const count = await db.projects.count();

    if (count > 0) {
      return db.projects.toArray();
    }
    const response = await linkerApi.get(AUTH_CONFIG.API.PROJECTS);
    await db.projects.bulkPut(response.data.projects);
    return response.data.projects;
  },

  getById: async (projectId: string): Promise<ProjectDTO> => {
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}`);
    return response.data;
  },

  create: async (data: CreateProjectInput): Promise<ProjectDTO> => {
    const response = await linkerApi.post(AUTH_CONFIG.API.PROJECTS, data);
    return response.data;
  },

  update: async (data: UpdateProjectAPIInput): Promise<ProjectDTO> => {
    const response = await linkerApi.put(`${AUTH_CONFIG.API.PROJECTS}`, data);
    return response.data;
  },

  delete: async (projectId: string): Promise<void> => {
    await linkerApi.delete(`${AUTH_CONFIG.API.PROJECTS}/${projectId}`);
  },

  getSiteReport: async (projectId: string): Promise<SiteReport> => {
    const cached = await db.siteReports.get(projectId);
    if (cached) return cached;

    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.SITE_REPORT}`);
    await db.siteReports.put({ projectId, ...response.data });
    return response.data;
  },

  getAnchorManager: async (projectId: string): Promise<AnchorManager> => {
    const cached = await db.anchorManagers.get(projectId);
    if (cached) return cached;
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}/${AUTH_CONFIG.API.ANCHOR_MANAGER}`);
    await db.anchorManagers.put({ projectId, ...response.data });
    return response.data;
  },

  generateInboundSuggestions: async (projectId: string, url: string): Promise<{ success: true; data: InboundData }> => {
    const response = await linkerApi.post(`${AUTH_CONFIG.API.PROJECTS}/${projectId}/${AUTH_CONFIG.API.INBOUNDS}`, {
      url,
    });
    return response.data;
  },
  generateSentenceSuggestions: async (
    payload: GenerateSentenceSuggestionsRequest
  ): Promise<{ success: true; data: SentenceSuggestions }> => {
    const response = await linkerApi.post(
      `${AUTH_CONFIG.API.PROJECTS}/${payload.projectId}/${AUTH_CONFIG.API.SENTENCES}`,
      payload
    );

    return response.data;
  },

  submitSentence: async (payload: SentenceSelectionPayload): Promise<{ success: true; data: SentenceSuggestions }> => {
    const response = await linkerApi.put(
      `${AUTH_CONFIG.API.PROJECTS}/${payload.projectId}/${AUTH_CONFIG.API.SENTENCES}`,
      payload
    );

    return response.data;
  },
  submitCustomNetworkUrls: async (
    payload: createCustomNetworkPayload
  ): Promise<{ success: true; data: CreateCustomNetworkResponseSchemaValues }> => {
    const response = await linkerApi.post(
      `${AUTH_CONFIG.API.PROJECTS}/${payload.projectId}/${AUTH_CONFIG.API.CUSTOM_NETWORK}`,
      payload
    );

    return response.data;
  },

  getCustomNetworkStructures: async (
    projectId: string
  ): Promise<{ projectId: string; customNetworks: CreateCustomNetworkResponseSchemaValues[] }> => {
    // const cached = await db.customNetwork.get(projectId);
    // if (cached) return cached;

    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.CUSTOM_NETWORK}`);
    await db.customNetworks.put({ projectId, customNetworks: response.data.data });

    return response.data.data;
  },

  getCustomNetworkStructure: async (
    projectId: string,
    customNetworkId: string
  ): Promise<CreateCustomNetworkResponseSchemaValues> => {
    const response = await linkerApi.get(
      `${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.CUSTOM_NETWORK}/${customNetworkId}`
    );
    return response.data.data;
  },

  /*
  getInboundLinks: async (projectId: string): Promise<InboundLink[]> => {
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.INBOUNDS}`);
    return response.data;
  },
 */
};
