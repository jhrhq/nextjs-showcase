"use client";

import { CustomNetworkCard, type NetworkItem } from "./custom-network-card";

type CustomNetworksProps = {
  networks: NetworkItem[];
};
export default function CustomNetworks({ networks }: CustomNetworksProps) {
  const handleDelete = () => {};
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {networks.map((net) => (
        <CustomNetworkCard key={net.id} network={net} onDelete={handleDelete} />
      ))}
    </div>
  );
}
