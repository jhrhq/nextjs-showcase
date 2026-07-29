import Footer from "@/domains/hotel-booking/components/Footer";
import PropertyPagination from "@/domains/hotel-booking/components/homepage/Pagination";
import PropertyCard from "@/domains/hotel-booking/components/homepage/PropertyCard";
import ResultsNotFound from "@/domains/hotel-booking/components/homepage/ResultsNotFound";
import { getAllProperties } from "@/domains/hotel-booking/db/queries";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page, pageSize, search } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);
  const currentPageSize = Math.max(1, Number(pageSize) || 8);
  // normalise search — handles string | string[] | undefined
  const currentSearch = (Array.isArray(search) ? search[0] : search)?.trim() ?? "";

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

      <Footer />
    </>
  );
}
