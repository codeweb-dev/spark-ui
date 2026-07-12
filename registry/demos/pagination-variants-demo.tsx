"use client";

import type { PaginationVariant } from "@/registry/spark-ui/pagination";
import {
  Pagination,
  usePaginationState,
} from "@/registry/spark-ui/pagination";

const variants: {
  variant: PaginationVariant;
  label: string;
}[] = [
  { variant: "solid", label: "Solid" },
  { variant: "outline", label: "Outline" },
  { variant: "ghost", label: "Ghost" },
  { variant: "squircle", label: "Squircle" },
];

function PaginationVariantItem({
  variant,
  label,
}: {
  variant: PaginationVariant;
  label: string;
}) {
  const pagination = usePaginationState(1);
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <Pagination
        totalPages={10}
        currentPage={pagination.page}
        onPageChange={pagination.setPage}
        variant={variant}
        color="default"
        showEdges
      />
    </div>
  );
}

export default function PaginationVariants() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      {variants.map((v) => (
        <PaginationVariantItem
          key={v.variant}
          variant={v.variant}
          label={v.label}
        />
      ))}
    </div>
  );
}
