"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useBookingParams } from "../../hooks/use-booking-params";

type PaymentSummaryCardProps = {
  title: string;
  reviewCount: number;
  imgsrc: string;
  ratingAvg: number;
  pricing: { perNight: number; currency: string; cleaningFee: number; serviceFee: number };
  maxGuests: number;
};

export function PaymentSummaryCard({
  title,
  imgsrc,
  reviewCount,
  ratingAvg,
  pricing,
  maxGuests,
}: PaymentSummaryCardProps) {
  const { perNight, cleaningFee, serviceFee } = pricing;
  const { calculatedNights } = useBookingParams(maxGuests);

  const accommodationCost = perNight * calculatedNights;
  const totalPrice = accommodationCost + cleaningFee + serviceFee;

  return (
    <div className="sticky top-0 mb-8 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-4">
        <Image src={imgsrc} alt={title} width={500} height={500} className="h-20 w-20 rounded-lg object-cover" />

        <div>
          <p className="font-bold">{title}</p>

          <div className="flex items-center">
            <Star className="mr-1 size-4" fill={reviewCount > 0 ? "currentColor" : undefined} />

            <span className="mt-1 text-xs text-zinc-500">
              {ratingAvg} ({reviewCount} {reviewCount === 1 ? "Review" : "Reviews"})
            </span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="mb-4 font-semibold">Price details</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>
              ${perNight} × {calculatedNights} {calculatedNights === 1 ? "night" : "nights"}
            </span>
            <span>${accommodationCost}</span>
          </div>

          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>

          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>

          <div className="flex justify-between border-t pt-3 font-semibold">
            <span>Total (USD)</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
