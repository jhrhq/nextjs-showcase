import { type ZodError, z } from "zod";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import type {
  CustomNetworkCollectionNestedPayloadValues,
  CustomNetworkCollectionPayloadValues,
  CustomNetworkCollectionValues,
  CustomNetworkNestedLinkPayloadValues,
  CustomNetworkNestedLinkStatusPayloadValues,
  CustomNetworkNestedLinkValues,
  CustomNetworkPayloadValues,
} from "@/domains/linker/validations/custom-network.validation";
import {
  type InboundData,
  InboundDataSchema,
  type SentenceSelectionPayload,
  SentenceSubmissionPayloadSchema,
  SentenceSuggestionPayloadSchema,
  SuggestedSentenceSchema,
  type SuggestedSentences,
  type SuggestedSentencesPayloadValues,
  TargetUrlPayloadSchema,
  type TargetUrlPayloadValues,
} from "@/domains/linker/validations/inbound.validation";
import {
  type CreateProjectInput,
  createProjectSchema,
  type ProjectDTO,
  type UpdateProjectAPIInput,
  updateProjectApiSchema,
} from "@/domains/linker/validations/projects.validations";
import { db } from "../db/indexdb";
import { getMockInboundData, mockProjects, mockSentenceSuggestions } from "../db/mock";
import { buildNetworkFromUrls } from "../utils";
import {
  type CreateCustomNetworkResponseSchemaValues,
  CustomNetworkCollectionNestedPayloadSchema,
  CustomNetworkCollectionPayloadSchema,
  CustomNetworkNestedLinkPayloadSchema,
  CustomNetworkNestedLinkStatusPayloadSchema,
  CustomNetworkPayloadSchema,
  type createCustomNetworkPayload,
  createCustomNetworkPayloadSchema,
} from "../validations/custom-network.validation";
import { linkerApi } from "./axios-instance";

/*
 *TODO
 * refactor the whole projectsApi
 * * break the projectsApi into different distinct parts
 */

export const projectsApi = {
  getAll: async (): Promise<ProjectDTO[]> => {
    const count = await db.projects.count();
    if (count > 0) return db.projects.toArray();
    await db.projects.bulkPut(mockProjects);
    return mockProjects;
  },

  getById: async (projectId: string): Promise<ProjectDTO> => {
    const cached = await db.projects.get(projectId);
    if (cached) return cached;
    const project = mockProjects.find((p) => p.id === projectId);
    if (!project) throw new Error("Project not found");
    await db.projects.put(project);
    return project;
  },

  create: async (data: CreateProjectInput): Promise<ProjectDTO> => {
    const validationResult = createProjectSchema.safeParse(data);
    if (!validationResult.success) {
      const validationErrors = z.flattenError(validationResult.error);
      throw Object.assign(new Error("Please check your input and try again"), {
        code: "VALIDATION_ERROR",
        errors: validationErrors.fieldErrors as Record<string, string[]>,
      });
    }

    const newProject: ProjectDTO = {
      id: crypto.randomUUID(),
      name: validationResult.data.name,
      domain: validationResult.data.domain,
      description: validationResult.data.description,
      status: "pending" as const,
      totalLinks: 0,
      totalCustomNetworks: 0,
      lastCrawled: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.projects.put(newProject);
    return newProject;
  },

  update: async (data: UpdateProjectAPIInput): Promise<ProjectDTO> => {
    const validationResult = updateProjectApiSchema.safeParse(data);
    if (!validationResult.success) {
      const validationErrors = z.flattenError(validationResult.error);
      throw Object.assign(new Error("Please check your input and try again"), {
        code: "VALIDATION_ERROR",
        errors: validationErrors.fieldErrors as Record<string, string[]>,
      });
    }

    const existing = await db.projects.get(validationResult.data.projectId);
    if (!existing) throw Object.assign(new Error("Project not found"), { code: "NOT_FOUND" });

    const updated: ProjectDTO = {
      ...existing,
      ...validationResult.data,
      updatedAt: new Date().toISOString(),
    };

    await db.projects.put(updated);
    return updated;
  },

  delete: async (projectId: string): Promise<void> => {
    const existing = await db.projects.get(projectId);
    if (!existing) throw Object.assign(new Error("Project not found"), { code: "NOT_FOUND" });
    await db.projects.delete(projectId);
  },
};
export const siteReportApi = {
  getSiteReport: async (projectId: string): Promise<SiteReport> => {
    const cached = await db.siteReports.get(projectId);
    if (cached) return cached;
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.SITE_REPORT}`);
    await db.siteReports.put({ projectId, ...response.data });
    return response.data;
  },
};

export const anchorManagerApi = {
  getAnchorManager: async (projectId: string): Promise<AnchorManager> => {
    const cached = await db.anchorManagers.get(projectId);
    if (cached) return cached;
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}/${AUTH_CONFIG.API.ANCHOR_MANAGER}`);
    await db.anchorManagers.put({ projectId, ...response.data });
    return response.data;
  },
};

export const inboundApi = {
  getInboundSuggestions: async (payload: TargetUrlPayloadValues): Promise<InboundData> => {
    const validationResult = await TargetUrlPayloadSchema.safeParseAsync(payload);
    if (!validationResult.success) {
      throw new Error(formatZodErrors(validationResult.error));
    }
    const mockInboundData = await getMockInboundData(payload);
    const validated = await InboundDataSchema.safeParseAsync(mockInboundData);
    if (!validated.success) {
      throw new Error(formatZodErrors(validated.error));
    }
    return validated.data;
  },
  getSuggestedSentences: async (payload: SuggestedSentencesPayloadValues): Promise<SuggestedSentences> => {
    const validationResult = await SentenceSuggestionPayloadSchema.safeParseAsync(payload);
    if (!validationResult.success) {
      throw new Error(formatZodErrors(validationResult.error));
    }
    const raw = mockSentenceSuggestions[Math.floor(Math.random() * mockSentenceSuggestions.length)] ?? [];
    const dataValidation = await SuggestedSentenceSchema.safeParseAsync(raw);
    if (!dataValidation.success) {
      throw new Error(formatZodErrors(dataValidation.error));
    }
    return dataValidation.data ?? [];
  },
  submitSentence: async (payload: SentenceSelectionPayload): Promise<SentenceSelectionPayload> => {
    const result = await SentenceSubmissionPayloadSchema.safeParseAsync(payload);
    if (!result.success) {
      throw new Error(formatZodErrors(result.error));
    }
    return result.data;
  },
};

export const customNetworkApi = {
  submitCustomNetworkUrls: async (
    formValues: createCustomNetworkPayload
  ): Promise<CreateCustomNetworkResponseSchemaValues> => {
    const result = await createCustomNetworkPayloadSchema.safeParseAsync(formValues);
    if (!result.success) {
      throw new Error(formatZodErrors(result.error));
    }
    const validated = result.data;
    const newNetwork = buildNetworkFromUrls(validated);
    await db.transaction("rw", db.customNetworks, async () => {
      const existing = await db.customNetworks.get(validated.projectId);
      if (existing) {
        await db.customNetworks
          .where("projectId")
          .equals(validated.projectId)
          .modify((record) => {
            record.customNetworks.push(newNetwork);
          });
      } else {
        await db.customNetworks.put({
          projectId: validated.projectId,
          customNetworks: [newNetwork],
        });
      }
    });
    return newNetwork;
  },
  getCustomNetworkStructures: async (
    projectId: string
  ): Promise<{ projectId: string; customNetworks: CreateCustomNetworkResponseSchemaValues[] }> => {
    const cached = await db.customNetworks.get(projectId);
    if (cached) return cached;
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
  updateCustomNetworkNestedLink: async (
    data: CustomNetworkNestedLinkStatusPayloadValues | CustomNetworkNestedLinkPayloadValues
  ) => {
    let validated: CustomNetworkNestedLinkStatusPayloadValues | CustomNetworkNestedLinkPayloadValues;
    if ("anchor" in data) {
      const result = await CustomNetworkNestedLinkPayloadSchema.safeParseAsync(data);
      if (!result.success) {
        throw new Error(formatZodErrors(result.error));
      }
      validated = result.data;
    } else {
      const result = await CustomNetworkNestedLinkStatusPayloadSchema.safeParseAsync(data);
      if (!result.success) {
        throw new Error(formatZodErrors(result.error));
      }
      validated = result.data;
    }
    return await db.transaction("rw", db.customNetworks, async () => {
      const affected = await db.customNetworks
        .where("projectId")
        .equals(data.projectId)
        .modify((record) => {
          const network = record.customNetworks.find((n) => n.id === validated.customNetworkId);
          if (!network) return;
          const collection = network.collections.find((c) => c.id === validated.collectionId);
          if (!collection) return;
          const nested = collection.nestedData.find((n) => n.id === validated.nestedId);
          if (!nested) return;
          if ("status" in validated) {
            nested.status = validated.status;
          }
          if ("anchor" in validated) {
            nested.anchor = validated.anchor;
          }
          collection.state = deriveCollectionState(collection.nestedData);
        });
      if (affected === 0) throw new Error("Record not found");
      return affected;
    });
  },
  removeCustomNetwork: async (data: CustomNetworkPayloadValues) => {
    const result = await CustomNetworkPayloadSchema.safeParseAsync(data);
    if (!result.success) {
      throw new Error(formatZodErrors(result.error));
    }
    const validated = result.data;
    return await db.transaction("rw", db.customNetworks, async () => {
      const affected = await db.customNetworks
        .where("projectId")
        .equals(data.projectId)
        .modify((record) => {
          record.customNetworks = record.customNetworks.filter((n) => n.id !== validated.customNetworkId);
        });
      if (affected === 0) throw new Error("Record not found");
      return affected;
    });
  },
  removeCustomNetworkCollection: async (data: CustomNetworkCollectionPayloadValues) => {
    const result = await CustomNetworkCollectionPayloadSchema.safeParseAsync(data);
    if (!result.success) {
      throw new Error(formatZodErrors(result.error));
    }
    const validated = result.data;
    return await db.transaction("rw", db.customNetworks, async () => {
      const affected = await db.customNetworks
        .where("projectId")
        .equals(validated.projectId)
        .modify((record) => {
          const network = record.customNetworks.find((n) => n.id === validated.customNetworkId);
          if (!network) return;
          network.collections = network.collections.filter((c) => c.id !== validated.collectionId);
        });
      if (affected === 0) throw new Error("Record not found");
      return affected;
    });
  },
  removeCustomNetworkCollectionNestedLink: async (data: CustomNetworkCollectionNestedPayloadValues) => {
    const result = await CustomNetworkCollectionNestedPayloadSchema.safeParseAsync(data);
    if (!result.success) {
      throw new Error(formatZodErrors(result.error));
    }
    const validated = result.data;
    return await db.transaction("rw", db.customNetworks, async () => {
      const affected = await db.customNetworks
        .where("projectId")
        .equals(data.projectId)
        .modify((record) => {
          const network = record.customNetworks.find((n) => n.id === validated.customNetworkId);
          if (!network) return;
          const collection = network.collections.find((c) => c.id === validated.collectionId);
          if (!collection) return;
          const updatedNestedData = collection.nestedData.filter((n) => n.id !== validated.nestedId);
          collection.nestedData = updatedNestedData;
          collection.state = deriveCollectionState(updatedNestedData);
        });
      if (affected === 0) throw new Error("Record not found");
      return affected;
    });
  },
};

type CollectionState = CustomNetworkCollectionValues["state"];

function deriveCollectionState(nestedData: CustomNetworkNestedLinkValues[]): CollectionState {
  const statuses = nestedData.map((n) => n.status);

  if (statuses.every((s) => s === "ACTIVE")) return "Fully Linked";
  if (statuses.every((s) => s === "UNLINKED")) return "Not Started";
  return "In Progress";
}

export const formatZodErrors = (error: ZodError) => {
  return error.issues
    .map((issue) => {
      const field = issue.path.join(".");
      return `${field}: missing or invalid`;
    })
    .join(", ");
};
