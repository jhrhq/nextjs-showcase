"use client";

import { createContext, useState } from "react";

export const CompareMovieContext = createContext();

export default function CompareMovieProvider({ children }) {
  const [compareMovie, setCompareMovie] = useState([{ id: 1 }]);

  return (
    <CompareMovieContext.Provider value={{ compareMovie, setCompareMovie }}>{children}</CompareMovieContext.Provider>
  );
}
