import { updatePropertyAction } from "@/domains/hotel-booking/actions";
import PropertyEditForm from "@/domains/hotel-booking/components/create-property/property-edit-form";
import { getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";
import type { PropertyFormValues } from "@/domains/hotel-booking/validationSchema/property.schema";
import { verifySession } from "@/lib/dal";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { isAuth: _auth } = await verifySession();

  const { id } = await params;

  const data = await getSelectedPropertyDetails(id);

  const handleUpdateAction = async (values: PropertyFormValues) => {
    "use server";
    return updatePropertyAction({ ...values, propertyId: id });
  };
  return <PropertyEditForm initialValues={JSON.parse(JSON.stringify(data))} action={handleUpdateAction} />;
}
