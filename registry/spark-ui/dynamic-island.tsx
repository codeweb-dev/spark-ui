"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as React from "react";

export interface DynamicIslandProps {
  compact?: React.ReactNode;
  expanded?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  expandLabel?: string;
  collapseLabel?: string;
}

export function DynamicIsland({
  compact,
  expanded,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  expandLabel = "Expand Dynamic Island",
  collapseLabel = "Collapse Dynamic Island",
}: DynamicIslandProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [isRejecting, setIsRejecting] = React.useState(false);
  const restoreFocus = React.useRef(false);
  const reducedMotion = useReducedMotion();
  const isOpen = open ?? uncontrolledOpen;
  const isPanelOpen = isOpen && expanded != null;
  const isEmpty = compact == null && expanded == null;
  const isPillOpen = isOpen && expanded == null && !isEmpty;

  const triggerRef = React.useCallback((node: HTMLButtonElement | null) => {
    if (node && restoreFocus.current) {
      node.focus();
      restoreFocus.current = false;
    }
  }, []);

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const collapse = () => {
    restoreFocus.current = true;
    setOpen(false);
  };

  return (
    <motion.div
      layout
      data-state={isOpen ? "open" : "closed"}
      animate={
        isRejecting && !reducedMotion
          ? { x: [0, -8, 8, -6, 6, 0] }
          : { x: 0 }
      }
      onAnimationComplete={() => {
        if (isRejecting) setIsRejecting(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          if (isPanelOpen) collapse();
          else setOpen(false);
        }
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              layout: { type: "spring", stiffness: 420, damping: 34 },
              x: { delay: 0.3, duration: 0.38, ease: "easeInOut" },
            }
      }
      className={cn(
        "relative isolate overflow-hidden border border-white/15 bg-black text-white shadow-[0_14px_50px_rgba(0,0,0,0.28)]",
        isPanelOpen
          ? "h-48 w-[min(22rem,calc(100vw-3rem))] rounded-[2rem]"
          : isRejecting || isPillOpen
            ? "h-16 w-52 rounded-full"
            : "h-11 w-32 rounded-full",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {isPanelOpen ? (
          <motion.div
            key="expanded"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="absolute inset-x-0 top-0 bottom-10"
          >
            {expanded}
          </motion.div>
        ) : (
          <motion.button
            ref={triggerRef}
            key="compact"
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? collapseLabel : expandLabel}
            onClick={() => {
              if (isEmpty) {
                if (!reducedMotion) setIsRejecting(true);
                return;
              }
              setOpen(!isOpen);
            }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="h-full w-full rounded-full px-2 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
          >
            {compact}
          </motion.button>
        )}
      </AnimatePresence>

      {isPanelOpen && (
        <button
          type="button"
          aria-label={collapseLabel}
          onClick={collapse}
          className="group absolute inset-x-0 bottom-0 z-10 flex h-10 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
        >
          <span className="h-1 w-9 rounded-full bg-white/25 transition-colors group-hover:bg-white/45" />
        </button>
      )}
    </motion.div>
  );
}
