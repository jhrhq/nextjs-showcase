import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

import Footer from "@/domains/hotel-booking/components/Footer";
import BookingCard from "@/domains/hotel-booking/components/property-details/BookingCard";
import { BookingForm } from "@/domains/hotel-booking/components/property-details/BookingForm";
import PropertyAmenities from "@/domains/hotel-booking/components/property-details/PropertyAmenities";
import PropertyFeatures from "@/domains/hotel-booking/components/property-details/PropertyFeatures";
import PropertyHeader from "@/domains/hotel-booking/components/property-details/PropertyHeader";
import PropertyImages from "@/domains/hotel-booking/components/property-details/PropertyImages";
import ReviewContainer from "@/domains/hotel-booking/components/property-details/ReviewContainer";
import ReviewHeader from "@/domains/hotel-booking/components/property-details/ReviewHeader";
import ReviewsSkeleton from "@/domains/hotel-booking/components/property-details/review-skeleton";
import { getSelectedPropertyBookinDetails, getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getSelectedPropertyDetails(id);

  if (!data) {
    return {
      title: "Property Not Found | Hotel Booking",
      description: "The requested property listing could not be found.",
    };
  }

  const locationText = data.location?.address ? ` in ${data.location.address}` : "";
  const pageTitle = `${data.title}${locationText} | Hotel Booking`;

  const coverImage =
    Array.isArray(data.images) && data.images.length > 0
      ? typeof data.images[0] === "string"
        ? data.images[0]
        : data.images[0]?.url
      : undefined;

  return {
    title: pageTitle,
    description: data.description,
    openGraph: {
      title: pageTitle,
      description: data.description,
      images: coverImage ? [{ url: coverImage, alt: data.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: data.description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

const PropertyDetails = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { id } = await params;
  const bookingData = await getSelectedPropertyBookinDetails(id);
  const data = await getSelectedPropertyDetails(id);
  if (!data) return null;
  let isBooked = false;

  const userId = session?.user.id;
  const isHost = userId === data.host.userId.toString();

  if (bookingData) {
    const now = new Date();
    const checkoutDate = new Date(bookingData.checkout);
    const checkinDate = new Date(bookingData.checkin);
    isBooked = checkoutDate > now && checkinDate <= now;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PropertyHeader
          name={data.title}
          rating={data.ratingAvg}
          reviews={data.reviewCount}
          location={data.location.address || ""}
        />

        <PropertyImages images={data?.images} title={data.title} />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <PropertyFeatures sellerName={data.host.name} rooms={data.capacity.bedrooms} beds={data.capacity.beds} />
            <PropertyAmenities description={data?.description} amenities={data?.amenities} />
          </div>
          <div>
            <BookingCard pricePerNight={data?.pricing.perNight} rating={data?.ratingAvg}>
              <BookingForm
                isBooked={isBooked}
                guests={bookingData ? bookingData.guests : data.capacity.guests}
                maxGuests={data.capacity.guests}
                checkin={isBooked ? bookingData?.checkin : undefined}
                checkout={isBooked ? bookingData?.checkout : undefined}
              />
            </BookingCard>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        <Suspense fallback={<ReviewsSkeleton />}>
          <div className="grid items-center justify-between mb-8 grid-cols-2">
            <ReviewHeader rating={data?.ratingAvg} reviews={data?.reviewCount} />
            <ReviewContainer
              propertyId={data?._id.toString()}
              bookingId={bookingData?._id.toString()}
              isHost={isHost}
              userId={userId}
            />
          </div>
        </Suspense>
      </div>

      <Footer />
    </>
  );
};

export default PropertyDetails;
