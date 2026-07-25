import ReviewCard from "@/domains/hotel-booking/components/property-details/ReviewCard";
import type { IReviewSnapshot } from "../../models/shared.types";

interface Props {
  reviews: IReviewSnapshot[];
}

const ReviewBody = ({ reviews }: Props) => {
  if (reviews?.length === 0) {
    return null;
  }

  return null;
  return (
    <div className="grid grid-cols-2 gap-8 col-span-full">
      {/*TODO: convert the db data to to fix server plain object */}
      {reviews.map((review) => (
        <ReviewCard key={review.reviewId.toString()} review={serializedData} />
      ))}
    </div>
  );
};

export default ReviewBody;
