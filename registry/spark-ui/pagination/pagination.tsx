"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { PaginationColor, PaginationVariant } from "./types";

interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Maximum number of page buttons to show (default: 7) */
  siblingCount?: number;
  /** Color variant */
  color?: PaginationColor;
  /** Visual style */
  variant?: PaginationVariant;
  /** Show first/last page buttons */
  showEdges?: boolean;
  /** Custom className */
  className?: string;
  /** Size of pagination */
  size?: "sm" | "md" | "lg";
}

export type { PaginationProps };

const colorConfig: Record<
  PaginationColor,
  {
    activeBg: string;
    activeText: string;
    activeBorder: string;
    hoverBg: string;
    hoverText: string;
    text: string;
  }
> = {
  default: {
    activeBg: "bg-zinc-900 dark:bg-zinc-100",
    activeText: "text-white dark:text-zinc-900",
    activeBorder: "border-zinc-900 dark:border-zinc-100",
    hoverBg: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
    hoverText: "hover:text-zinc-900 dark:hover:text-zinc-100",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  blue: {
    activeBg: "bg-blue-500",
    activeText: "text-white",
    activeBorder: "border-blue-500",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
    hoverText: "hover:text-blue-600 dark:hover:text-blue-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  purple: {
    activeBg: "bg-purple-500",
    activeText: "text-white",
    activeBorder: "border-purple-500",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-950/30",
    hoverText: "hover:text-purple-600 dark:hover:text-purple-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  pink: {
    activeBg: "bg-pink-500",
    activeText: "text-white",
    activeBorder: "border-pink-500",
    hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-950/30",
    hoverText: "hover:text-pink-600 dark:hover:text-pink-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  red: {
    activeBg: "bg-red-500",
    activeText: "text-white",
    activeBorder: "border-red-500",
    hoverBg: "hover:bg-red-50 dark:hover:bg-red-950/30",
    hoverText: "hover:text-red-600 dark:hover:text-red-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  orange: {
    activeBg: "bg-orange-500",
    activeText: "text-white",
    activeBorder: "border-orange-500",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950/30",
    hoverText: "hover:text-orange-600 dark:hover:text-orange-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  green: {
    activeBg: "bg-green-500",
    activeText: "text-white",
    activeBorder: "border-green-500",
    hoverBg: "hover:bg-green-50 dark:hover:bg-green-950/30",
    hoverText: "hover:text-green-600 dark:hover:text-green-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  teal: {
    activeBg: "bg-teal-500",
    activeText: "text-white",
    activeBorder: "border-teal-500",
    hoverBg: "hover:bg-teal-50 dark:hover:bg-teal-950/30",
    hoverText: "hover:text-teal-600 dark:hover:text-teal-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  cyan: {
    activeBg: "bg-cyan-500",
    activeText: "text-white",
    activeBorder: "border-cyan-500",
    hoverBg: "hover:bg-cyan-50 dark:hover:bg-cyan-950/30",
    hoverText: "hover:text-cyan-600 dark:hover:text-cyan-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  indigo: {
    activeBg: "bg-indigo-500",
    activeText: "text-white",
    activeBorder: "border-indigo-500",
    hoverBg: "hover:bg-indigo-50 dark:hover:bg-indigo-950/30",
    hoverText: "hover:text-indigo-600 dark:hover:text-indigo-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  violet: {
    activeBg: "bg-violet-500",
    activeText: "text-white",
    activeBorder: "border-violet-500",
    hoverBg: "hover:bg-violet-50 dark:hover:bg-violet-950/30",
    hoverText: "hover:text-violet-600 dark:hover:text-violet-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  rose: {
    activeBg: "bg-rose-500",
    activeText: "text-white",
    activeBorder: "border-rose-500",
    hoverBg: "hover:bg-rose-50 dark:hover:bg-rose-950/30",
    hoverText: "hover:text-rose-600 dark:hover:text-rose-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  amber: {
    activeBg: "bg-amber-500",
    activeText: "text-white",
    activeBorder: "border-amber-500",
    hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-950/30",
    hoverText: "hover:text-amber-600 dark:hover:text-amber-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  lime: {
    activeBg: "bg-lime-500",
    activeText: "text-white",
    activeBorder: "border-lime-500",
    hoverBg: "hover:bg-lime-50 dark:hover:bg-lime-950/30",
    hoverText: "hover:text-lime-600 dark:hover:text-lime-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  sky: {
    activeBg: "bg-sky-500",
    activeText: "text-white",
    activeBorder: "border-sky-500",
    hoverBg: "hover:bg-sky-50 dark:hover:bg-sky-950/30",
    hoverText: "hover:text-sky-600 dark:hover:text-sky-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  emerald: {
    activeBg: "bg-emerald-500",
    activeText: "text-white",
    activeBorder: "border-emerald-500",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
    hoverText: "hover:text-emerald-600 dark:hover:text-emerald-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  fuchsia: {
    activeBg: "bg-fuchsia-500",
    activeText: "text-white",
    activeBorder: "border-fuchsia-500",
    hoverBg: "hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/30",
    hoverText: "hover:text-fuchsia-600 dark:hover:text-fuchsia-400",
    text: "text-zinc-600 dark:text-zinc-400",
  },
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 min-w-8 text-xs rounded-lg",
  md: "h-10 min-w-10 text-sm rounded-lg",
  lg: "h-12 min-w-12 text-base rounded-lg",
};

const variantStyles: Record<PaginationVariant, string> = {
  solid: "",
  outline: "border border-zinc-200 dark:border-zinc-700",
  ghost: "",
  squircle: "rounded-xl",
};

function usePagination(
  total: number,
  current: number,
  siblingCount: number,
): (number | "start-ellipsis" | "end-ellipsis")[] {
  const totalNumbers = siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const shouldShowStartEllipsis = leftSibling > 2;
  const shouldShowEndEllipsis = rightSibling < total - 1;

  const items: (number | "start-ellipsis" | "end-ellipsis")[] = [];

  if (shouldShowStartEllipsis) {
    items.push(1, "start-ellipsis");
  } else if (leftSibling > 1) {
    items.push(1);
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    items.push(i);
  }

  if (shouldShowEndEllipsis) {
    items.push("end-ellipsis", total);
  } else if (rightSibling < total) {
    items.push(total);
  }

  return items;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  color = "default",
  variant = "solid",
  showEdges = false,
  className,
  size = "md",
}: PaginationProps) {
  const pages = usePagination(totalPages, currentPage, siblingCount);
  const colors = colorConfig[color];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn(
        "flex items-center justify-center gap-1 sm:gap-1.5",
        className,
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {/* First Page */}
      {showEdges && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            sizeStyles[size],
            variant === "outline" && variantStyles.outline,
            variant === "squircle" && "rounded-xl",
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : cn(colors.hoverBg, colors.hoverText, "cursor-pointer"),
            colors.text,
          )}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </motion.button>
      )}

      {/* Previous */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          sizeStyles[size],
          variant === "outline" && variantStyles.outline,
          variant === "squircle" && "rounded-xl",
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : cn(colors.hoverBg, colors.hoverText, "cursor-pointer"),
          colors.text,
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </motion.button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "start-ellipsis" || page === "end-ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                "flex items-center justify-center",
                sizeStyles[size],
                variant === "squircle" && "rounded-xl",
                colors.text,
              )}
            >
              <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="h-1 w-1 rounded-full bg-current" />
              </span>
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <motion.button
            key={page}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(page as number)}
            className={cn(
              "flex items-center justify-center font-medium transition-all duration-200",
              sizeStyles[size],
              variant === "squircle" && "rounded-xl",
              isActive
                ? cn(
                    colors.activeBg,
                    colors.activeText,
                    "border-2",
                    colors.activeBorder,
                    "shadow-lg",
                  )
                : cn(
                    variant === "outline"
                      ? variantStyles.outline
                      : "border border-transparent",
                    colors.hoverBg,
                    colors.hoverText,
                    colors.text,
                  ),
            )}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          sizeStyles[size],
          variant === "outline" && variantStyles.outline,
          variant === "squircle" && "rounded-xl",
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : cn(colors.hoverBg, colors.hoverText, "cursor-pointer"),
          colors.text,
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </motion.button>

      {/* Last Page */}
      {showEdges && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex items-center justify-center transition-all duration-200",
            sizeStyles[size],
            variant === "outline" && variantStyles.outline,
            variant === "squircle" && "rounded-xl",
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : cn(colors.hoverBg, colors.hoverText, "cursor-pointer"),
            colors.text,
          )}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </motion.button>
      )}
    </nav>
  );
}
