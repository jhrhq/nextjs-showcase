"use client";

import { toast } from "sonner";
import { Button } from "@/domains/movies/components/ui/button";
import useCompare from "@/domains/movies/hooks/useCompare";

const AddCompareMovieSlotButton = () => {
  const { compareMovie, setCompareMovie } = useCompare();
  const addCompareSlot = () => {
    if (compareMovie.length == 0) {
      setCompareMovie([{ id: 1 }]);
    } else if (compareMovie.length == 1) {
      setCompareMovie([...compareMovie, { id: 2 }]);
    } else if (compareMovie.length == 2) {
      setCompareMovie([...compareMovie, { id: 3 }]);
    } else {
      toast.success("Please remove a slot before add one.");
    }
  };

  return (
    <Button
      onClick={addCompareSlot}
      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
    >
      Add Movie +
    </Button>
  );
};

export default AddCompareMovieSlotButton;
