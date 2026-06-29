"use client";
import { FC, useEffect, useState } from "react";
import ReviewBody from "./ReviewBody";
import ReviewModal from "../ReviewModal";
import { useSession } from "next-auth/react";
import { getReviews } from "@/app/actions/reviewAction";
import { Button } from "../ui/button";
import Link from "next/link";

export interface ReviewType {
  _id: string;
  user: string;
  isBooked: boolean;
  property: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  propertyId: string;
}

const ReviewContainer: FC<Props> = ({ propertyId }) => {
  const session = useSession();

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const updateReviews = (data: ReviewType[]) => {
    return setReviews([...data]);
  };

  useEffect(() => {
    const loadReviews = async () => {
      setLoadingReviews(true);
      const res = await getReviews({ propertyId });
      setReviews([...res.reviews]);
      setLoadingReviews(false);
    };

    loadReviews();
  }, [propertyId]);

  return (
    <>
      <div className="col-span-1  flex justify-end mb-4">
        {!session.data ? (
          <Button
            className="px-4 py-2 border border-primary rounded-lg hover:bg-gray-100"
            variant="outline"
            asChild
          >
            <Link href={"/login"}>Write a Review</Link>
          </Button>
        ) : (
          <ReviewModal
            propertyId={propertyId}
            userId={session?.data?.user?.id}
            updateReviews={updateReviews}
          />
        )}
      </div>
      {!loadingReviews && <ReviewBody reviews={reviews} />}
    </>
  );
};

export default ReviewContainer;
