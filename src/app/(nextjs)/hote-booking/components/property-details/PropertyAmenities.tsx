import { FC } from "react";
import {
  FaAirFreshener,
  FaCoffee,
  FaGlassWhiskey,
  FaHotTub,
  FaShieldAlt,
} from "react-icons/fa";
import {
  FaCar,
  FaDumbbell,
  FaElevator,
  FaPersonSwimming,
  FaShirt,
  FaSink,
  FaTv,
  FaUmbrellaBeach,
  FaUtensils,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa6";

export type AmenityIconsType = Record<string, JSX.Element>;

const amenityIcons: AmenityIconsType = {
  wifi: <FaWifi />,
  "high-speed internet": <FaWifi />,
  "full kitchen": <FaUtensils />,
  "washer & Dryer": <FaShirt />,
  "free parking": <FaCar />,
  "hot tub": <FaHotTub />,
  "24/7 security": <FaShieldAlt />,
  "wheelchair accessible": <FaWheelchair />,
  "elevator access": <FaElevator />,
  dishwasher: <FaGlassWhiskey />,
  "swimming pool": <FaPersonSwimming />,
  "gym/fitness center": <FaDumbbell />,
  "air conditioning": <FaAirFreshener />,
  "smart tv": <FaTv />,
  "coffee maker": <FaCoffee />,
  "beach access": <FaUmbrellaBeach />,
  "private pool": <FaPersonSwimming />,
  "free wi-Fi": <FaWifi />,
  kitchen: <FaSink />,
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
              <span className="icon">
                {amenityIcons[amenity.toLowerCase()] || <FaUtensils />}
              </span>
              <span className="name">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyAmenities;
