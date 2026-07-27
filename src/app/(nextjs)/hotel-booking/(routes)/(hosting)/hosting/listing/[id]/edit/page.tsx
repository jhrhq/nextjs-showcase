import { updatePropertyAction } from "@/domains/hotel-booking/actions/create-update-property-action";
import PropertyEditForm from "@/domains/hotel-booking/components/create-property/property-edit-form";
import { getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";
import { verifySession } from "@/lib/dal";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { isAuth: _auth } = await verifySession();

  const { id } = await params;

  const data = await getSelectedPropertyDetails(id);
  const boundUpdateAction = updatePropertyAction.bind(null, id);

  return <PropertyEditForm initialValues={JSON.parse(JSON.stringify(data))} action={boundUpdateAction} />;
}
