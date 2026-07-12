"use client";

import * as React from "react";

export function usePaginationState(initialPage = 1) {
  const [page, setPage] = React.useState(initialPage);

  const goToPage = React.useCallback((p: number) => setPage(p), []);
  const nextPage = React.useCallback(() => setPage((p) => p + 1), []);
  const prevPage = React.useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const resetPage = React.useCallback(() => setPage(1), []);

  return {
    page,
    setPage: goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
}
