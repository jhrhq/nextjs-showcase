import Link from "next/link";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import type { IReviewSnapshot } from "../../models/shared.types";
import ReviewModal from "../ReviewModal";
import { Button } from "../ui/button";
import ReviewBody from "./ReviewBody";

interface Props {
  bookingId?: string;
  propertyId: string;
  userId?: string;
  isHost: boolean;
  reviews: IReviewSnapshot[];
}

const ReviewContainer = ({ userId, bookingId, propertyId, reviews, isHost }: Props) => {
  return (
    <>
      <div className="col-span-1  flex justify-end mb-4">
        {!userId ? (
          <Button
            className="px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
            variant="outline"
            asChild
          >
            <Link href={AUTH_CONFIG.ROUTES.SIGN_IN}>Write a Review</Link>
          </Button>
        ) : !isHost ? (
          <ReviewModal
            propertyId={propertyId}
            bookingId={bookingId}
            // updateReviews={updateReviews}
          />
        ) : null}
      </div>

      <ReviewBody reviews={reviews} />
    </>
  );
};

export default ReviewContainer;
