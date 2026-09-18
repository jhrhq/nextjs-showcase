import { Star } from "lucide-react";
import type { FC } from "react";

interface Props {
  name: string;
  rating: number;
  reviews: number;
  location: string;
}

const PropertyHeader: FC<Props> = ({ name, rating, reviews, location }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2 text-foreground">{name}</h1>
      <div className="flex flex-wrap items-center text-sm text-muted-foreground">
        {rating && (
          <>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
              <span className="font-semibold text-foreground">{rating}</span>
              <span className="ml-1.5">
                ({reviews} {reviews === 1 ? "review" : "reviews"})
              </span>
            </div>
            <span className="mx-2">·</span>
          </>
        )}

        <span>{location}</span>
      </div>
    </div>
  );
};

export default PropertyHeader;
