"use client";
import type { FC } from "react";
import ReviewCard from "@/domains/hotel-booking/components/property-details/ReviewCard";
import type { ReviewType } from "./ReviewContainer";

interface Props {
  reviews: ReviewType[];
}

const ReviewBody: FC<Props> = ({ reviews = [] }) => {
  if (reviews?.length == 0) {
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
