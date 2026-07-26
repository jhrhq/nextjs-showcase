import { Settings } from "lucide-react";
import type { Control } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { ControlledNumberInput, ControlledSwitch } from "@/ui/shared/form-field-wrappers/form-fields";
import { FormSection } from "@/ui/shared/form-field-wrappers/form-section";
import type { PropertyFormValues } from "../../validationSchema/property-schema";
import { FieldGroup } from "../ui/field";

type FormControl = Control<PropertyFormValues>;
export function StayRulesSection({ control }: { control: FormControl }) {
  return (
    <FormSection icon={Settings} title="Stay rules" description="Night limits and visibility">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <ControlledNumberInput control={control} name="minimumNights" label="Minimum nights" min={1} />
          <ControlledNumberInput control={control} name="maximumNights" label="Maximum nights" min={1} />
        </div>

        <Separator />

        <ControlledSwitch
          control={control}
          name="isPublished"
          label="Published"
          description="Guests can find and book this listing."
        />
        <ControlledSwitch
          control={control}
          name="isFeatured"
          label="Featured"
          description="Highlight this listing on the homepage."
        />
      </FieldGroup>
    </FormSection>
  );
}
