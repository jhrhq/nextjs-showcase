"use client";
import CompareAddMovieAction from "@/domains/movies/components/compare/CompareAddMovieAction";
import CompareSelectedMovieCard from "@/domains/movies/components/compare/CompareSelectedMovieCard";
import { Button } from "@/domains/movies/components/ui/button";
import useCompare from "@/domains/movies/hooks/useCompare";

const CompareEmptyMovieSlot = ({ id, movie }) => {
  const { setCompareMovie } = useCompare();

  const handleRemove = () => {
    setCompareMovie((prev) => prev.filter((m) => m.id !== id));
  };
  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-100">
      <div className="flex justify-end mb-4">
        <Button onClick={handleRemove} className="text-gray-400 hover:text-white">
          ✕
        </Button>
      </div>

      {movie ? (
        <CompareSelectedMovieCard {...movie} />
      ) : (
        <div className="grow flex flex-col items-center justify-center">
          <CompareAddMovieAction compareId={id} />
        </div>
      )}
    </div>
  );
};

export default CompareEmptyMovieSlot;
