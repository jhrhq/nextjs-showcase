import { Calendar, CheckCircle2, Clock, Download, MapPin, Receipt, Users } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { UserBookingDTO } from "../mappers/booking.mappers";
import { Button } from "./ui/button";

interface BookingDetailsSheetProps {
  booking: UserBookingDTO;
}

export function BookingDetailsSheet({ booking }: BookingDetailsSheetProps) {
  const { property, priceSummary } = booking;

  const thumbnail =
    typeof property.images?.[0] === "string"
      ? property.images[0]
      : (property.images?.[0]?.url ?? "/images/property-placeholder.jpg");

  const bookingCode = `#${booking.id.slice(-7).toUpperCase()}`;
  const isPending = booking.status.toLowerCase() === "pending";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="bg-primary text-white hover:brightness-90">
          View Trip Details
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6">
        <SheetHeader className="text-left space-y-3">
          <div className="flex items-center justify-between">
            <Badge
              variant={booking.status === "confirmed" ? "default" : "secondary"}
              className={cn(
                "capitalize rounded-full",
                isPending
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              )}
            >
              {isPending ? (
                <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              )}
              {booking.status}
            </Badge>
            <span className="font-mono text-xs text-zinc-500">{bookingCode}</span>
          </div>

          {/* Sheet Hero Image */}
          <div className="relative h-44 w-full overflow-hidden rounded-lg">
            <Image src={thumbnail} alt={property.title} fill className="object-cover" />
          </div>

          <div>
            <SheetTitle className="text-xl font-bold text-zinc-800">{property.title}</SheetTitle>
            {property.location?.city && (
              <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {property.location.city}, {property.location.country}
              </p>
            )}
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {/* Reservation Timeline */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-zinc-800">
            <Calendar className="h-4 w-4" /> Stay Schedule
          </h4>

          <div className="grid grid-cols-2 gap-3 rounded-lg bg-zinc-50 p-3 text-zinc-700">
            <div>
              <p className="text-xs text-zinc-500 font-medium">Check-in</p>
              <p className="text-sm font-semibold mt-0.5">
                {new Date(booking.checkin).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Check-out</p>
              <p className="text-sm font-semibold mt-0.5">
                {new Date(booking.checkout).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm py-1">
            <span className="flex items-center gap-2 text-zinc-500">
              <Users className="h-4 w-4" /> Total Guests
            </span>
            <span className="font-medium text-zinc-800">{booking.guests} Guest(s)</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Pricing Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-zinc-800">
            <Receipt className="h-4 w-4" /> Payment Details
          </h4>

          <div className="flex justify-between text-sm text-zinc-600">
            <span>Total Amount Paid</span>
            <span className="font-bold text-zinc-900">
              {priceSummary.currency} ${priceSummary.totalCost}
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download PDF Receipt
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
