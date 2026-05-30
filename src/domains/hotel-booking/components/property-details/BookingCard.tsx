import type { ReactNode } from "react";
import { FaStar } from "react-icons/fa6";
interface Props {
  children: ReactNode;
  pricePerNight?: number;
  rating?: number;
}
const BookingCard = ({ pricePerNight, rating, children }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xl font-bold">${pricePerNight}</span>
          <span className="text-gray-600 ml-1">per night</span>
        </div>
        <div className="flex items-center">
          <FaStar className="fas fa-star text-yellow-500 mr-1" />
          <span>{rating}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default BookingCard;
