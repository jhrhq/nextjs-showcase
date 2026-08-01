import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadReceiptButton } from "@/domains/hotel-booking/components/download-receipt-button";
import {
  fetchBookingConfirmationData,
  HelpFooter,
  NextStepsSection,
  PaymentIncompleteAlert,
  PropertyOverviewCard,
  RecordAllocationAlert,
  ReservationSummaryGrid,
  SuccessHeader,
  VerificationErrorAlert,
} from "@/domains/hotel-booking/components/payment/payment-success";

export const metadata: Metadata = {
  title: "Booking Confirmed | Payment Successful",
  description: "Your hotel booking has been confirmed. View your reservation details and receipt.",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function BookingConfirmationPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const rawBookingId = resolvedParams?.id;
  const rawSessionId = resolvedSearchParams?.session_id;

  if (!rawBookingId || !rawSessionId) {
    notFound();
  }

  const result = await fetchBookingConfirmationData(rawBookingId, rawSessionId);

  if (result.status === "INVALID_INPUT" || result.status === "ERROR") {
    return <VerificationErrorAlert title={result.title} description={result.description} />;
  }

  if (result.status === "PAYMENT_INCOMPLETE") {
    return <PaymentIncompleteAlert status={result.paymentStatus} />;
  }

  if (result.status === "RECORD_ALLOCATING") {
    return <RecordAllocationAlert />;
  }

  const { booking, property } = result;

  return (
    <main className="max-w-3xl mx-auto">
      <SuccessHeader />

      <article className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 mb-8">
        <PropertyOverviewCard property={property} />
        <ReservationSummaryGrid booking={booking} />
      </article>

      <NextStepsSection />

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <DownloadReceiptButton
          bookingId={rawBookingId}
          className="px-6 py-3 bg-primary text-primary-foreground hover:brightness-95 active:scale-[0.98] shadow-xs cursor-pointer"
        />
      </div>

      <HelpFooter />
    </main>
  );
}
