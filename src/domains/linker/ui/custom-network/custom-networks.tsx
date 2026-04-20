"use client";

import type { CreateCustomNetworkResponseSchemaValues } from "../../validations/custom-network.validation";
import { CustomNetworkCard } from "./custom-network-card";

type CustomNetworksProps = {
  networks: CreateCustomNetworkResponseSchemaValues[];
  onNavigateCustomNetwork: (customNetowrkId: string) => void;
};
export default function CustomNetworks({ networks, onNavigateCustomNetwork }: CustomNetworksProps) {
  const handleDelete = () => {};
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {networks.map((net) => (
        <CustomNetworkCard
          key={net.id}
          network={net}
          onNavigateCustomNetwork={onNavigateCustomNetwork}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
