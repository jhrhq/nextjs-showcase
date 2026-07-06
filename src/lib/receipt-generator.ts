// lib/receipt-generator.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface ReceiptProps {
  id: string;
  guestName: string;
  hotelTitle: string;
  nights: number;
  totalPrice: number;
  cleaningFee: number;
  serviceFee: number;
}

export async function generateReceiptPdf(data: ReceiptProps): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 700]);
  const { width, height } = page.getSize();

  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Structural Branding Header
  page.drawText("MINI-AIRBNB HOMESTAYS INC.", {
    x: 50,
    y: height - 60,
    size: 20,
    font: fontBold,
    color: rgb(0.88, 0.22, 0.33),
  });
  page.drawText(`Invoice Reference ID: ${data.id}`, {
    x: 50,
    y: height - 85,
    size: 10,
    font: fontHelvetica,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Divider Stroke Line
  page.drawLine({
    start: { x: 50, y: height - 105 },
    end: { x: width - 50, y: height - 105 },
    strokeWidth: 1,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Guest Billing Identity Parameters
  page.drawText("ISSUED TO:", { x: 50, y: height - 135, size: 10, font: fontBold });
  page.drawText(`Guest Name: ${data.guestName}`, { x: 50, y: height - 150, size: 12, font: fontHelvetica });
  page.drawText(`Selected Lodging: ${data.hotelTitle}`, { x: 50, y: height - 165, size: 12, font: fontHelvetica });
  page.drawText(`Duration Sequence: ${data.nights} Nights Registered`, {
    x: 50,
    y: height - 180,
    size: 12,
    font: fontHelvetica,
  });

  // Transaction Ledger Table Calculations
  let currentY = height - 240;
  page.drawText("TRANSACTION BALANCE SUMMARY", { x: 50, y: currentY, size: 11, font: fontBold });

  const writeLedgerRow = (label: string, value: string, isBold = false) => {
    currentY -= 20;
    page.drawText(label, { x: 50, y: currentY, size: 11, font: isBold ? fontBold : fontHelvetica });
    page.drawText(value, { x: width - 120, y: currentY, size: 11, font: isBold ? fontBold : fontHelvetica });
  };

  writeLedgerRow("Base Operational Tariff", `$${data.totalPrice - data.cleaningFee - data.serviceFee}`);
  writeLedgerRow("Cleaning Fee Allocation", `$${data.cleaningFee}`);
  writeLedgerRow("Service Fee Allocation", `$${data.serviceFee}`);

  page.drawLine({
    start: { x: 50, y: currentY - 10 },
    end: { x: width - 50, y: currentY - 10 },
    strokeWidth: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  currentY -= 15;
  writeLedgerRow("Gross Account Total", `$${data.totalPrice}`, true);

  return await pdfDoc.save();
}
