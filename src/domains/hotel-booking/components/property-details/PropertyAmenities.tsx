import {
  Accessibility,
  Bath,
  Car,
  ChefHat,
  Coffee,
  Dumbbell,
  Martini,
  Parasol,
  ShieldHalf,
  Shirt,
  SprayCan,
  SquareChevronDown,
  Tv,
  Utensils,
  WavesLadder,
  Wifi,
} from "lucide-react";
import type { FC } from "react";

export type AmenityIconsType = Record<string, JSX.Element>;

const amenityIcons: AmenityIconsType = {
  wifi: <Wifi />,
  "high-speed internet": <Wifi />,
  "full kitchen": <Utensils />,
  "washer & Dryer": <Shirt fill="currentColor" />,
  "free parking": <Car />,
  "hot tub": <Bath />,
  "24/7 security": <ShieldHalf fill="currentColor" />,
  "wheelchair accessible": <Accessibility />,
  "elevator access": <SquareChevronDown />,
  dishwasher: <Martini />,
  "swimming pool": <WavesLadder />,
  "gym/fitness center": <Dumbbell />,
  "air conditioning": <SprayCan />,
  "smart tv": <Tv />,
  "coffee maker": <Coffee />,
  "beach access": <Parasol />,
  "private pool": <WavesLadder />,
  "free wi-Fi": <Wifi />,
  kitchen: <ChefHat />,
};

interface Props {
  amenities: string[];
  description: string;
}

const PropertyAmenities: FC<Props> = ({ description, amenities = [] }) => {
  if (amenities.length == 0) return null;
  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">About this place</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="icon">{amenityIcons[amenity.toLowerCase()] || <Utensils />}</span>
              <span className="name">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyAmenities;
