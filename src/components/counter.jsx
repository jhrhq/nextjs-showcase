"use client";
import React, { useEffect } from "react";

function Counter() {
  const [count, setCount] = React.useState(null);

  useEffect(() => {
    () => {
      const savedValue = window.localStorage.getItem("saved-count");

      setCount(savedValue ? Number(savedValue) : 0);
    };
  }, []);

  React.useEffect(() => {
    if (typeof count === "number") {
      window.localStorage.setItem("saved-count", count);
    }
  }, [count]);

  return (
    <button className="count-btn" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

export default Counter;
