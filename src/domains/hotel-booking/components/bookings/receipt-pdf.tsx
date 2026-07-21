import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { UserBookingDTO } from "../../mappers/booking.mappers";

const PRIMARY_COLOR = "#009688";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 11,
    color: "#27272a",
    fontFamily: "Helvetica",
  },
  // Top brand accent line
  topBrandBar: {
    height: 4,
    backgroundColor: PRIMARY_COLOR,
    marginBottom: 16,
    borderRadius: 2,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  codeBadge: {
    fontSize: 10,
    color: PRIMARY_COLOR,
    backgroundColor: "#e6f4f3", // Light primary tint
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: "bold",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#18181b",
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: PRIMARY_COLOR,
    paddingLeft: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    color: "#52525b",
  },
  bold: {
    fontWeight: "bold",
    color: "#18181b",
  },
  totalCard: {
    marginTop: 16,
    backgroundColor: "#f4fcfb", // Subtle primary background tint
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#b2e0dc",
    padding: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#18181b",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
});

export function ReceiptPDF({ booking }: { booking: UserBookingDTO }) {
  const { property, priceSummary } = booking;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Accent Bar */}
        <View style={styles.topBrandBar} />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Booking Receipt</Text>
            <Text style={{ fontSize: 9, color: "#71717a", marginTop: 2 }}>
              Issued on {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </Text>
          </View>
          <Text style={styles.codeBadge}>#{booking.id.slice(-7).toUpperCase()}</Text>
        </View>

        {/* Property Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <Text style={styles.bold}>{property.title}</Text>
          {property.location?.city && (
            <Text style={{ color: "#52525b", marginTop: 2 }}>
              {property.location.city}, {property.location.country}
            </Text>
          )}
        </View>

        {/* Reservation Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stay Information</Text>
          <View style={styles.row}>
            <Text>Check-in:</Text>
            <Text style={styles.bold}>
              {new Date(booking.checkin).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Check-out:</Text>
            <Text style={styles.bold}>
              {new Date(booking.checkout).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Guests:</Text>
            <Text style={styles.bold}>{booking.guests} Guest(s)</Text>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount Paid</Text>
            <Text style={styles.totalAmount}>
              {priceSummary.currency} ${priceSummary.totalCost}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
