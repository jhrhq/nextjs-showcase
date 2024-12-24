import { useEffect, useRef, useState } from "react";

const useDebounce = (callback, delay) => {
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
  return debouncedCallback;
};

export default useDebounce;

export function useDebouncedValue(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, value]);

  return debouncedValue;
}
