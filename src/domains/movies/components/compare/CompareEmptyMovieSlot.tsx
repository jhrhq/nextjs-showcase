// biome-ignore-all lint/a11y/useSemanticElements: false flag
// biome-ignore-all lint/a11y/useFocusableInteractive: false flag
"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CompareAddMovieActionCard from "@/domains/movies/components/compare/CompareAddMovieActionCard";
import CompareSelectedMovieCard from "@/domains/movies/components/compare/CompareSelectedMovieCard";
import useCompare from "@/domains/movies/hooks/useCompare";
import type { TMDBMovie } from "../../types/tmdb-movie.types";

type Props = {
  id: number;
  movie?: TMDBMovie;
};
const CompareEmptyMovieSlot = ({ id, movie }: Props) => {
  const { setCompareMovie } = useCompare();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemove = () => {
    setCompareMovie((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col min-h-105 shadow-sm transition-all relative">
      <div className="flex justify-end mb-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleRemove}
          className="h-8 w-8 rounded-full bg-secondary/50 border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors cursor-pointer"
          aria-label="Remove slot"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {movie ? (
        <div className="grow flex flex-col justify-center">
          <CompareSelectedMovieCard {...movie} />
        </div>
      ) : (
        <div
          role="button"
          onClick={() => setIsDialogOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsDialogOpen(true);
            }
          }}
          className="grow flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border hover:border-primary/50 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-all cursor-pointer group"
        >
          <div className="space-y-3 pointer-events-none">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              No movie selected for this slot yet.
            </p>
            <div className="inline-block pointer-events-auto">
              <CompareAddMovieActionCard
                compareId={id}
                externalOpen={isDialogOpen}
                onExternalOpenChange={setIsDialogOpen}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareEmptyMovieSlot;
