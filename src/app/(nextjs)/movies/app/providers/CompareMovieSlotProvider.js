"use client";

import { CompareMovieContext } from "@/app/context";
import { useState } from "react";

export default function CompareMovieProvider({ children }) {
  const [compareMovie, setCompareMovie] = useState([{ id: 1 }]);

  return (
    <CompareMovieContext.Provider value={{ compareMovie, setCompareMovie }}>
      {children}
    </CompareMovieContext.Provider>
  );
}
