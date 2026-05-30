import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface Props {
  images: string[];
  name: string;
}

const PropertyImages: FC<Props> = ({ images = [], name }) => {
  if (images.length == 0) return null;
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
      {images.map((img, index) => (
        <div
          key={index}
          className={cn(index == 0 ? "col-span-2 row-span-2" : "")}
        >
          <Image
            src={img}
            alt={`${name} property`}
            width={500}
            height={800}
            className={cn(
              "w-full  object-cover  ",
              index == 0
                ? "h-64 rounded-xl group-hover:scale-105 transition-transform"
                : "h-full rounded-lg"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyImages;
