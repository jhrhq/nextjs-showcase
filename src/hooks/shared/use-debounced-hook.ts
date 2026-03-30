import { useEffect, useRef, useState } from "react";

export function useDeboucedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function useDebounceEffect(effect: () => (() => void) | undefined, deps: React.DependencyList, delay: number) {
  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const handler = setTimeout(() => {
      cleanup = effectRef.current();
    }, delay);

    return () => {
      clearTimeout(handler);
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, [...deps, delay]);
}
