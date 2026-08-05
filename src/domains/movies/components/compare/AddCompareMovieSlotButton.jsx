"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useCompare from "@/domains/movies/hooks/useCompare";

const AddCompareMovieSlotButton = () => {
  const { compareMovie, setCompareMovie } = useCompare();

  const addCompareSlot = () => {
    if (compareMovie.length < 3) {
      setCompareMovie([...compareMovie, { id: compareMovie.length + 1 }]);
    } else {
      toast.error("Please remove a slot before adding a new one.");
    }
  };

  return (
    <Button
      type="button"
      onClick={addCompareSlot}
      className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-md font-semibold text-sm cursor-pointer"
    >
      <Plus /> Add Movie
    </Button>
  );
};

export default AddCompareMovieSlotButton;
