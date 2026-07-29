import { notFound } from "next/navigation";
import { createPropertyAction } from "@/domains/hotel-booking/actions/create-update-property-action";
import PropertyEditForm from "@/domains/hotel-booking/components/create-property/property-edit-form";
import { verifySession } from "@/lib/dal";

export default async function CreatePropertyPage() {
  const session = await verifySession();

  if (!session.isAuth) {
    notFound();
  }

  return <PropertyEditForm action={createPropertyAction} />;
}
