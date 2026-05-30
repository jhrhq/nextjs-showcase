import { FC } from "react";
import { FaStar } from "react-icons/fa6";

interface Props {
  name: string;
  rating: number;
  reviews: number;
  location: string;
}

const PropertyHeader: FC<Props> = ({ name, rating, reviews, location }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <div className="flex items-center text-gray-600">
        {rating && (
          <>
            {" "}
            <FaStar className="fas fa-star text-yellow-500 mr-1" />
            <span>{rating} · </span>
            <span className="ml-2">
              {reviews} {reviews > 1 ? "reviews" : "review"}
            </span>
            <span className="mx-2">·</span>
          </>
        )}

        <span className="">{location}</span>
      </div>
    </div>
  );
};

export default PropertyHeader;
