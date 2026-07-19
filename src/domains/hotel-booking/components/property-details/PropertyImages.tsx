import Image from "next/image";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import type { IPropertyImage } from "../../models/Property.model";

interface Props {
  images: IPropertyImage[];
  title: string;
}

const PropertyImages: FC<Props> = ({ images, title }: Props) => {
  if (images.length === 0) return null;
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-125">
      {images.map((img, index) => (
        <div key={index} className={cn(index === 0 && "col-span-2 row-span-2")}>
          <Image
            src={img.url}
            alt={img.alt || title}
            width={500}
            height={800}
            className={cn(
              "w-full object-cover  ",
              index === 0 ? "h-full rounded-xl group-hover:scale-105 transition-transform" : "h-full rounded-lg"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyImages;
