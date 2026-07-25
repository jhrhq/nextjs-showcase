import ReviewCard from "@/domains/hotel-booking/components/property-details/ReviewCard";
import type { IReviewDocument } from "../../models/Review.model";

interface Props {
  reviews: IReviewDocument[];
}

const ReviewBody = async ({ reviews }: Props) => {
  if (reviews?.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-8 col-span-full">
      {reviews.map((review) => (
        <ReviewCard key={review._id.toString()} review={review} />
      ))}
    </div>
  );
};

export default ReviewBody;
