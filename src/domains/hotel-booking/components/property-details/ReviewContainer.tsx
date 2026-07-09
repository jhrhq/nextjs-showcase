"use client";
import { IReviewSnapshot } from "../../models/shared.types";
import ReviewBody from "./ReviewBody";
import ReviewModal from "../ReviewModal";




interface Props {
  propertyId: string;
  reviews: IReviewSnapshot[]
}

const ReviewContainer = ({ propertyId, reviews }: Props) => {

  return (
    <>
      <div className="col-span-1  flex justify-end mb-4">

          {/*<Button className="px-4 py-2 border border-primary rounded-lg hover:bg-gray-100" variant="outline" asChild>
            <Link href={"/hotel-booking/login"}>Write a Review</Link>
          </Button>*/}

        <ReviewModal
          propertyId={propertyId}
          // userId={session?.user?.id}
          // updateReviews={updateReviews}
        />
      </div>

      <ReviewBody reviews={reviews} />
    </>
  );
};

export default ReviewContainer;
