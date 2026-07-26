"use client";

import { Check } from "lucide-react";
import { type Control, Controller, type UseFormSetValue, useWatch } from "react-hook-form";
import type { CreatePropertyInput } from "../../validationSchema/property-schema";
import { AMENITY_LABELS, AMENITY_MAP } from "../property-details/amenities.map";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface FormProps {
  control: Control<CreatePropertyInput>;
}

export default function PropertyAmenitiesSelector({
  control,
  setValue,
}: FormProps & { setValue: UseFormSetValue<CreatePropertyInput> }) {
  const selectedAmenities = useWatch({ control, name: "amenities" }) || [];

  const toggleAmenity = (key: string) => {
    const updated = selectedAmenities.includes(key)
      ? selectedAmenities.filter((item) => item !== key)
      : [...selectedAmenities, key];

    setValue("amenities", updated, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <Controller
      name="amenities"
      control={control}
      render={({ fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="text-xl font-semibold mb-4 text-zinc-800 block">What this place offers</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(AMENITY_MAP).map(([key, IconComponent]) => {
              const isSelected = selectedAmenities.includes(key);
              const label = AMENITY_LABELS[key] ?? key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAmenity(key)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-zinc-200 bg-white text-gray-600 hover:border-zinc-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span className="text-sm flex-1">{label}</span>
                  {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
