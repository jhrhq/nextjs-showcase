"use client";
import CompareAddMovieAction from "@/app/_components/_compare/CompareAddMovieAction";
import useCompare from "@/app/hooks/useCompare";
import CompareSelectedMovieCard from "@/components/compare/CompareSelectedMovieCard";
import { Button } from "@/components/ui/button";

const CompareEmptyMovieSlot = ({ id, movie }) => {
  const { setCompareMovie } = useCompare();

  const handleRemove = () => {
    setCompareMovie((prev) => prev.filter((m) => m.id !== id));
  };
  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleRemove}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </Button>
      </div>

      {movie ? (
        <CompareSelectedMovieCard {...movie} />
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <CompareAddMovieAction compareId={id} />
        </div>
      )}
    </div>
  );
};

export default CompareEmptyMovieSlot;
