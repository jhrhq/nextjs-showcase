"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import { ControlledTextarea } from "@/ui/shared/form-field-wrappers/form-fields";
import { createPropertyAction } from "../../actions/create-property-action";
import { type PropertyFormValues, propertyFormDefaults, propertySchema } from "../../validationSchema/property-schema";
import { FieldGroup } from "../ui/field";
import PropertyAmenitiesSelector, {
  LocationSection,
  PropertyCapacityInputs,
  PropertyImageGallery,
  PropertyPricingInputs,
  StayRulesSection,
  TagsInput,
} from "./form-sections";
import PropertyLivePreview from "./property-live-preview";

export default function PropertyEditForm() {
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
    try {
      const result = await createPropertyAction(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      id="property-form"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto px-6 py-8 relative space-y-8"
    >
      <FieldGroup className="space-y-3">
        <FormFieldWrapper
          name="title"
          control={control}
          placeholder="Property Name"
          inputClassName="font-bold py-2 px-3 text-2xl!"
          inputGroupClassName="rounded-xl h-12"
        />
        <LocationSection control={control} />
      </FieldGroup>
      <PropertyImageGallery control={control} />
      <PropertyCapacityInputs control={control} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyPricingInputs control={control} />
          <ControlledTextarea
            name="description"
            control={control}
            label="About this place"
            placeholder="Write a clear, detailed description..."
          />
          <TagsInput tags={tags} onTagAdd={addTag} onTagRemove={removeTag} />
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
