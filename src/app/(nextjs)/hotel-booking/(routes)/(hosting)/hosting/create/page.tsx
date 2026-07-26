"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  PropertyAmenitiesSelector,
  PropertyCapacityInputs,
  PropertyHeader,
  PropertyImageGallery,
  PropertyLivePreview,
  PropertyPricingBar,
} from "@/domains/hotel-booking/components/create-property";

import { StayRulesSection } from "@/domains/hotel-booking/components/create-property/stay-rules-inputs";
import { TagsInput } from "@/domains/hotel-booking/components/create-property/tags-input";
import {
  type PropertyFormValues,
  propertyFormDefaults,
  propertySchema,
} from "@/domains/hotel-booking/validationSchema/property-schema";
import { ControlledTextarea } from "@/ui/shared/form-field-wrappers/form-fields";

export default function CreatePropertyPage() {
  // const router = useRouter();
  const { control, handleSubmit, watch, setValue, formState } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: { ...propertyFormDefaults },
    mode: "onBlur",
  });

  const tags = watch("tags");

  function addTag(tag: string) {
    if (!tags.includes(tag)) setValue("tags", [...tags, tag]);
  }

  function removeTag(tag: string) {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  }

  const onSubmit = async (data: PropertyFormValues) => {
    console.log("Submitting property:", data);
  };

  return (
    <form
      id="property-form"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto px-6 py-8 relative space-y-8"
    >
      {/* Top Save/Publish Button */}

      {/*<div className="flex justify-end gap-3 mb-4">
        <Button type="submit" form="property-form" disabled={formState.isSubmitting} className="px-6 py-2">
          {formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Publish
        </Button>
      </div>*/}

      <PropertyHeader control={control} />
      <PropertyImageGallery control={control} />
      <PropertyPricingBar control={control} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyCapacityInputs control={control} />

          {/* Description Field */}
          <ControlledTextarea
            name="tags"
            control={control}
            label="About this place"
            placeholder="Write a clear, detailed description..."
          />
          <TagsInput control={control} tags={tags} onTagAdd={addTag} onTagRemove={removeTag} />
          {/* Amenities Selector */}
          <PropertyAmenitiesSelector control={control} setValue={setValue} />

          <StayRulesSection control={control} />
        </div>

        <div className="lg:col-span-1">
          <PropertyLivePreview control={control} formState={formState} />
        </div>
      </div>
    </form>
  );
}
