import { format } from "date-fns";
import { Briefcase, CheckCircle2, Mail, MessageSquareText, Star } from "lucide-react";
import Image from "next/image";
import type Stripe from "stripe";
import { z } from "zod";
import { createBookingFromSessionAction } from "@/domains/hotel-booking/actions/booking.action";
import { formatBookingCode } from "@/domains/hotel-booking/components/bookings/booking-card";
import { connectToDatabase } from "@/domains/hotel-booking/config/database";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import { getSelectedPropertyDetails } from "@/domains/hotel-booking/db/queries";
import { Booking } from "@/domains/hotel-booking/models";
import { stripe } from "@/lib/stripe-configs/stripe";
import type { IBooking } from "../../type/booking.type";
import type { IProperty } from "../../type/property.type";

export const metadata = {
  title: "Booking Confirmation",
  description: "View your hotel booking details and confirmation receipt.",
};

const DEFAULT_PROPERTY_IMAGE = "/placeholder.svg";

const ConfirmationParamsSchema = z.object({
  bookingId: z.string().regex(/^[a-f\d]{24}$/i, "The provided booking reference ID is invalid."),
  sessionId: z.string().min(1, "Stripe session ID is required."),
});

type ConfirmationResult =
  | { status: "SUCCESS"; booking: IBooking; property: IProperty | null }
  | { status: "RECORD_ALLOCATING" }
  | { status: "PAYMENT_INCOMPLETE"; paymentStatus: string }
  | { status: "INVALID_INPUT"; title: string; description: string }
  | { status: "ERROR"; title: string; description: string };

export async function fetchBookingConfirmationData(
  rawBookingId: string,
  rawSessionId: string
): Promise<ConfirmationResult> {
  const parsed = ConfirmationParamsSchema.safeParse({
    bookingId: rawBookingId,
    sessionId: rawSessionId,
  });

  if (!parsed.success) {
    return {
      status: "INVALID_INPUT",
      title: "Invalid Booking Reference",
      description: parsed.error.issues[0]?.message || "The booking ID format is invalid.",
    };
  }

  const { bookingId, sessionId } = parsed.data;

  try {
    await connectToDatabase();

    try {
      await createBookingFromSessionAction(sessionId);
    } catch (actionErr) {
      console.error("Non-critical sync warning:", actionErr);
    }

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (stripeErr) {
      console.error("Stripe retrieval error:", stripeErr);
      return {
        status: "ERROR",
        title: "Payment Verification Failed",
        description: "Unable to verify payment status with Stripe. Please refresh to try again.",
      };
    }

    if (session.status !== "complete" || session.payment_status !== "paid") {
      return {
        status: "PAYMENT_INCOMPLETE",
        paymentStatus: session.payment_status || "incomplete",
      };
    }

    const confirmedBooking = await Booking.findOne({
      propertyId: bookingId,
      "paymentInfo.stripeSessionId": sessionId,
    });

    if (!confirmedBooking) {
      return { status: "RECORD_ALLOCATING" };
    }

    let property = null;
    try {
      property = await getSelectedPropertyDetails(confirmedBooking.propertyId);
    } catch (propertyErr) {
      console.error("Property lookup error:", propertyErr);
    }

    return {
      status: "SUCCESS",
      booking: confirmedBooking,
      property,
    };
  } catch (err) {
    console.error("System Sync Failure:", err);
    return {
      status: "ERROR",
      title: "Verification Interrupted",
      description: "Please refresh the interface to attempt checking verification status again.",
    };
  }
}

export function RecordAllocationAlert() {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-center">
      <h1 className="text-lg font-bold text-amber-800 dark:text-amber-400">Processing Record Allocation</h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
        Payment verified, but the local data record allocation is finishing. Refresh briefly.
      </p>
    </div>
  );
}

export function PaymentIncompleteAlert({ status }: { status: string }) {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-xl text-center">
      <h1 className="font-bold text-red-800 dark:text-red-400">Payment Not Complete</h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">The status checked out as: {status}</p>
    </div>
  );
}

export function VerificationErrorAlert({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center">
      <h1 className="font-bold text-gray-800 dark:text-zinc-200">{title || "Verification Interrupted"}</h1>
      <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
        {description || "Please refresh the interface to attempt checking verification status again."}
      </p>
    </div>
  );
}

export function SuccessHeader() {
  return (
    <section className="text-center my-12">
      <div className="inline-block p-4 bg-green-100 dark:bg-green-950/30 rounded-full mb-6">
        <CheckCircle2 className="w-10 h-10 text-primary animate-scale-in" />
      </div>
      <h1 className="text-3xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-zinc-50">Payment Successful!</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        Your booking has been confirmed. Check your email for details.
      </p>
    </section>
  );
}

export function PropertyOverviewCard({ property }: { property: IProperty | null }) {
  const imageUrl = property?.images?.[0]?.url || DEFAULT_PROPERTY_IMAGE;
  const title = property?.title || "Sea View Room";
  const ratingAvg = property?.ratingAvg ?? 0;
  const reviewCount = property?.reviewCount ?? 0;
  const description = property?.description ?? "";

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
      <Image
        src={imageUrl}
        alt="Property View"
        height={128}
        width={128}
        className="w-32 h-32 rounded-lg object-cover sm:w-32"
      />
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50">{title}</h2>
        <div className="flex items-center mb-2 gap-1">
          <Star className="w-4 h-4 fill-zinc-800 text-zinc-800" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {ratingAvg} ({reviewCount}+ reviews)
          </span>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base text-ellipsis">{description}</p>
      </div>
    </div>
  );
}

export function ReservationSummaryGrid({ booking }: { booking: IBooking }) {
  const checkinFormatted = booking?.checkin ? format(new Date(booking.checkin), "MMM d, yyyy") : "N/A";
  const checkoutFormatted = booking?.checkout ? format(new Date(booking.checkout), "MMM d, yyyy") : "N/A";
  const guestCount = booking?.guests ?? 1;
  const totalCost = booking?.priceSummary?.totalCost?.toFixed(2) ?? "0.00";
  const bookingCode = booking?._id ? formatBookingCode(String(booking._id)) : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Reservation Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400 text-sm">Check-in</span>
            <span className="text-zinc-900 dark:text-zinc-200 text-sm font-medium">{checkinFormatted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400 text-sm">Check-out</span>
            <span className="text-zinc-900 dark:text-zinc-200 text-sm font-medium">{checkoutFormatted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400 text-sm">Guests</span>
            <span className="text-zinc-900 dark:text-zinc-200 text-sm font-medium">
              {guestCount} {guestCount === 1 ? "guest" : "guests"}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Payment Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-600 dark:text-zinc-400 text-sm">Total amount paid</span>
            <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">${totalCost}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-zinc-600 dark:text-zinc-400">Booking ID</span>
            <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 select-all bg-zinc-50 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
              {bookingCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NextStepsSection() {
  return (
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
  );
}

export function HelpFooter() {
  return (
    <footer className="mt-12 text-center pb-6">
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">Need help with your booking?</p>
      <a href={AUTH_CONFIG.ROUTES.HOME} className="text-primary font-medium hover:underline text-sm inline-block mt-1">
        Visit our Help Center
      </a>
    </footer>
  );
}
