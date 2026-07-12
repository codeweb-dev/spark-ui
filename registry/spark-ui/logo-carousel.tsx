"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  reverse?: boolean;
  fade?: boolean;
  fadeAmount?: number;
  repeat?: number;
  gap?: string;
}

export function LogoCarousel({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  reverse = false,
  fade = true,
  fadeAmount = 10,
  repeat = 2,
  gap = "1.5rem",
  ...props
}: LogoCarouselProps) {
  const isVertical = direction === "up" || direction === "down";
  const [isHovered, setIsHovered] = React.useState(false);

  // Determine resolved direction combining direction and reverse
  let resolvedDirection = direction;
  if (reverse) {
    if (direction === "left") resolvedDirection = "right";
    else if (direction === "right") resolvedDirection = "left";
    else if (direction === "up") resolvedDirection = "down";
    else if (direction === "down") resolvedDirection = "up";
  }

  // Determine standard CSS animation name defined in globals.css
  const animationName =
    resolvedDirection === "left" ? "logo-carousel" :
      resolvedDirection === "right" ? "logo-carousel-reverse" :
        resolvedDirection === "up" ? "logo-carousel-y" :
          "logo-carousel-y-reverse";

  return (
    <div
      className={cn(
        "flex w-full overflow-hidden select-none",
        isVertical && "flex-col",
        className,
      )}
      onMouseEnter={() => {
        if (pauseOnHover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsHovered(false);
      }}
      style={{
        "--duration": `${duration}s`,
        "--gap": gap,
        ...(fade && {
          maskImage: isVertical
            ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
            : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
          WebkitMaskImage: isVertical
            ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
            : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
        }),
      } as React.CSSProperties}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0",
          isVertical ? "flex-col min-h-full" : "flex-row min-w-full"
        )}
        style={{
          gap: "var(--gap)",
          animation: `${animationName} var(--duration) linear infinite`,
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <React.Fragment key={i}>
            {React.Children.map(children, (child, idx) => (
              <div key={idx} className="flex shrink-0 items-center justify-center">
                {child}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
