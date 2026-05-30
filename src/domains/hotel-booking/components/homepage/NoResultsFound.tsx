import { Button } from "@/domains/hotel-booking/components/ui/button";
import Link from "next/link";

const NoResultsFound = ({ searchTerm }: { searchTerm?: string }) => {
  return (
    <div className="container px-6 py-16 mx-auto text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">No Results found for </h1>
        {searchTerm && <p className="text-base mt-2">&quot;{searchTerm}&quot;</p>}
        <p className="mt-6 text-gray-500 dark:text-gray-300 mb-5">Please search with a better title of properties.</p>
        <Button asChild>
          <Link href={"/"}>Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NoResultsFound;
