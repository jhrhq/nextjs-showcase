import type { Control } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { ControlledInput } from "@/ui/shared/form-field-wrappers/form-fields";

import type { PropertyFormValues } from "../../validationSchema/property-schema";
import { FieldGroup } from "../ui/field";

type FormControl = Control<PropertyFormValues>;

export function LocationSection({ control }: { control: FormControl }) {
  return (
    <Card>
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput control={control} name="location.city" label="City" placeholder="New York" />
            <ControlledInput control={control} name="location.country" label="Country" placeholder="United States" />
          </div>
          <ControlledInput
            control={control}
            name="location.address"
            label="Address (optional)"
            placeholder="123 Main St, Apt 4B"
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
