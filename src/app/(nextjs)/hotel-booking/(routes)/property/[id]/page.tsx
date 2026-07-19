import Footer from "@/domains/hotel-booking/components/Footer";
import Navbar from "@/domains/hotel-booking/components/navbar";
import BookingCard from "@/domains/hotel-booking/components/property-details/BookingCard";
import { BookingForm } from "@/domains/hotel-booking/components/property-details/BookingForm";
import PropertyAmenities from "@/domains/hotel-booking/components/property-details/PropertyAmenities";
import PropertyFeatures from "@/domains/hotel-booking/components/property-details/PropertyFeatures";
import PropertyHeader from "@/domains/hotel-booking/components/property-details/PropertyHeader";
import PropertyImages from "@/domains/hotel-booking/components/property-details/PropertyImages";
import ReviewContainer from "@/domains/hotel-booking/components/property-details/ReviewContainer";
import ReviewHeader from "@/domains/hotel-booking/components/property-details/ReviewHeader";
import { getSelectedPropertyBookinDetails, getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const PropertyDetails = async ({ params }: Props) => {
  const { id } = await params;
  const bookingData = await getSelectedPropertyBookinDetails(id);
  const data = await getSelectedPropertyDetails(id);
  if (!data) return null;
  const isBooked = !!bookingData || false;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PropertyHeader
          name={data.title}
          rating={data.ratingAvg}
          reviews={data.reviewCount}
          location={data.location.address || ""}
        />

        {/* Image Gallery */}
        <PropertyImages images={data?.images} title={data.title} />
        {/* Property Details */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column: Property Description */}
          <div className="col-span-2">
            <PropertyFeatures sellerName={data.host.name} rooms={data.capacity.bedrooms} beds={data.capacity.beds} />
            {/* Amenities */}
            <PropertyAmenities description={data?.description} amenities={data?.amenities} />
          </div>
          {/* Right Column: Booking Card */}
          <div>
            <BookingCard pricePerNight={data?.pricing.perNight} rating={data?.ratingAvg}>
              <BookingForm isBooked={isBooked} />
            </BookingCard>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        <div className="grid items-center justify-between mb-8 grid-cols-2">
          <ReviewHeader rating={data?.ratingAvg} reviews={data?.reviewCount} />

          <ReviewContainer propertyId={data?._id.toString()} reviews={data.recentReviews} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PropertyDetails;
