import { Bed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StarSvg } from "@/domains/hotel-booking/components/svg-component/StartSvg";
import { IPropertyDocument } from "../../models/Property.model";

interface PropertyCardProps {
  property: IPropertyDocument;
}
const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link href={`/hotel-booking/property/${property._id.toString()}`} className="block group">
      <div>
        <div className="relative">
          <Image
            src={property?.images?.[0] || ""}
            alt={property?.title}
            width={500}
            height={500}
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
            <Bed className="fa-bed inline-block mr-1" />
            {property.capacity?.bedrooms}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{property.title}</h3>
            <div className="flex items-center">
              <StarSvg />
              <span className="ml-1 text-zinc-600">{property.rating?.overall}</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-1">{property.location?.address}</p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="font-bold">${property?.pricing?.perNight}</span>
              <span className="text-zinc-500 text-sm ml-1">per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
