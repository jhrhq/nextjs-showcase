import StarRating from "@/components/StartRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/utils/date-time-utils";
import { FC } from "react";
interface Props {
  _id: string;
  user: string;
  isBooked: boolean;
  property: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewCard: FC<Props> = ({ review }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <img
            src="/api/placeholder/48/48"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div> */}
        <div>
          <h4 className="font-medium">John Smith</h4>
          <p className="text-gray-500 text-sm">
            {formatDate(review.createdAt)}
          </p>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
