"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export type WidgetStackSize = "small" | "medium";

export interface WidgetStackProps {
  children: React.ReactNode;
  size?: WidgetStackSize;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
  ariaLabel?: string;
}

export function WidgetStack({
  children,
  size = "small",
  defaultIndex = 0,
  onIndexChange,
  className,
  ariaLabel = "Widget stack",
}: WidgetStackProps) {
  const pages = React.Children.toArray(children);
  const initialIndex = Math.min(Math.max(defaultIndex, 0), pages.length - 1);
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const [scrollProgress, setScrollProgress] = React.useState(initialIndex);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToIndex = React.useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      if (!container) return;

      const nextIndex = Math.min(Math.max(index, 0), pages.length - 1);
      container.scrollTo({
        top: nextIndex * container.clientHeight,
        behavior:
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : behavior,
      });
    },
    [pages.length],
  );

  React.useEffect(() => {
    scrollToIndex(initialIndex, "auto");
  }, [initialIndex, scrollToIndex]);

  if (pages.length === 0) return null;

  return (
    <div
      data-size={size}
      className={cn(
        "relative shrink-0",
        size === "small"
          ? "size-40"
          : "h-40 w-[21rem] max-w-[calc(100vw-3rem)]",
        className,
      )}
    >
      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onScroll={(event) => {
          const container = event.currentTarget;
          const progress = Math.min(
            container.scrollTop / container.clientHeight,
            pages.length - 1,
          );
          const index = Math.round(progress);
          setScrollProgress(progress);
          if (index !== activeIndex) {
            setActiveIndex(index);
            onIndexChange?.(index);
          }
        }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;

          const nextIndex =
            event.key === "ArrowDown" || event.key === "PageDown"
              ? activeIndex + 1
              : event.key === "ArrowUp" || event.key === "PageUp"
                ? activeIndex - 1
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? pages.length - 1
                    : null;

          if (nextIndex !== null) {
            event.preventDefault();
            scrollToIndex(nextIndex);
          }
        }}
        className="flex h-full w-full snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain rounded-[1.35rem] bg-card shadow-[0_12px_35px_rgba(0,0,0,0.2)] outline-none ring-1 ring-black/5 scroll-smooth focus-visible:ring-2 focus-visible:ring-foreground/40 motion-reduce:scroll-auto dark:ring-white/10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {pages.map((page, index) => (
          <section
            key={index}
            aria-label={`Widget ${index + 1} of ${pages.length}`}
            className="h-full min-h-full w-full shrink-0 snap-start snap-always overflow-hidden"
          >
            {page}
          </section>
        ))}
      </div>

      {pages.length > 1 && (
        <div
          className="absolute -right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col"
          aria-label="Choose widget"
        >
          <span
            className="pointer-events-none absolute left-[7px] top-1 h-3 w-1.5 rounded-full bg-foreground/80 transition-transform duration-150 ease-out motion-reduce:transition-none"
            style={{ transform: `translateY(${scrollProgress * 20}px)` }}
            aria-hidden
          />
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show widget ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className="grid size-5 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "block size-1.5 rounded-full bg-foreground/25 transition-opacity motion-reduce:transition-none",
                  activeIndex === index && "opacity-0",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
