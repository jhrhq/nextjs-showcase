import type { IReviewSnapshot } from "../../models/shared.types";
import ReviewModal from "../ReviewModal";
import ReviewBody from "./ReviewBody";

interface Props {
  userId: string;
  bookingId?: string;
  propertyId: string;
  isHost: boolean;
  reviews: IReviewSnapshot[];
}

const ReviewContainer = ({ userId, bookingId, propertyId, reviews, isHost }: Props) => {
  return (
    <>
      <div className="col-span-1  flex justify-end mb-4">
        {!isHost ? (
          <ReviewModal
            userId={userId}
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
