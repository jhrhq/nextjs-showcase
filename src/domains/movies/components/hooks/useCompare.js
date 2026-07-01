import { useContext } from "react";
import { CompareMovieContext } from "@/domains/movies/context-providers/CompareMovieSlotProvider";

const useCompare = () => {
  const { compareMovie, setCompareMovie } = useContext(CompareMovieContext);

  return { compareMovie, setCompareMovie };
};

export default useCompare;
