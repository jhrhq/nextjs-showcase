import { Bed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StarSvg } from "@/domains/hotel-booking/components/svg-component/StartSvg";
import type { IProperty } from "../../type/property.type";

interface PropertyCardProps {
  property: IProperty;
}
const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link href={`/hotel-booking/property/${property._id.toString()}`} className="block group">
      <div>
        <div className="relative">
          <Image
            src={property?.images?.[0].url || "/placeholder.svg"}
            alt={property?.title}
            width={500}
            height={500}
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3 flex items-center bg-background/80 dark:bg-card/80 backdrop-blur-md text-foreground border border-border/40 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-colors">
            <Bed className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span>{property.capacity?.bedrooms}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{property.title}</h3>
            <div className="flex items-center">
              <StarSvg />
              <span className="ml-1 text-zinc-600">{property.ratingAvg}</span>
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
