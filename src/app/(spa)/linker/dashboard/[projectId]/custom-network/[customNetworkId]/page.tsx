"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "next/navigation";
import { db } from "@/domains/linker/db/indexdb";
import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";

export default function CreateCustomNetworkTable() {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();
  const data = useLiveQuery(() => db.customNetworks.get(projectId), [projectId]);
  const currentNetwork = data?.customNetworks.find((item) => item.id === customNetworkId);

  if ((data || currentNetwork) === undefined) return <h1>Loading....</h1>;

  if (!data || !currentNetwork) return <h1>No data</h1>;

  return <InternalLinkManagement data={currentNetwork} />;
}
