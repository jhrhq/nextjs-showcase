import { CompareMovieContext } from "@/app/context";
import { useContext } from "react";

const useCompare = () => {
  const { compareMovie, setCompareMovie } = useContext(CompareMovieContext);

  return { compareMovie, setCompareMovie };
};

export default useCompare;
