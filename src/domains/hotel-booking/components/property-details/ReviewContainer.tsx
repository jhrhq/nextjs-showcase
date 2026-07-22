import type { IReviewSnapshot } from "../../models/shared.types";
import ReviewModal from "../ReviewModal";
import ReviewBody from "./ReviewBody";

interface Props {
  propertyId: string;
  isHost: boolean;
  hasReserved: boolean;
  reviews: IReviewSnapshot[];
}

const ReviewContainer = ({ propertyId, reviews, isHost, hasReserved }: Props) => {
  return (
    <>
      <div className="col-span-1  flex justify-end mb-4">
        {!isHost ? (
          <ReviewModal
            propertyId={propertyId}
            hasReserved={hasReserved}
            // userId={session?.user?.id}
            // updateReviews={updateReviews}
          />
        ) : null}
      </div>

      <ReviewBody reviews={reviews} />
    </>
  );
};

export default ReviewContainer;
