"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";

type Props<T> = {
  query: UseQueryResult<T>;
  children: (data: T) => ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  emptyFallback?: ReactNode;
  isEmpty?: (data: T) => boolean;
};

export function QueryBoundary<T>({
  query,
  children,
  loadingFallback = <div>Loading...</div>,
  errorFallback = <div>Error</div>,
  emptyFallback = <div>Empty</div>,
  isEmpty,
}: Props<T>) {
  if (query.isLoading) {
    return loadingFallback;
  }

  if (query.isError) {
    return errorFallback;
  }

  if (!query.data) {
    return emptyFallback;
  }

  if (isEmpty?.(query.data)) {
    return emptyFallback;
  }

  return (
    <>
      {query.isFetching && <div>Refreshing...</div>}

      {children(query.data)}
    </>
  );
}
