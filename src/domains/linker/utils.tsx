import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import {
  type CreateCustomNetworkResponseSchemaValues,
  type CustomNetworkCollectionState,
  type CustomNetworkNestedStatus,
  CustomNetworkNestedStatusEnum,
  CustomNetworkStateEnum,
  type createCustomNetworkPayload,
  STATUS_OPTIONS,
} from "@/domains/linker/validations/custom-network.validation";

export function getScoreVariant(score: number): "default" | "secondary" | "destructive" {
  if (score >= 90) return "default";
  if (score >= 70) return "secondary";
  return "destructive";
}

export function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
}

export function getStatusIcon(status: "pass" | "warning" | "fail") {
  if (status === "pass") return <CheckCircle2 className="size-4 text-green-600" />;
  if (status === "warning") return <AlertCircle className="size-4 text-yellow-600" />;
  return <XCircle className="size-4 text-red-600" />;
}

export function getSeoScoreStatus(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  return "Poor";
}

function deriveCollectionState(nested: { status: CustomNetworkNestedStatus }[]): CustomNetworkCollectionState {
  if (nested.every((n) => n.status === CustomNetworkNestedStatusEnum.enum.UNLINKED)) {
    return CustomNetworkStateEnum.enum["Not Started"];
  }

  if (nested.every((n) => n.status === CustomNetworkNestedStatusEnum.enum.ACTIVE)) {
    return CustomNetworkStateEnum.enum["Fully Linked"];
  }

  return CustomNetworkStateEnum.enum["In Progress"];
}

export function buildNetworkFromUrls(formValues: createCustomNetworkPayload): CreateCustomNetworkResponseSchemaValues {
  const allUrls = formValues.urls.map((u) => u.url);

  const collections = formValues.urls.map((parentItem) => {
    const otherUrls = allUrls.filter((u) => u !== parentItem.url);

    const nestedData = otherUrls.map((otherUrl) => ({
      id: crypto.randomUUID(),
      title: "Internal Cross-Link",
      url: otherUrl,
      anchor: "related content",
      status: STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)] as "ACTIVE" | "STALE" | "UNLINKED",
    }));

    return {
      id: crypto.randomUUID(),
      url: parentItem.url,
      targetLinks: `${nestedData.filter((n) => n.status === "ACTIVE").length}/${nestedData.length}`,
      state: deriveCollectionState(nestedData),
      nestedData,
    };
  });

  return {
    id: crypto.randomUUID(),
    projectId: formValues.projectId,
    collectionName: formValues.collectionName,
    collections,
  };
}
