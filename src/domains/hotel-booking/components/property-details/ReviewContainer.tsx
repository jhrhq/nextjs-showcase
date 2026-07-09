"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getReviews } from "@/domains/hotel-booking/actions/reviewAction";
import { Button } from "@/domains/hotel-booking/components/ui/button";
import ReviewBody from "./ReviewBody";
import ReviewModal from "../ReviewModal";
import { authClient } from "@/lib/auth-client";



interface Props {
  propertyId: string;
}

const ReviewContainer = ({ propertyId }: Props) => {
  const { data: session } = authClient.useSession();

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const updateReviews = (data) => {
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
        {!session ? (
          <Button className="px-4 py-2 border border-primary rounded-lg hover:bg-gray-100" variant="outline" asChild>
            <Link href={"/hotel-booking/login"}>Write a Review</Link>
          </Button>
        ) : (
          <ReviewModal propertyId={propertyId} userId={session?.user?.id} updateReviews={updateReviews} />
        )}
      </div>
      {!loadingReviews && <ReviewBody reviews={reviews} />}
    </>
  );
};

export default ReviewContainer;
