"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ActionState } from "@/types/shared/action.types";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import { ControlledTextarea } from "@/ui/shared/form-field-wrappers/form-fields";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import type { IProperty } from "../../type/property.type";
import { bindFormErrors } from "../../utils/form-helpers";
import { type PropertyFormValues, propertyFormDefaults, propertySchema } from "../../validationSchema/property.schema";
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

type ActionResponse = {
  message: string;
};
interface PropertyFormProps {
  initialValues?: IProperty | null;
  action: (values: PropertyFormValues) => Promise<ActionState<ActionResponse>>;
}

export default function PropertyEditForm({ initialValues, action }: PropertyFormProps) {
  const router = useRouter();
  const { control, handleSubmit, watch, setValue, formState, setError } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: { ...propertyFormDefaults, ...initialValues },
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
    try {
      const result = await action(data);
      if (result?.success) {
        toast.success(result?.message);
        router.push(AUTH_CONFIG.ROUTES.HOSTING_LISTING);
      }
      bindFormErrors(setError, result);
    } catch (error) {
      bindFormErrors(setError, null, error);
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
