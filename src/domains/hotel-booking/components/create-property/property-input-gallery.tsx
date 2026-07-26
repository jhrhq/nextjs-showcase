"use client";
import Image from "next/image";
import React from "react";
import { type Control, Controller, useWatch } from "react-hook-form";
import type { CreatePropertyInput } from "../../validationSchema/property-schema";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";

const DEFAULT_PLACEHOLDER = "https://placehold.co/600x400";

interface FormProps {
  control: Control<CreatePropertyInput>;
}

export function ImageInputCard({
  index,
  label,
  className = "",
  control,
}: FormProps & { index: number; label: string; className?: string }) {
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

export function PropertyImageGallery({ control }: FormProps) {
  return (
    <FieldGroup className="grid grid-cols-4 grid-rows-2 gap-4 h-125">
      <ImageInputCard index={0} label="Main Image URL" control={control} className="col-span-2 row-span-2" />
      {[1, 2, 3, 4].map((i) => (
        <ImageInputCard key={i} index={i} label={`Room ${i} URL`} control={control} />
      ))}
    </FieldGroup>
  );
}
