"use client";
import useCompare from "@/app/hooks/useCompare";
import CompareEmptyMovieSlot from "@/components/compare/CompareEmptyMovieSlot";

const CompareMovieSlots = () => {
  const { compareMovie } = useCompare();
  return (
    <>
      {compareMovie.map((item) => (
        <CompareEmptyMovieSlot key={item.id} id={item.id} movie={item?.movie} />
      ))}
    </>
  );
};

export default CompareMovieSlots;
