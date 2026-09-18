"use client";

import { Building2, Loader2, Sparkles } from "lucide-react";
import { type Control, type FormState, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import type { PropertyFormValues } from "../../validationSchema/property.schema";

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
    <Card className="sticky top-6 bg-card text-card-foreground border-border">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
        <div>
          <span className="text-2xl font-bold text-foreground">${perNight || 0}</span>
          <span className="text-muted-foreground text-sm"> / night</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-500/20">
          <Sparkles className="size-3" /> Live Preview
        </span>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex justify-between py-1 border-b border-border">
            <span>Property</span>
            <span className="font-semibold text-foreground truncate max-w-40">{title || "Untitled"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border">
            <span>Location</span>
            <span className="font-semibold text-foreground truncate max-w-40">
              {city && country ? `${city}, ${country}` : city || country || "Unspecified"}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-border">
            <span>Capacity</span>
            <span className="font-semibold text-foreground">
              {guests || 0} Guests · {bedrooms || 0} Bedrooms
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Amenities</span>
            <span className="font-semibold text-foreground">{amenities?.length || 0} selected</span>
          </div>
        </div>

        {formState.errors?.root?.serverError && <FieldError errors={[formState.errors.root.serverError]} />}

        <Button
          type="submit"
          form="property-form"
          disabled={formState.isSubmitting}
          className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {formState.isSubmitting ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <Building2 className="size-4 mr-2" />
          )}
          Save & Publish Property
        </Button>
      </CardContent>
    </Card>
  );
}
