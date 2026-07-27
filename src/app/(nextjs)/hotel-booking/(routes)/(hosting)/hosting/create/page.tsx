import { createPropertyAction } from "@/domains/hotel-booking/actions/create-update-property-action";
import PropertyEditForm from "@/domains/hotel-booking/components/create-property/property-edit-form";

export default function CreatePropertyPage() {
  return <PropertyEditForm action={createPropertyAction} />;
}
