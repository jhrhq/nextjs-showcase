import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import type {
  GenerateSentenceSuggestionsRequest,
  InboundData,
  SentenceSuggestions,
} from "@/domains/linker/validations/inbound.validation";
import type {
  CreateProjectInput,
  ProjectDTO,
  UpdateProjectAPIInput,
} from "@/domains/linker/validations/projects.validations";
import { linkerApi } from "./axios-instance";

export const projectsApi = {
  getAll: async (): Promise<ProjectDTO[]> => {
    const response = await linkerApi.get(AUTH_CONFIG.API.PROJECTS);
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
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.SITE_REPORT}`);
    return response.data;
  },

  getAnchorManager: async (projectId: string): Promise<AnchorManager> => {
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}/${AUTH_CONFIG.API.ANCHOR_MANAGER}`);
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
  /* 
  
  getInboundLinks: async (projectId: string): Promise<InboundLink[]> => {
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.INBOUNDS}`);
    return response.data;
  },

  getSiloStructure: async (projectId: string): Promise<SiloStructure[]> => {
    const response = await linkerApi.get(
      `${AUTH_CONFIG.API.PROJECTS}/${projectId}/${projectId}${AUTH_CONFIG.API.SILO}`
    );
    return response.data;
  },

 
 */
};
