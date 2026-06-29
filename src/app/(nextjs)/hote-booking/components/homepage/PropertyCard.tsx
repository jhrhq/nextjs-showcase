import { StarSvg } from "@/components/svg-component/StartSvg";
import Image from "next/image";
import Link from "next/link";
import { FaBed } from "react-icons/fa6";

const PropertyCard = ({ property }) => {
  return (
    <Link href={`/property/${property._id}`} className="block group">
      <div>
        <div className="relative">
          <Image
            src={property?.thumbNailUrl}
            alt={property?.name}
            width={500}
            height={500}
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
            <FaBed className="fa-bed inline-block mr-1" />3 Rooms Left
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{property.name}</h3>
            <div className="flex items-center">
              <StarSvg />
              {/* TODO: average rating need to be added */}
              <span className="ml-1 text-zinc-600">4.9</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            {property?.location?.street}, {property?.location?.city},{" "}
            {property?.location?.state}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="font-bold">${property?.pricePerNight}</span>
              <span className="text-zinc-500 text-sm ml-1">per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
