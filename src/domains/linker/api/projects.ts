import type { ZodError } from "zod";
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
    formValues: createCustomNetworkPayload
  ): Promise<CreateCustomNetworkResponseSchemaValues> => {
    const result = await createCustomNetworkPayloadSchema.safeParseAsync(formValues);

    if (!result.success) {
      throw new Error(formatZodErrors(result.error));
    }

    const validated = result.data;

    // build the structure client side
    const newNetwork = buildNetworkFromUrls(validated);

    await db.transaction("rw", db.customNetworks, async () => {
      const existing = await db.customNetworks.get(validated.projectId);

      if (existing) {
        // projectId row exists — append new network to the array
        await db.customNetworks
          .where("projectId")
          .equals(validated.projectId)
          .modify((record) => {
            record.customNetworks.push(newNetwork);
          });
      } else {
        // first network for this project — create the row
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

  // PATCH → IDB only (update one network inside the array by network id)
  updateCustomNetworkNestedLink: async (
    data: CustomNetworkNestedLinkStatusPayloadValues | CustomNetworkNestedLinkPayloadValues
  ) => {
    let validated: CustomNetworkNestedLinkStatusPayloadValues | CustomNetworkNestedLinkPayloadValues;

    // Validate with correct schema
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

          // filter out the deleted item
          const updatedNestedData = collection.nestedData.filter((n) => n.id !== validated.nestedId);

          // mutate in place — Dexie writes it back automatically
          collection.nestedData = updatedNestedData;

          // re-derive parent state after deletion
          collection.state = deriveCollectionState(updatedNestedData);
        });

      if (affected === 0) throw new Error("Record not found");
      return affected;
    });
  },

  /*
  getInboundLinks: async (projectId: string): Promise<InboundLink[]> => {
    const response = await linkerApi.get(`${AUTH_CONFIG.API.PROJECTS}/${projectId}${AUTH_CONFIG.API.INBOUNDS}`);
    return response.data;
  },
 */
};

// lib/services/custom-networks.service.ts

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
      return `${field}: missing or invalid\n`;
    })
    .join(", ");
};
