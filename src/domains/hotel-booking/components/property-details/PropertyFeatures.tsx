import { Bed, DoorOpen, PersonStanding } from "lucide-react";
import type { FC } from "react";

interface Props {
  sellerName: string;
  rooms: number;
  beds: number;
}

const PropertyFeatures: FC<Props> = ({ sellerName, rooms = 0, beds = 0 }) => {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Entire villa hosted by <span className="font-normal"> {sellerName}</span></h2>
      <div className="grid grid-cols-3 gap-4 text-gray-600">
        <div className="flex items-center gap-2">
          <PersonStanding className="fas fa-person" />
          <span>{rooms * 2} guests</span>
        </div>
        <div className="flex items-center gap-2">
          <DoorOpen className="fas fa-door-open" />
          <span>
            {rooms} {rooms > 1 ? "bedrooms" : "bedroom"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Bed className="fas fa-bed" />
          <span>
            {beds} {beds > 1 ? "beds" : "bed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyFeatures;
