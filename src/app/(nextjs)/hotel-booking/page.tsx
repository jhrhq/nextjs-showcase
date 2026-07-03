import Footer from "@/domains/hotel-booking/components/Footer";
import NoResultsFound from "@/domains/hotel-booking/components/homepage/NoResultsFound";
import PropertyPagination from "@/domains/hotel-booking/components/homepage/Pagination";
import PropertyCard from "@/domains/hotel-booking/components/homepage/PropertyCard";
import Navbar from "@/domains/hotel-booking/components/navbar";
// import connectDB from "@/domains/hotel-booking/config/database";
// import { getAllProperties } from "@/domains/hotel-booking/db/queries";

interface SearchParams {
  page: number;
  pageSize: number;
  search: string;
}

export default async function Home({
  searchParams
}: {
  searchParams: Promise<SearchParams>
  }) {
  const {page, pageSize, search} = await searchParams
  // await connectDB();

  // const { allProperties: properties, total } = await getAllProperties(page, pageSize, search);

  // const showPagination = total > pageSize;

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hotel Listing Section */}
      {/* <Todo /> */}
      <section className="px-6">
        {/*{properties.length == 0 ? (
          <NoResultsFound searchTerm={search} />
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}*/}
      </section>

      {/*pagination footer */}

      {/*{showPagination && <PropertyPagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />}*/}

      <Footer />
    </>
  );
}
