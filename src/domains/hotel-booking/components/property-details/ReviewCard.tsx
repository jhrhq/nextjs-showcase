"use client";
import type { FC } from "react";
import StarRating from "@/domains/hotel-booking/components/StartRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/domains/hotel-booking/components/ui/avatar";
import { formatDate } from "@/domains/hotel-booking/utils/date-time-utils";
import type { ReviewType } from "./ReviewContainer";
import { authClient } from "@/lib/auth-client";

interface Props {
  review: ReviewType;
}

const ReviewCard: FC<Props> = ({ review }) => {
  const { data: session } = authClient.useSession();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <AvatarImage src={session.data?.user?.avatar?.url} alt="User avatar" className="w-full h-full object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-medium">{session.data?.user.name}</h4>
          <p className="text-gray-500 text-sm">{formatDate(review.createdAt)}</p>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
