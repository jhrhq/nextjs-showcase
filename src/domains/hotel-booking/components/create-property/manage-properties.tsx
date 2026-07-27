import { Bath, Bed, Edit2, Eye, MapPin, Plus, Star, Trash2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import type { IProperty } from "../../type/property.type";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop";

interface ManagePropertiesProps {
  properties: IProperty[] | null;
  onDelete?: (id: string) => void;
}

export default function ManageProperties({ properties, onDelete }: ManagePropertiesProps) {
  if (!properties || properties.length === 0) {
    return <PropertyEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property._id.toString()} property={property} onDelete={onDelete} />
      ))}
    </div>
  );
}

function PropertyEmptyState() {
  return (
    <Card className="p-12 text-center border-dashed">
      <div className="max-w-md mx-auto space-y-3">
        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-500">
          <Plus className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900">No properties found</h3>
        <p className="text-sm text-zinc-500">
          You haven't listed any properties yet. Click below to add your first property.
        </p>
        <Button asChild size="sm" className="mt-2">
          <Link href="/dashboard/properties/new">
            <Plus className="w-4 h-4 mr-1.5" /> Add Property
          </Link>
        </Button>
      </div>
    </Card>
  );
}

interface PropertyCardProps {
  property: IProperty;
  onDelete?: (id: string) => void;
}

function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0]?.url || DEFAULT_IMAGE;
  const propertyId = property._id.toString();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: property.pricing.currency || "USD",
    maximumFractionDigits: 0,
  }).format(property.pricing.perNight);

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-200 border-zinc-200/80 flex flex-col justify-between rounded-md">
      <div>
        {/* Card Top: Image & Overlay Badges */}
        <PropertyCardImage
          src={mainImage}
          alt={property.images[0]?.alt || property.title}
          isPublished={property.isPublished}
          isFeatured={property.isFeatured}
          ratingAvg={property.ratingAvg}
          reviewCount={property.reviewCount}
        />

        {/* Card Header: Type, Price & Title */}
        <CardHeader className="p-4 pb-2 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{property.type}</span>
            <span className="text-lg font-bold text-zinc-900">
              {formattedPrice} <span className="text-xs font-normal text-zinc-500">/night</span>
            </span>
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 truncate group-hover:text-primary transition-colors">
            {property.title}
          </h2>
        </CardHeader>

        {/* Card Body: Location & Capacity */}
        <CardContent className="px-4 py-2 space-y-3">
          <div className="flex items-center text-zinc-500 gap-1.5">
            <MapPin className="size-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">
              {property.location.city}, {property.location.country}
            </span>
          </div>

          <PropertyCardCapacity capacity={property.capacity} />
        </CardContent>
      </div>

      {/* Card Footer: Actions */}
      <PropertyCardActions propertyId={propertyId} />
    </Card>
  );
}

interface PropertyCardImageProps {
  src: string;
  alt: string;
  isPublished: boolean;
  isFeatured?: boolean;
  ratingAvg?: number;
  reviewCount?: number;
}

function PropertyCardImage({ src, alt, isPublished, isFeatured, ratingAvg, reviewCount }: PropertyCardImageProps) {
  return (
    <div className="relative overflow-hidden bg-zinc-100">
      <Image
        height={500}
        width={500}
        src={src}
        alt={alt}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Status & Featured Badges (Top Left) */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
        <Badge
          variant={isPublished ? "default" : "secondary"}
          className="bg-white/95 backdrop-blur-xs text-zinc-800 hover:bg-white border-0 text-xs font-medium"
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
        {isFeatured && <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-0 text-xs">Featured</Badge>}
      </div>

      {/* Rating Badge (Top Right) */}
      {ratingAvg !== undefined && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-zinc-800 shadow-xs">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>{ratingAvg.toFixed(1)}</span>
          {reviewCount ? <span className="text-zinc-400 font-normal">({reviewCount})</span> : null}
        </div>
      )}
    </div>
  );
}

interface PropertyCardCapacityProps {
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
  };
}

function PropertyCardCapacity({ capacity }: PropertyCardCapacityProps) {
  return (
    <div className="flex items-center gap-4 text-xs text-zinc-600 py-2 border-y border-zinc-100">
      <div className="flex items-center gap-1" title="Guests">
        <Users className="size-3.5 text-primary" />
        <span>{capacity.guests} guests</span>
      </div>
      <div className="flex items-center gap-1" title="Bedrooms">
        <Bed className="size-3.5 text-primary" />
        <span>{capacity.bedrooms} beds</span>
      </div>
      <div className="flex items-center gap-1" title="Bathrooms">
        <Bath className="size-3.5 text-primary" />
        <span>{capacity.bathrooms} baths</span>
      </div>
    </div>
  );
}

interface PropertyCardActionsProps {
  propertyId: string;
  // onDelete?: (id: string) => void;
}

function PropertyCardActions({ propertyId }: PropertyCardActionsProps) {
  return (
    <CardFooter className="p-4 pt-2 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
      <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
        <Link href={`/properties/${propertyId}`}>
          <Eye className="size-3.5" />
        </Link>
      </Button>
      <div className="flex items-center gap-1">
        <Button asChild variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-zinc-600 hover:text-zinc-900">
          <Link href={AUTH_CONFIG.ROUTES.HOSTING_LISTING_EDIT(propertyId)}>
            <Edit2 className="size-3.5" />
          </Link>
        </Button>
        <Button
          disabled
          variant="destructive-lighter"
          // onClick={() => onDelete?.(propertyId)}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
        </Button>
      </div>
    </CardFooter>
  );
}
