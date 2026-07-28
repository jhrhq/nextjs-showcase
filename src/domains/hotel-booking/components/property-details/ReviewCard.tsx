"use client";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/domains/hotel-booking/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { IReview } from "../../type/review.type";
import { formatDisplayDate } from "../../utils/date-time-utils";

type Props = {
  review: IReview;
};

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <AvatarImage src={review.authorAvatar} alt={review.authorName} className="w-full h-full object-cover" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-medium">{review.authorName}</h4>
          <p className="text-gray-500 text-sm">{formatDisplayDate(review.createdAt)}</p>
        </div>
      </div>

      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>
            <Star className={cn(" text-yellow-500", index < review.overallRating && "fill-yellow-500")} />
          </span>
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
