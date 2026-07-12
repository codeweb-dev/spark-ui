// author: Khoa Phan <https://www.pldkhoa.dev>
"use client";

import React, { ElementType, HTMLAttributes, useEffect, useMemo, useRef } from "react";
import { useAnimate } from "framer-motion";
import type { DOMKeyframesDefinition, AnimationOptions } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageTrailProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be displayed
   */
  children: React.ReactNode;

  /**
   * HTML Tag
   */
  as?: ElementType;

  /**
   * How much distance in pixels the mouse has to travel to trigger of an element to appear.
   */
  threshold?: number;

  /**
   * The intensity for the momentum movement after showing the element. The value will be clamped > 0 and <= 1.0. Defaults to 0.3.
   */
  intensity?: number;

  /**
   * Animation Keyframes for defining the animation sequence. Example: { scale: [0, 1, 1, 0] }
   */
  keyframes?: DOMKeyframesDefinition;

  /**
   * Options for the animation/keyframes. Example: { duration: 1, times: [0, 0.1, 0.9, 1] }
   */
  keyframesOptions?: AnimationOptions;

  /**
   * Animation keyframes for the x and y positions after showing the element. Describes how the element should try to arrive at the mouse position.
   */
  trailElementAnimationKeyframes?: {
    x?: AnimationOptions;
    y?: AnimationOptions;
  };

  /**
   * The number of times the children will be repeated. Defaults to 3.
   */
  repeatChildren?: number;

  /**
   * The base zIndex for all elements. Defaults to 0.
   */
  baseZIndex?: number;

  /**
   * Controls stacking order behavior.
   * - "new-on-top": newer elements stack above older ones (default)
   * - "old-on-top": older elements stay visually on top
   */
  zIndexDirection?: "new-on-top" | "old-on-top";
}

interface ImageTrailItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * HTML Tag
   */
  as?: ElementType;

  /**
   * The content to be displayed
   */
  children: React.ReactNode;

  /** Visual treatment for the trail item. */
  variant?: "plain" | "framed" | "glass";

  /** Corner radius applied to the item and its media. */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

const radiusStyles = {
  none: "rounded-none [&>img]:rounded-none",
  sm: "rounded-sm [&>img]:rounded-[2px]",
  md: "rounded-md [&>img]:rounded-[4px]",
  lg: "rounded-lg [&>img]:rounded-[6px]",
  xl: "rounded-2xl [&>img]:rounded-xl",
  full: "rounded-full [&>img]:rounded-full",
};

const variantStyles = {
  plain: "overflow-hidden",
  framed:
    "overflow-hidden border border-white/40 bg-background/90 p-1.5 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/10 dark:border-white/15 dark:ring-white/10",
  glass:
    "overflow-hidden border border-white/30 bg-white/15 p-1.5 shadow-2xl ring-1 ring-white/15 backdrop-blur-md",
};

/**
 * Helper functions
 */
const MathUtils = {
  // linear interpolation
  lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
  // distance between two points
  distance: (x1: number, y1: number, x2: number, y2: number) =>
    Math.hypot(x2 - x1, y2 - y1),
};

export const ImageTrail = ({
  className,
  as = "div",
  children,
  threshold = 100,
  intensity = 0.3,
  keyframes,
  keyframesOptions,
  repeatChildren = 3,
  trailElementAnimationKeyframes = {
    x: { duration: 1, type: "tween", ease: "easeOut" },
    y: { duration: 1, type: "tween", ease: "easeOut" },
  },
  baseZIndex = 0,
  zIndexDirection = "new-on-top",
  ...props
}: ImageTrailProps) => {
  const allImages = useRef<NodeListOf<HTMLElement> | null>(null);
  const currentId = useRef(0);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const cachedMousePos = useRef<{ x: number; y: number } | null>(null);
  const [containerRef, animate] = useAnimate();
  const zIndices = useRef<number[]>([]);

  const clampedIntensity = useMemo(
    () => Math.max(0.0001, Math.min(1, intensity)),
    [intensity]
  );

  useEffect(() => {
    if (containerRef.current) {
      allImages.current = containerRef.current.querySelectorAll(
        ".image-trail-item"
      ) as NodeListOf<HTMLElement>;

      zIndices.current = Array.from(
        { length: allImages.current.length },
        (_, index) => index
      );
    }
  }, [containerRef]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !allImages.current || allImages.current.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mousePos = {
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    };

    const lastCachedX = cachedMousePos.current ? cachedMousePos.current.x : mousePos.x;
    const lastCachedY = cachedMousePos.current ? cachedMousePos.current.y : mousePos.y;

    cachedMousePos.current = {
      x: MathUtils.lerp(lastCachedX, mousePos.x, clampedIntensity),
      y: MathUtils.lerp(lastCachedY, mousePos.y, clampedIntensity),
    };

    if (!lastMousePos.current) {
      lastMousePos.current = { x: mousePos.x, y: mousePos.y };
      return;
    }

    const prevX = lastMousePos.current.x;
    const prevY = lastMousePos.current.y;

    const distance = MathUtils.distance(
      mousePos.x,
      mousePos.y,
      prevX,
      prevY
    );

    if (distance > threshold) {
      const steps = Math.floor(distance / threshold);
      const N = allImages.current.length;

      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const interpX = MathUtils.lerp(prevX, mousePos.x, t);
        const interpY = MathUtils.lerp(prevY, mousePos.y, t);

        const interpCachedX = MathUtils.lerp(lastCachedX, cachedMousePos.current.x, t);
        const interpCachedY = MathUtils.lerp(lastCachedY, cachedMousePos.current.y, t);

        const current = currentId.current;

        if (zIndexDirection === "new-on-top") {
          // Shift others down, put current on top
          for (let i = 0; i < N; i++) {
            if (i !== current) {
              zIndices.current[i] -= 1;
            }
          }
          zIndices.current[current] = N - 1;
        } else {
          // Shift others up, put current at bottom
          for (let i = 0; i < N; i++) {
            if (i !== current) {
              zIndices.current[i] += 1;
            }
          }
          zIndices.current[current] = 0;
        }

        const activeEl = allImages.current[current];
        if (activeEl) {
          activeEl.style.display = "block";
          allImages.current.forEach((img, index) => {
            img.style.zIndex = String(zIndices.current[index] + baseZIndex);
          });

          const startX = interpCachedX - activeEl.offsetWidth / 2;
          const endX = interpX - activeEl.offsetWidth / 2;
          const startY = interpCachedY - activeEl.offsetHeight / 2;
          const endY = interpY - activeEl.offsetHeight / 2;

          animate(
            activeEl,
            {
              x: [startX, endX],
              y: [startY, endY],
              ...keyframes,
            } as DOMKeyframesDefinition,
            {
              ...trailElementAnimationKeyframes.x,
              ...trailElementAnimationKeyframes.y,
              ...keyframesOptions,
            }
          );
          currentId.current = (current + 1) % N;
        }
      }

      lastMousePos.current = { x: mousePos.x, y: mousePos.y };
    }
  };

  const ElementTag = as;

  return (
    <ElementTag
      className={cn("h-full w-full relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      {...props}
    >
      {Array.from({ length: repeatChildren }).map((_, i) => (
        <React.Fragment key={i}>{children}</React.Fragment>
      ))}
    </ElementTag>
  );
};

export const ImageTrailItem = ({
  className,
  children,
  as = "div",
  variant = "framed",
  radius = "xl",
  ...props
}: ImageTrailItemProps) => {
  const ElementTag = as;
  return (
    <ElementTag
      {...props}
      className={cn(
        "absolute top-0 left-0 isolate hidden select-none will-change-transform pointer-events-none",
        "before:pointer-events-none before:absolute before:inset-x-3 before:top-1 before:z-20 before:h-px before:bg-white/60 before:opacity-70",
        variantStyles[variant],
        radiusStyles[radius],
        className,
        "image-trail-item"
      )}
    >
      {children}
    </ElementTag>
  );
};

export const ImageTrailItemCaption = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "absolute inset-x-1.5 bottom-1.5 z-10 rounded-b-xl bg-linear-to-t from-black/85 via-black/45 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-medium text-white",
      className,
    )}
    {...props}
  />
);

export default ImageTrail;
