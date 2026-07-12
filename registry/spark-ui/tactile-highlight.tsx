"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";

type HighlightDirection = "left" | "right" | "top" | "bottom";

interface TactileHighlightProps {
  children: React.ReactNode;
  className?: string;
  direction?: HighlightDirection;
  delay?: number;
  trigger?: "auto" | "hover" | "inView";
}

/**
 * TactileHighlight - A premium animated text highlight component.
 * Uses `mix-blend-difference` to guarantee mathematically perfect contrast
 * across both Light and Dark modes dynamically.
 */
export const TactileHighlight = ({
  children,
  className,
  direction = "left",
  delay = 0.1,
  trigger = "inView",
}: TactileHighlightProps) => {
  const ref = useRef(null);
  // once: false allows the animation to elegantly restart when scrolling back into view
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  const isAnimated = trigger === "auto" || (trigger === "inView" && isInView);

  const variants: Variants = {
    hidden: {
      scaleX: direction === "left" || direction === "right" ? 0 : 1,
      scaleY: direction === "top" || direction === "bottom" ? 0 : 1,
      originX: direction === "left" ? 0 : direction === "right" ? 1 : 0.5,
      originY: direction === "top" ? 0 : direction === "bottom" ? 1 : 0.5,
      borderRadius: "12px", // Starts very rounded
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      borderRadius: "4px", // Snaps to sharp corners
      transition: {
        type: "spring",
        damping: 22,
        stiffness: 130,
        mass: 0.8,
        delay: delay,
      },
    },
    hover: {
      scale: 1.05,
      rotate: direction === "left" ? -1.5 : direction === "right" ? 1.5 : 0,
      borderRadius: "8px",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 400,
      },
    },
  };

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block whitespace-nowrap cursor-default group/tactile",
        className,
      )}
      style={{ padding: "0 0.15em", margin: "0 -0.15em" }}
    >
      {/* Background Block: Dark in light mode, Light in dark mode */}
      <motion.span
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
        whileHover={trigger === "hover" ? "visible" : "hover"}
        variants={variants}
        className="absolute inset-0 bg-zinc-950 dark:bg-white shadow-xl z-0 origin-[var(--origin-x)_var(--origin-y)]"
        style={
          {
            "--origin-x":
              direction === "left" ? 0 : direction === "right" ? 1 : 0.5,
            "--origin-y":
              direction === "top" ? 0 : direction === "bottom" ? 1 : 0.5,
          } as React.CSSProperties
        }
      />

      {/* 
        Text Layer: Always white, but uses difference blending.
        Light Mode (White Page): White text difference White page = Black Text.
        Dark Mode (Black Page): White text difference Black page = White Text.
        Inside Highlight: Color perfectly inverts. 
      */}
      <span className="relative z-10 text-white mix-blend-difference pointer-events-none">
        {children}
      </span>
    </span>
  );
};
