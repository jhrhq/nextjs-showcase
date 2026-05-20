"use client";

import { useParams } from "next/navigation";
import { useCustomNetwork } from "@/domains/linker/hooks/use-projects";
import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";
import { InternalLinkManagementEmpty } from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table-empty";
import { InternalLinkManagementSkeleton } from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table-skeleton";

export default function CreateCustomNetworkTable() {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();
  const query = useCustomNetwork(projectId, customNetworkId);

  if (query.isLoading) return <InternalLinkManagementSkeleton />;
  if (!query.data) return <InternalLinkManagementEmpty />;

  return <InternalLinkManagement data={query.data} />;
}
