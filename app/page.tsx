import Footer from "@/components/Footer";
import PropertyPagination from "@/components/hompage/Pagination";
import PropertyCard from "@/components/hompage/PropertyCard";
import Navbar from "@/components/Navbar";
import connectDB from "@/config/database";
import { getAllProperties } from "@/db/queries";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default async function Home({
  searchParams: { page = 1, pageSize = 8 },
}) {
  await connectDB();

  const { allProperties: properties, total } = await getAllProperties(
    page,
    pageSize,
  );
  console.log(properties);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hotel Listing Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.length == 0 ? (
            <p className="text-xl text-center">No properties found</p>
          ) : (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </section>

      {/*pagination footer */}
      <PropertyPagination
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
        totalItems={total}
      />
      <div className="mt-8 flex justify-center">
        <nav aria-label="Page navigation">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a
                href="#"
                className="block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <span className="sr-only">Previous</span>
                <FaChevronLeft className="fas fa-chevron-left" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <span className="sr-only">Next</span>
                <FaChevronRight className="fas fa-chevron-right" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
}
