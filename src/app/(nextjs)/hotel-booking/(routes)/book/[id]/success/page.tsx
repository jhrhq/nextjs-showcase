import { format } from "date-fns";
import { Briefcase, CheckCircle2, Mail, MessageSquareText, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { DownloadReceiptButton } from "@/domains/hotel-booking/components/download-receipt-button";
import { connectToDatabase } from "@/domains/hotel-booking/config/database";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import { getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";
import { Booking } from "@/domains/hotel-booking/models";
import { stripe } from "@/lib/stripe-configs/stripe";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function BookingConfirmationPage({ params, searchParams }: PageProps) {
  const { id: bookignId } = await params;
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect(AUTH_CONFIG.ROUTES.HOME);
  }

  await connectToDatabase();

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status === "complete" && session.payment_status === "paid") {
      const confirmedBooking = await Booking.findOneAndUpdate(
        { "paymentInfo.stripeSessionId": session_id },
        {
          $set: {
            status: "confirmed",
            "paymentInfo.stripePaymentIntentId": session.payment_intent as string,
            "paymentInfo.amountPaid": (session.amount_total ?? 0) / 100,
            "paymentInfo.paidAt": new Date(),
          },
        },
        { new: true }
      );
      const property = await getSelectedPropertyDetails(confirmedBooking?.propertyId);
      if (!confirmedBooking) {
        return (
          <div className="max-w-md mx-auto my-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-center">
            <h1 className="text-lg font-bold text-amber-800 dark:text-amber-400">Processing Record Allocation</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
              Payment verified, but the local data record allocation is finishing. Refresh briefly.
            </p>
          </div>
        );
      }

      return (
        <main className="max-w-3xl mx-auto">
          {/* Success Message Section */}
          <section className="text-center my-12">
            <div className="inline-block p-4 bg-green-100 dark:bg-green-950/30 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary animate-scale-in" />
            </div>
            <h1 className="text-3xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-zinc-50">
              Payment Successful!
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Your booking has been confirmed. Check your email for details.
            </p>
          </section>

          {/* Booking Details Card */}
          <article className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <Image
                src={
                  property?.images[0].url ||
                  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop"
                }
                alt="Property View"
                height={128}
                width={128}
                className="w-32 h-32 rounded-lg object-cover sm:w-32"
              />
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                  {property?.title || "Sea View Room"}
                </h2>
                <div className="flex items-center mb-2 gap-1">
                  <Star className="w-4 h-4 fill-zinc-800 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {property?.ratingAvg} ({property?.reviewCount}+ reviews)
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base text-ellipsis">
                  {property?.description}
                </p>
              </div>
            </div>

            {/* Reservation Details & Payment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Reservation Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">Check-in</span>
                    <span className="text-zinc-900 dark:text-zinc-200 text-sm font-medium">
                      {format(new Date(confirmedBooking.checkin), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">Check-out</span>
                    <span className="text-zinc-900 dark:text-zinc-200 text-sm font-medium">
                      {format(new Date(confirmedBooking.checkout), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">Guests</span>
                    <span className="text-zinc-900 dark:text-zinc-200 text-sm font-medium">
                      {confirmedBooking.guests} {confirmedBooking.guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">Total amount paid</span>
                    <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                      ${confirmedBooking.priceSummary.totalCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Booking ID</span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 select-all bg-zinc-50 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
                      {String(confirmedBooking._id)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Next Steps List */}
          <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Next Steps</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-primary mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Check your email</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    We&apos;ve sent your confirmation and trip details to your email address.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-primary mt-0.5">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Message your host</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Introduce yourself and let them know your travel plans.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-primary mt-0.5">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Plan your trip</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Review house rules and check-in instructions in your trip details.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DownloadReceiptButton
              bookingId={bookignId}
              className="px-6 py-3 bg-primary text-primary-foreground hover:brightness-95 active:scale-[0.98] shadow-xs cursor-pointer"
              iconClassName="text-zinc-500"
            />
          </div>

          {/* Need Help Section */}
          <footer className="mt-12 text-center pb-6">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">Need help with your booking?</p>
            <a
              href={AUTH_CONFIG.ROUTES.HOME}
              className="text-primary font-medium hover:underline text-sm inline-block mt-1"
            >
              Visit our Help Center
            </a>
          </footer>
        </main>
      );
    }

    // Payment Intent Pending or Incomplete Layout
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-xl text-center">
        <h1 className="font-bold text-red-800 dark:text-red-400">Payment Not Complete</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          The status checked out as: {session.payment_status}
        </p>
      </div>
    );
  } catch (err) {
    console.error("System Sync Failure:", err);
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center">
        <h1 className="font-bold text-gray-800 dark:text-zinc-200">Verification Interrupted</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
          Please refresh the interface to attempt checking verification status again.
        </p>
      </div>
    );
  }
}
