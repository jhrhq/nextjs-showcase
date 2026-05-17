"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "next/navigation";
import { db } from "@/domains/linker/db/indexdb";
import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";
import { InternalLinkManagementEmpty } from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table-empty";
import { InternalLinkManagementSkeleton } from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table-skeleton";

export default function CreateCustomNetworkTable() {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();
  const data = useLiveQuery(() => db.customNetworks.get(projectId), [projectId]);
  const currentNetwork = data?.customNetworks.find((item) => item.id === customNetworkId);

  if (data === undefined) return <InternalLinkManagementSkeleton />;
  if (!currentNetwork) return <InternalLinkManagementEmpty />;

  return <InternalLinkManagement data={currentNetwork} />;
}
