import type { Metadata } from "next";
import { Suspense } from "react";
import BackToPreviousPage from "@/domains/hotel-booking/components/back-to-previous-page";
import PropertyBooked from "@/domains/hotel-booking/components/booked";
import Footer from "@/domains/hotel-booking/components/Footer";
import EditTripInfo from "@/domains/hotel-booking/components/payment/edit-trip-info";
import PaymentForm from "@/domains/hotel-booking/components/payment/payment-form";
import { PaymentSummaryCard } from "@/domains/hotel-booking/components/payment/payment-summary-card";
import { connectToDatabase } from "@/domains/hotel-booking/config/database";
import { getSelectedPropertyBookinDetails, getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";
import SpinnerEllipsis from "@/ui/shared/spinner-ellipsis";

type SearchParams = {
  checkin?: string;
  checkout?: string;
  guests?: string;
  [key: string]: string | string[] | undefined;
};

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export const metadata: Metadata = {
  title: "Request to Book | Hotel Booking",
  description: "Review your trip details, dates, and price breakdown before submitting your booking request.",
  robots: {
    index: false,
    follow: false,
  },
};

const PaymentProcess = async ({ params }: Props) => {
  await connectToDatabase();

  const { id } = await params;
  const bookingData = await getSelectedPropertyBookinDetails(id);
  const property = await getSelectedPropertyDetails(id);

  if (!property) return null;

  let isBooked = false;
  if (bookingData) {
    const isPaidOrConfirmed = bookingData.status === "confirmed";

    const now = new Date();
    const checkoutDate = new Date(bookingData.checkout);
    const checkinDate = new Date(bookingData.checkin);
    isBooked = isPaidOrConfirmed && checkoutDate > now && checkinDate <= now;
  }

  if (bookingData && isBooked) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
        <PropertyBooked existingBooking={bookingData} />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <BackToPreviousPage />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <EditTripInfo maxGuests={property.capacity.guests} />
            <Suspense fallback={<SpinnerEllipsis />}>
              <PaymentForm
                maxGuests={property.capacity.guests}
                pricing={property.pricing}
                propertyId={property._id.toString()}
              />
            </Suspense>
          </div>
          <div>
            <PaymentSummaryCard
              title={property.title}
              imgsrc={property.images[0].url}
              reviewCount={property.reviewCount}
              ratingAvg={property.ratingAvg}
              pricing={property.pricing}
              maxGuests={property.capacity.guests}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentProcess;
