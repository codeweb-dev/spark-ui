"use client";

import { Pagination, usePaginationState } from "@/registry/spark-ui/pagination";

export default function PaginationDemo() {
  const pagination = usePaginationState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <Pagination
        totalPages={totalPages}
        currentPage={pagination.page}
        onPageChange={pagination.setPage}
        color="default"
        showEdges
      />
    </div>
  );
}
