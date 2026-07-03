import { Star } from "lucide-react";
import React from "react";

type StarRatingProps = {
  rating: number;
  maxRating?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, index) => (
        <span key={index}>
          {index < rating ? (
            <Star fill="currentColor" className=" text-yellow-500" />
          ) : (
            <Star className=" text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
