import { Calendar, CheckCircle2, Clock, MapPin, Receipt, Users } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { UserBookingDTO } from "../../mappers/booking.mappers";
import { DownloadReceiptButton } from "../download-receipt-button";

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
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          View Trip Details
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6 bg-background text-foreground border-border">
        <SheetHeader className="text-left space-y-3 p-0">
          <div className="flex items-center justify-between pr-4">
            <Badge
              variant={booking.status === "confirmed" ? "default" : "secondary"}
              className={cn(
                "capitalize rounded-full border",
                isPending
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
              )}
            >
              {isPending ? (
                <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              )}
              {booking.status}
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">{bookingCode}</span>
          </div>

          {/* Sheet Hero Image */}
          <div className="relative h-44 w-full overflow-hidden rounded-lg bg-muted">
            <Image src={thumbnail} alt={property.title} fill className="object-cover" />
          </div>

          <div>
            <SheetTitle className="text-xl font-bold text-foreground">{property.title}</SheetTitle>
            {property.location?.city && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {property.location.city}, {property.location.country}
              </p>
            )}
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {/* Reservation Timeline */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Calendar className="size-4" /> Stay Schedule
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg bg-muted p-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Check-in</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {new Date(booking.checkin).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Check-out</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {new Date(booking.checkout).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm py-1">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4" /> Total Guests
            </span>
            <span className="font-medium text-foreground">{booking.guests} Guest(s)</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Pricing Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Receipt className="size-4" /> Payment Details
          </h4>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total Amount Paid</span>
            <span className="font-bold text-foreground">${priceSummary.totalCost}</span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="space-y-2">
          <DownloadReceiptButton bookingId={booking.id} label="Download PDF Receipt" className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
