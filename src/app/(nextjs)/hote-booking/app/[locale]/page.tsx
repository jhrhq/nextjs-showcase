import Footer from "@/components/Footer";
import NoResultsFound from "@/components/homepage/NoResultsFound";
import PropertyPagination from "@/components/homepage/Pagination";
import PropertyCard from "@/components/homepage/PropertyCard";
import Navbar from "@/components/navbar";
import connectDB from "@/config/database";
import { getAllProperties } from "@/db/queries";

export default async function Home({
  searchParams: { page = 1, pageSize = 8, search },
}) {
  await connectDB();

  const { allProperties: properties, total } = await getAllProperties(
    page,
    pageSize,
    search
  );

  const showPagination = total > pageSize;

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hotel Listing Section */}
      {/* <Todo /> */}
      <section className="px-6">
        {properties.length == 0 ? (
          <NoResultsFound searchTerm={search} />
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/*pagination footer */}

      {showPagination && (
        <PropertyPagination
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          totalItems={total}
        />
      )}

      <Footer />
    </>
  );
}
