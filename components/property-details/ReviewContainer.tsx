import { getReviews } from "@/app/actions/reviewAction";
import ReviewCard from "@/components/property-details/ReviewCard";
import { FC } from "react";

interface Props {
  propertyId: string;
}

const ReviewContainer: FC<Props> = async ({ propertyId }) => {
  const totalReviews = await getReviews({ propertyId });
  return (
    <div className="grid grid-cols-2 gap-8">
      {totalReviews?.reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewContainer;
