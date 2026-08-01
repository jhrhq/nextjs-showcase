import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BookingCard } from "@/domains/hotel-booking/components/bookings/booking-card";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import { getUserBookings } from "@/domains/hotel-booking/db/queries";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Bookings | Hotel Booking",
  description: "View and manage your upcoming hotel reservations, trip details, and receipts.",
};

const Bookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect(`${AUTH_CONFIG.ROUTES.HOME}?callbackUrl=/bookings`);
  }

  const bookings = await getUserBookings(session.user.id);
  return (
    <>
      {bookings.length === 0 ? (
        <div id="empty-state" className="hidden text-center py-12">
          {/*<img src="./no-bookings-icon.svg" alt="No Bookings" className="mx-auto mb-4 w-32 h-32" />*/}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
          <p className="text-zinc-500 text-sm">You haven&apos;t made any bookings. Start exploring amazing stays!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
