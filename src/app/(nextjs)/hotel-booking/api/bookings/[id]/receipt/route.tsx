import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { ReceiptPDF } from "@/domains/hotel-booking/components/bookings/receipt-pdf";
import { connectToDatabase } from "@/domains/hotel-booking/config/database";
import { getUserBooking } from "@/domains/hotel-booking/db/queries";
import { auth } from "@/lib/auth";
// 1. Force Node.js runtime for @react-pdf/renderer
export const runtime = "nodejs";
// 2. Prevent caching static PDF responses
export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const rawBooking = await getUserBooking(id);

    if (!rawBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (rawBooking.userId?.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }

    const pdfBuffer = await renderToBuffer(<ReceiptPDF booking={rawBooking} />);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Receipt-${rawBooking.id.slice(-7).toUpperCase()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("[RECEIPT_PDF_ERROR]", error);
    return NextResponse.json({ error: "Failed to generate receipt PDF" }, { status: 500 });
  }
}
