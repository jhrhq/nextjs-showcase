"use client";

import { Building2, Loader2, Sparkles } from "lucide-react";
import { type Control, type FormState, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PropertyFormValues } from "../../validationSchema/property.schema";
import { Button } from "../ui/button";
import { FieldError } from "../ui/field";

interface FormProps {
  control: Control<PropertyFormValues>;
}

export default function PropertyLivePreview({
  control,
  formState,
}: FormProps & { formState: FormState<PropertyFormValues> }) {
  const title = useWatch({ control, name: "title" });
  const city = useWatch({ control, name: "location.city" });
  const country = useWatch({ control, name: "location.country" });
  const perNight = useWatch({ control, name: "pricing.perNight" });
  const guests = useWatch({ control, name: "capacity.guests" });
  const bedrooms = useWatch({ control, name: "capacity.bedrooms" });
  const amenities = useWatch({ control, name: "amenities" });

  return (
    <Card className="sticky top-6">
      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <span className="text-2xl font-bold text-zinc-900">${perNight || 0}</span>
          <span className="text-gray-500 text-sm"> / night</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          <Sparkles className="w-3 h-3" /> Live Preview
        </span>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between py-1 border-b border-zinc-100">
            <span>Property</span>
            <span className="font-semibold text-zinc-800 truncate max-w-40">{title || "Untitled"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100">
            <span>Location</span>
            <span className="font-semibold text-zinc-800 truncate max-w-40">
              {city && country ? `${city}, ${country}` : city || country || "Unspecified"}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100">
            <span>Capacity</span>
            <span className="font-semibold text-zinc-800">
              {guests || 0} Guests · {bedrooms || 0} Bedrooms
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Amenities</span>
            <span className="font-semibold text-zinc-800">{amenities?.length || 0} selected</span>
          </div>
        </div>

        {formState.errors?.root?.serverError && <FieldError errors={[formState.errors.root.serverError]} />}

        <Button type="submit" form="property-form" disabled={formState.isSubmitting} className="w-full py-3">
          {formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Building2 className="w-4 h-4 mr-2" />
          )}
          Save & Publish Property
        </Button>
      </CardContent>
    </Card>
  );
}
