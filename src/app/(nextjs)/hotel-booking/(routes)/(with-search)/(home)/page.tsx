import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/domains/hotel-booking/components/Footer";
import PropertyPagination from "@/domains/hotel-booking/components/homepage/Pagination";
import PropertyCard from "@/domains/hotel-booking/components/homepage/PropertyCard";
import ResultsNotFound from "@/domains/hotel-booking/components/homepage/ResultsNotFound";
import { getAllProperties } from "@/domains/hotel-booking/db/queries";
import LoadingSkeleton from "./loading";

export const metadata: Metadata = {
  title: "Explore Hotels & Vacation Rentals | Hotel Booking",
  description:
    "Browse and book unique stays, boutique hotel rooms, cozy cabins, and luxury penthouses around the world.",
  openGraph: {
    title: "Explore Hotels & Vacation Rentals | Hotel Booking",
    description:
      "Browse and book unique stays, boutique hotel rooms, cozy cabins, and luxury penthouses around the world.",
    type: "website",
  },
};

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const currentPageSize = Math.max(1, Number(params.pageSize) || 8);
  const currentSearch = (Array.isArray(params.search) ? params.search[0] : params.search)?.trim() ?? "";

  const suspenseKey = `${currentPage}-${currentPageSize}-${currentSearch}`;

  return (
    <>
      <Suspense key={suspenseKey} fallback={<LoadingSkeleton />}>
        <PropertyList currentPage={currentPage} currentPageSize={currentPageSize} currentSearch={currentSearch} />
      </Suspense>

      <Footer />
    </>
  );
}

async function PropertyList({
  currentPage,
  currentPageSize,
  currentSearch,
}: {
  currentPage: number;
  currentPageSize: number;
  currentSearch: string;
}) {
  const { allProperties: properties, total } = await getAllProperties(currentPage, currentPageSize, currentSearch);

  const showPagination = total > currentPageSize;

  return (
    <>
      <section className="px-6">
        {properties.length === 0 ? (
          <ResultsNotFound searchTerm={currentSearch} />
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property._id.toString()} property={property} />
            ))}
          </div>
        )}
      </section>

      {showPagination && <PropertyPagination page={currentPage} pageSize={currentPageSize} totalItems={total} />}
    </>
  );
}
