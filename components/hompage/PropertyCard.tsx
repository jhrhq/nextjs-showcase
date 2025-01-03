import { StarSvg } from "@/components/svg-component/StartSvg";
import Link from "next/link";
import { FaBed } from "react-icons/fa6";

const PropertyCard = ({ property }) => {
  return (
    <Link href="/details" className="block group">
      <div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Maldives Paradise"
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
            <FaBed className="fa-bed inline-block mr-1" />3 Rooms Left
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{property.title}</h3>
            <div className="flex items-center">
              <StarSvg />
              <span className="ml-1 text-zinc-600">4.9</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            {property.location.street}, {property.location.city},{" "}
            {property.location.state}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="font-bold">${property.rates.weekly || 450}</span>
              <span className="text-zinc-500 text-sm ml-1">per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
