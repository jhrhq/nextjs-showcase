"use client";
import { useEffect, useState } from "react";
import ReviewBody from "./ReviewBody";
import ReviewModal from "../ReviewModal";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getReviews } from "@/app/(nextjs)/hotel-booking/actions/reviewAction";
import type { Types } from "mongoose";

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
  propertyId: Types.ObjectId;
}

const ReviewContainer = ({ propertyId }: Props) => {
  const session = useSession();

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const updateReviews = (data: ReviewType[]) => {
    return setReviews([...data]);
  };

  useEffect(() => {
    const loadReviews = async () => {
      setLoadingReviews(true);
      try {
        const res = await getReviews({ propertyId });
        // Use functional state updates or fallback to an empty array to be safe
        setReviews(res?.reviews ?? []);
      } catch (error) {
        // Handle your error properly here (e.g., logging or setting an error state)
        console.error("Failed to load reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    // The `void` keyword tells ESLint: "I know this returns a promise,
    // but I am purposely ignoring its resolution value."
    void loadReviews();
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
