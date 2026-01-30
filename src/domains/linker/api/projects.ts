import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
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

  getLinksReport: async (projectId: string): Promise<LinksReport[]> => {
    const response = await linkerApi.get(
      `${AUTH_CONFIG.API.PROJECTS}/${projectId}/${projectId}${AUTH_CONFIG.API.LINKS_REPORT}`
    );
    return response.data;
  },

  getSiteReport: async (projectId: string): Promise<SiteReport> => {
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.SITE_REPORT}`);
    return response.data;
  },
 */
};
