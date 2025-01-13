import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

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
            <FaStar className=" text-yellow-500" />
          ) : (
            <FaRegStar className=" text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
