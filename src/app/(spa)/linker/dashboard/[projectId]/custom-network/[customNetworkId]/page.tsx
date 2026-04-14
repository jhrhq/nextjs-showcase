"use client";

import { useParams } from "next/navigation";
import { useCustomNetworkStructure } from "@/domains/linker/hooks/use-projects";
import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";

export default function CreateCustomNetworkTable() {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();
  const { data, isLoading } = useCustomNetworkStructure(projectId, customNetworkId);

  if (isLoading) return <h1>Loading....</h1>;
  console.log(data);
  return <InternalLinkManagement />;
}
