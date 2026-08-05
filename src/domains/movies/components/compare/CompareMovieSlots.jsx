"use client";
import { PlusCircle, Search } from "lucide-react";
import CompareEmptyMovieSlot from "@/domains/movies/components/compare/CompareEmptyMovieSlot";
import useCompare from "@/domains/movies/hooks/useCompare";

const CompareMovieSlots = () => {
  const { compareMovie } = useCompare();

  if (compareMovie.length === 0) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-md mx-auto text-center bg-secondary/40 border border-border p-8 rounded-2xl shadow-sm backdrop-blur-sm">
          <div className="flex justify-center items-center gap-3 mb-4 text-primary">
            <PlusCircle className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-3">
            Click on <span className="text-primary inline-flex items-center gap-1">&quot;+ Add Movie&quot;</span> to add
            a slot
          </h1>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed flex items-center justify-center flex-wrap gap-1">
            Then click on{" "}
            <span className="text-primary font-semibold inline-flex items-center gap-1">
              <Search className="w-3.5 h-3.5" />
              &quot;Select Movie&quot;
            </span>{" "}
            to search and add a movie to the slot for comparison.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {compareMovie.map((item) => (
        <CompareEmptyMovieSlot key={item.id} id={item.id} movie={item.movie} />
      ))}
    </div>
  );
};

export default CompareMovieSlots;
