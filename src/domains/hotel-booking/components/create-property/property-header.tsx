"use client";

import type { Control } from "react-hook-form";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import type { PropertyFormValues } from "../../validationSchema/property-schema";
import { FieldGroup } from "../ui/field";
import { LocationSection } from "./location-input";

type FormControl = Control<PropertyFormValues>;

export default function PropertyHeader({ control }: FormControl) {
  return (
    <FieldGroup className="space-y-3">
      {/* Title */}
      <FormFieldWrapper
        name="title"
        control={control}
        placeholder="Property Name"
        inputClassName="font-bold py-2 px-3 text-2xl!"
        inputGroupClassName="rounded-xl h-12"
      />
      <LocationSection control={control} />
    </FieldGroup>
  );
}
