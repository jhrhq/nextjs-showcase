import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { StarSvg } from "@/components/svg-component/StartSvg";
import Link from "next/link";
import { FaBed, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hotel Listing Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Link href="/details" className="block group">
            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Maldives Paradise"
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
                  <FaBed className="fa-bed inline-block mr-1" />3 Rooms Left
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Maldives Paradise</h3>
                  <div className="flex items-center">
                    <StarSvg />
                    <span className="ml-1 text-zinc-600">4.9</span>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm mt-1">
                  Himmafushi, Maldives
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold">$450</span>
                    <span className="text-zinc-500 text-sm ml-1">
                      per night
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
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
