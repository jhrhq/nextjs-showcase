import { Star } from "lucide-react";
import type { FC } from "react";

interface Props {
  rating: number;
  reviews: number;
}

const ReviewHeader: FC<Props> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-4 col-span-1">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <div className="flex items-center">
        {rating && (
          <>
            <Star className="fas fa-star text-yellow-500 mr-2" fill="currentColor" />
            <span className="text-xl font-semibold">{rating}</span>
            <span className="mx-2">·</span>
            <span className="text-gray-600">
              {reviews} {reviews > 1 ? "reviews" : "review"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewHeader;
