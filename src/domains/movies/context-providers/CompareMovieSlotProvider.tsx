"use client";

import { createContext, type Dispatch, type ReactNode, type SetStateAction, useState } from "react";
import type { TMDBMovie } from "../types/tmdb-movie.types";

export type CompareMovieItem = {
  id: number;
  movie?: TMDBMovie;
};

export type CompareMovieContextType = {
  compareMovie: CompareMovieItem[];
  setCompareMovie: Dispatch<SetStateAction<CompareMovieItem[]>>;
};

export const CompareMovieContext = createContext<CompareMovieContextType | undefined>(undefined);

export default function CompareMovieProvider({ children }: { children: ReactNode }) {
  const [compareMovie, setCompareMovie] = useState<CompareMovieItem[]>([{ id: 1 }]);

  return (
    <CompareMovieContext.Provider value={{ compareMovie, setCompareMovie }}>{children}</CompareMovieContext.Provider>
  );
}
