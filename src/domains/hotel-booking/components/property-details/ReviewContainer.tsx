import Link from "next/link";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import { getReviewsForProperty } from "../../db/queries";
import ReviewModal from "../ReviewModal";
import { Button } from "../ui/button";
import ReviewBody from "./ReviewBody";

interface Props {
  bookingId?: string;
  propertyId: string;
  userId?: string;
  isHost: boolean;
}

const ReviewContainer = async ({ userId, bookingId, propertyId, isHost }: Props) => {
  const reviews = await getReviewsForProperty(propertyId);
  const isCurrentUserReview = reviews.some((review) => review.authorId.toString() === userId);

  return (
    <>
      <div className="col-span-1 flex justify-end mb-4">
        {!userId ? (
          <Button
            className="px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
            variant="outline"
            asChild
          >
            <Link href={AUTH_CONFIG.ROUTES.SIGN_IN}>Write a Review</Link>
          </Button>
        ) : !isHost ? (
          <ReviewModal propertyId={propertyId} bookingId={bookingId} isCurrentUserReview={isCurrentUserReview} />
        ) : null}
      </div>

      <ReviewBody reviews={reviews} />
    </>
  );
};

export default ReviewContainer;
