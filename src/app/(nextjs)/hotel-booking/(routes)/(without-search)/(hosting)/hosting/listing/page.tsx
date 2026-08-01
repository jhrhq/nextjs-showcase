import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ManageProperties from "@/domains/hotel-booking/components/create-property/manage-properties";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import { getHostProperties } from "@/domains/hotel-booking/db/queries";
import { delay } from "@/lib/delay";

export const metadata: Metadata = {
  title: "Manage Properties | Host Dashboard",
  description: "View, edit, and create listings for your hotel portfolio.",
};

const ManageList = async () => {
  await delay(3000);
  const properties = await getHostProperties();
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Manage Properties</h1>
          <p className="text-sm text-zinc-500 mt-1">View, edit, and create listings for your hotel portfolio.</p>
        </div>
        <Button
          type="button"
          className="bg-primary text-white px-4 py-5 text-md rounded-lg hover:brightness-90 transition-colors"
          asChild
        >
          <Link href={AUTH_CONFIG.ROUTES.HOSTING_CREATE}>
            <Plus /> Create Hotel
          </Link>
        </Button>
      </div>
      <ManageProperties properties={properties} />
    </div>
  );
};

export default ManageList;
