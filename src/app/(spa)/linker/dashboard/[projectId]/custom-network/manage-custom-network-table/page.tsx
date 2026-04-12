"use client";

import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";
import { REGISTRY_DATA } from "@/domains/linker/ui/custom-network/manage-custom-network-table/data";
import { RegistryDataTable } from "@/domains/linker/ui/custom-network/manage-custom-network-table/New/data-table";


export default function CreateCustomNetworkTable() {
  return (
    <>
      <RegistryDataTable data={REGISTRY_DATA} />
      <InternalLinkManagement />
    </>
  );
}
