import { useMemo } from "react";
import {
  compactMap,
  normalizeUrl,
} from "../ui/custom-network/create-custom-network/create-custom-network-form/url-utils";

export function useNormalizedSet(urls: string[]): Set<string> {
  return useMemo(() => {
    return new Set(compactMap(urls, normalizeUrl));
  }, [urls]);
}
