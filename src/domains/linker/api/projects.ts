import type { InboundLink, LinksReport, SiloStructure, SiteReport } from "@/domains/linker/types/project.types";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";
import { linkerApi } from "./axios-instance";

export const projectsApi = {
  getAll: async (): Promise<ProjectDTO[]> => {
    const response = await linkerApi.get("/projects");
    return response.data;
  },

  getById: async (id: string): Promise<ProjectDTO> => {
    const response = await linkerApi.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data: Partial<ProjectDTO>): Promise<ProjectDTO> => {
    const response = await linkerApi.post("/projects", data);
    return response.data;
  },

  update: async (id: string, data: Partial<ProjectDTO>): Promise<ProjectDTO> => {
    const response = await linkerApi.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await linkerApi.delete(`/projects/${id}`);
  },

  getInboundLinks: async (projectId: string): Promise<InboundLink[]> => {
    const response = await linkerApi.get(`/projects/${projectId}/inbound`);
    return response.data;
  },

  getSiloStructure: async (projectId: string): Promise<SiloStructure[]> => {
    const response = await linkerApi.get(`/projects/${projectId}/silo`);
    return response.data;
  },

  getLinksReport: async (projectId: string): Promise<LinksReport[]> => {
    const response = await linkerApi.get(`/projects/${projectId}/links-report`);
    return response.data;
  },

  getSiteReport: async (projectId: string): Promise<SiteReport> => {
    const response = await linkerApi.get(`/projects/${projectId}/site-report`);
    return response.data;
  },
};
