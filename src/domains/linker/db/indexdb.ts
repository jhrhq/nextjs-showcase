import Dexie, { type Table } from "dexie";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import type {
  InboundPost,
  InboundSuggestions,
  SentenceSuggestions,
} from "@/domains/linker/validations/inbound.validation";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";
import type { CreateCustomNetworkResponseSchemaValues } from "../validations/custom-network.validation";

export type SiteReportRecord = SiteReport & { projectId: string };
export type AnchorManagerRecord = AnchorManager & { projectId: string };

export type SentenceSuggestionRecord = {
  targetId: string;
  sentences: SentenceSuggestions;
};

export type CustomNetworkRecord = {
  projectId: string;
  customNetworks: CreateCustomNetworkResponseSchemaValues[];
};

export class AppDatabase extends Dexie {
  projects!: Table<ProjectDTO>;
  siteReports!: Table<SiteReportRecord>;
  anchorManagers!: Table<AnchorManagerRecord>;
  posts!: Table<InboundPost>;
  suggestions!: Table<InboundSuggestions>;
  sentenceSuggestions!: Table<SentenceSuggestionRecord>;
  customNetworks!: Table<CustomNetworkRecord>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      projects: "id, status, name, createdAt",
      siteReports: "projectId",
      anchorManagers: "projectId",
      posts: "id, projectId, postType, language",
      suggestions: "id, _postId, score",
      sentenceSuggestions: "targetId",
      customNetworks: "projectId",
    });
  }
}

export const db = new AppDatabase();
