import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPropertyAction } from "@/domains/hotel-booking/actions";
import PropertyEditForm from "@/domains/hotel-booking/components/create-property/property-edit-form";
import { verifySession } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Edit Listing | Host Dashboard",
  description: "Update property details, pricing, photos, amenities, and listing configuration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CreatePropertyPage() {
  const session = await verifySession();

  if (!session.isAuth) {
    notFound();
  }

  return <PropertyEditForm action={createPropertyAction} />;
}
