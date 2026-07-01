"use client";
import CompareEmptyMovieSlot from "@/domains/movies/components/compare/CompareEmptyMovieSlot";
import useCompare from "@/domains/movies/hooks/useCompare";

const CompareMovieSlots = () => {
  const { compareMovie } = useCompare();
  return (
    <>
      {compareMovie.length == 0 ? (
        <div className=" py-16 ">
          <div className="max-w-lg mx-auto ">
            <h1 className="text-3xl font-semibold text-gray-100  lg:text-4xl">
              Click on the <span className="text-red-600">&quot;Add Movie +&quot;</span> to add a slot.
            </h1>
            <p className="mt-6 text-gray-300">
              Then click on <span className="text-red-600">&quot;Select Movie&quot;</span> to search and add to the
              slot.
            </p>
          </div>
        </div>
      ) : (
        compareMovie.map((item) => <CompareEmptyMovieSlot key={item.id} id={item.id} movie={item?.movie} />)
      )}
    </>
  );
};

export default CompareMovieSlots;
