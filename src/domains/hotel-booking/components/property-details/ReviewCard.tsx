"use client";
import StarRating from "@/domains/hotel-booking/components/StartRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/domains/hotel-booking/components/ui/avatar";
import { formatDate } from "@/domains/hotel-booking/utils/date-time-utils";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { ReviewType } from "./ReviewContainer";
interface Props {
  review: ReviewType;
}

const ReviewCard: FC<Props> = ({ review }) => {
  const session = useSession();
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
