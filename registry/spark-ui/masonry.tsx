"use client";

import { cn } from "@/lib/utils";
import { motion, type Easing } from "framer-motion";
import * as React from "react";

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
}

export type GsapEaseName = keyof typeof GSAP_EASE_MAP;

export interface MasonryProps<T extends MasonryItem = MasonryItem> {
  items: T[];
  className?: string;
  ease?: Easing | GsapEaseName;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  /** Overrides the default image tile. Use for richer card content while keeping the same layout, entry and hover animations. */
  renderItem?: (item: T, index: number) => React.ReactNode;
}

const GAP = 16;
const BREAKPOINTS: [width: number, columns: number][] = [
  [1400, 4],
  [900, 3],
  [500, 2],
  [0, 1],
];

// gsap-style ease names (as used by the reactbits-style API) mapped to their closest framer-motion equivalent
const GSAP_EASE_MAP: Record<string, Easing> = {
  "power1.out": "easeOut",
  "power2.out": "easeOut",
  "power3.out": "easeOut",
  "power4.out": "easeOut",
  "power1.in": "easeIn",
  "power2.in": "easeIn",
  "power3.in": "easeIn",
  "power1.inOut": "easeInOut",
  "power2.inOut": "easeInOut",
  "power3.inOut": "easeInOut",
  "back.out": "backOut",
  "back.in": "backIn",
  "circ.out": "circOut",
  "circ.in": "circIn",
};

function resolveEase(ease: Easing | GsapEaseName | undefined): Easing {
  if (!ease) return "easeOut";
  if (typeof ease === "string" && ease in GSAP_EASE_MAP) {
    return GSAP_EASE_MAP[ease as GsapEaseName];
  }
  return ease as Easing;
}

function getEntryOffset(
  from: NonNullable<MasonryProps["animateFrom"]>,
  x: number,
  y: number,
  containerWidth: number,
  containerHeight: number,
): { x: number; y: number } {
  switch (from) {
    case "top":
      return { x: 0, y: -y - 200 };
    case "bottom":
      return { x: 0, y: containerHeight - y + 200 };
    case "left":
      return { x: -x - 200, y: 0 };
    case "right":
      return { x: containerWidth - x + 200, y: 0 };
    case "random": {
      const dirs = ["top", "bottom", "left", "right"] as const;
      return getEntryOffset(dirs[Math.floor(Math.random() * dirs.length)], x, y, containerWidth, containerHeight);
    }
    default:
      return { x: 0, y: 0 };
  }
}

export function Masonry<T extends MasonryItem = MasonryItem>({
  items,
  className,
  ease,
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  renderItem,
}: MasonryProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const resolvedEase = resolveEase(ease);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { boxes, containerHeight } = React.useMemo(() => {
    if (!width) return { boxes: [], containerHeight: 0 };
    const columns = BREAKPOINTS.find(([breakpoint]) => width >= breakpoint)?.[1] ?? 1;
    const columnWidth = (width - GAP * (columns - 1)) / columns;
    const columnHeights = new Array(columns).fill(0) as number[];

    const placed = items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const x = column * (columnWidth + GAP);
      const y = columnHeights[column];
      columnHeights[column] += item.height + GAP;
      return { ...item, x, y, width: columnWidth };
    });

    return { boxes: placed, containerHeight: Math.max(0, Math.max(...columnHeights) - GAP) };
  }, [items, width]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: containerHeight || undefined }}
    >
      {boxes.map((box, index) => {
        const offset = getEntryOffset(animateFrom, box.x, box.y, width, containerHeight);
        return (
          <motion.a
            key={box.id}
            href={box.url}
            target={box.url ? "_blank" : undefined}
            rel={box.url ? "noopener noreferrer" : undefined}
            initial={{
              opacity: 0,
              x: box.x + offset.x,
              y: box.y + offset.y,
              width: box.width,
              height: box.height,
              filter: blurToFocus ? "blur(10px)" : "blur(0px)",
            }}
            animate={{
              opacity: 1,
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
              filter: "blur(0px)",
            }}
            whileHover={scaleOnHover ? { scale: hoverScale } : undefined}
            transition={{ duration, ease: resolvedEase, delay: index * stagger }}
            className="group absolute overflow-hidden rounded-2xl"
          >
            {renderItem ? (
              renderItem(box, index)
            ) : (
              <img src={box.img} alt="" className="size-full object-cover" draggable={false} />
            )}
            {colorShiftOnHover && (
              <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}
          </motion.a>
        );
      })}
    </div>
  );
}

export default Masonry;
