import { FC, ReactNode } from "react";
interface Props {
  children: ReactNode;
  pricePerNight?: number;
}
const BookingCard: FC<Props> = ({ pricePerNight, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xl font-bold">${pricePerNight}</span>
          <span className="text-gray-600 ml-1">per night</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-star text-yellow-500 mr-1" />
          <span>5</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default BookingCard;
