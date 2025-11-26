"use client";
import React from "react";

function Revealable({ children }) {
  const [isRevealed, setIsRevealed] = React.useState(false);

  return (
    <>
      {isRevealed ? children : null}{" "}
      <div className="reveal">
        <button onClick={() => setIsRevealed((prev) => !prev)}>
          {isRevealed ? "Hide Content" : "Reveal Content"}
        </button>
      </div>
    </>
  );
}

export default Revealable;
