"use client";
import {
  BadgePercent,
  Bath,
  Bed,
  BrushCleaning,
  Check,
  DollarSign,
  DoorOpen,
  MoonStar,
  PersonStanding,
  Plus,
  Settings,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { type Control, Controller, type UseFormSetValue, useWatch } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  ControlledInput,
  ControlledNumberInput,
  ControlledSelect,
  ControlledSwitch,
} from "@/ui/shared/form-field-wrappers/form-fields";
import { FormSection } from "@/ui/shared/form-field-wrappers/form-section";
import type { PropertyFormValues } from "../../validationSchema/property-schema";
import { AMENITY_LABELS, AMENITY_MAP } from "../property-details/amenities.map";
import { FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { CURRENCIES } from "./constants";

type FormControl = { control: Control<PropertyFormValues> };

export function LocationSection({ control }: FormControl) {
  return (
    <Card className="rounded-md">
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

const DEFAULT_PLACEHOLDER = "https://placehold.co/600x400";

export function ImageInputCard({
  index,
  label,
  className = "",
  control,
}: FormControl & { index: number; label: string; className?: string }) {
  const imageUrl = useWatch({ control, name: `images.${index}.url` });
  const [imgSrc, setImgSrc] = React.useState<string>(imageUrl || DEFAULT_PLACEHOLDER);

  React.useEffect(() => {
    setImgSrc(imageUrl || DEFAULT_PLACEHOLDER);
  }, [imageUrl]);

  return (
    <div className={`relative group rounded-lg overflow-hidden border border-zinc-200 ${className}`}>
      <Image
        src={imgSrc}
        onError={() => setImgSrc(DEFAULT_PLACEHOLDER)}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        height={500}
        width={500}
      />
      <div className="absolute inset-x-0 bottom-0 p-2.5 bg-linear-to-t from-black/60 to-transparent">
        <Controller
          name={`images.${index}.url` as const}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder={label}
                aria-invalid={fieldState.invalid}
                className="p-1.5 text-xs h-7 bg-white/95 backdrop-blur-xs text-zinc-800"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </div>
  );
}

export function PropertyImageGallery({ control }: FormControl) {
  return (
    <FieldGroup className="grid grid-cols-4 grid-rows-2 gap-4 h-125">
      <ImageInputCard index={0} label="Main Image URL" control={control} className="col-span-2 row-span-2" />
      {[1, 2, 3, 4].map((i) => (
        <ImageInputCard key={i} index={i} label={`Room ${i} URL`} control={control} />
      ))}
    </FieldGroup>
  );
}

const CAPACITY_CONFIG = [
  { name: "capacity.guests" as const, label: "Max Guests", icon: PersonStanding },
  { name: "capacity.bedrooms" as const, label: "Bedrooms", icon: DoorOpen },
  { name: "capacity.beds" as const, label: "Beds", icon: Bed },
  { name: "capacity.bathrooms" as const, label: "Bathrooms", icon: Bath },
];

export function PropertyCapacityInputs({ control }: FormControl) {
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

const PRICING_CONFIG = [
  // { name: "pricing.currency" as const, label: "Currency", icon: Currency },
  { name: "pricing.perNight" as const, label: "Price per Night", icon: MoonStar },
  { name: "pricing.cleaningFee" as const, label: "Cleaning Fee", icon: BrushCleaning },
  { name: "pricing.serviceFee" as const, label: "Service Fee", icon: BadgePercent },
];

export function PropertyPricingInputs({ control }: FormControl) {
  return (
    <div className="border-b pb-6 border-zinc-200">
      <h3 className="text-lg font-semibold text-zinc-800 mb-4">Pricing</h3>
      <FieldGroup className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ControlledSelect
          control={control}
          name="pricing.currency"
          label="Currency"
          Icon={DollarSign}
          options={CURRENCIES.map((c) => ({ value: c, label: c }))}
        />
        {PRICING_CONFIG.map(({ name, label, icon: Icon }) => (
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

interface TagsInputProps {
  tags: string[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

export function TagsInput({ tags, onTagAdd, onTagRemove }: TagsInputProps) {
  const [tagInput, setTagInput] = useState("");

  function handleAdd() {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    onTagAdd(trimmed);
    setTagInput("");
  }

  return (
    <FieldGroup className="border-b pb-6 border-zinc-200">
      <Field>
        <FieldLabel className="font-semibold text-xl">Tags</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="tag-input"
            value={tagInput}
            placeholder="e.g. pet-friendly"
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="bg-background"
          />
          <Button type="button" variant="outline" size="icon" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                <Tag className="h-3 w-3" />
                {tag}
                <button
                  type="button"
                  onClick={() => onTagRemove(tag)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                  aria-label={`Remove tag "${tag}"`}
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <FieldDescription>Press Enter or + to add a tag.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}

export default function PropertyAmenitiesSelector({
  control,
  setValue,
}: FormControl & { setValue: UseFormSetValue<PropertyFormValues> }) {
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

export function StayRulesSection({ control }: FormControl) {
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
