import { SquareChevronDown } from "lucide-react";
import type { AmenityKey } from "../../type/property.type";
import { AMENITY_MAP } from "./amenities.map";

interface Props {
  amenities: AmenityKey[];
  description: string;
}

const PropertyAmenities = ({ description, amenities = [] }: Props) => {
  if (amenities.length === 0) return null;
  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">About this place</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity, index) => {
            const IconComponent = AMENITY_MAP[amenity] || SquareChevronDown;

            return (
              <div key={index} className="flex items-center gap-2">
                <span className="icon">
                  <IconComponent className="w-5 h-5 text-zinc-600 shrink-0" strokeWidth={1.75} />
                </span>
                <span className="name">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PropertyAmenities;
