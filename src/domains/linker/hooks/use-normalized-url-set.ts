import { useMemo } from "react";
import { compactMap, normalizeUrl } from "../ui/custom-network/excercise/url-utils";

export function useNormalizedSet(urls: string[]): Set<string> {
  return useMemo(() => {
    return new Set(compactMap(urls, normalizeUrl));
  }, [urls]);
}
