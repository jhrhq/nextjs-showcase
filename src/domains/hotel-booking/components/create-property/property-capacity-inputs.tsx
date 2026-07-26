"use client";

import { Bath, Bed, DoorOpen, PersonStanding } from "lucide-react";
import { type Control, Controller } from "react-hook-form";
import type { CreatePropertyInput } from "../../validationSchema/property-schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormProps {
  control: Control<CreatePropertyInput>;
}

const CAPACITY_CONFIG = [
  { name: "capacity.guests" as const, label: "Max Guests", icon: PersonStanding },
  { name: "capacity.bedrooms" as const, label: "Bedrooms", icon: DoorOpen },
  { name: "capacity.beds" as const, label: "Beds", icon: Bed },
  { name: "capacity.bathrooms" as const, label: "Bathrooms", icon: Bath },
];

export default function PropertyCapacityInputs({ control }: FormProps) {
  return (
    <div className="border-b pb-6 border-zinc-200">
      <h3 className="text-lg font-semibold text-zinc-800 mb-4">Property Capacity</h3>
      <FieldGroup className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CAPACITY_CONFIG.map(({ name, label, icon: Icon }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-zinc-200">
                  <Icon className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <FieldLabel className="text-xs text-gray-500 block">{label}</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                      aria-invalid={fieldState.invalid}
                      className="border-0 p-0 h-auto font-semibold text-zinc-800 focus-visible:ring-0 shadow-none"
                    />
                  </div>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
      </FieldGroup>
    </div>
  );
}
