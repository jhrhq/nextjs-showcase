"use client";

import { useContext } from "react";
import { CompareMovieContext, type CompareMovieContextType } from "../context-providers/CompareMovieSlotProvider";

const useCompare = (): CompareMovieContextType => {
  const context = useContext(CompareMovieContext);

  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareMovieProvider");
  }

  return context;
};

export default useCompare;
