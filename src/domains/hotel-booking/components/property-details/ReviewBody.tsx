"use client";
import ReviewCard from "@/domains/hotel-booking/components/property-details/ReviewCard";
import type { ReviewType } from "@/domains/hotel-booking/components/property-details/ReviewContainer";

interface Props {
  reviews: ReviewType[];
}

const ReviewBody = ({ reviews = [] }: Props) => {
  if (reviews?.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 gap-8 col-span-full">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewBody;
