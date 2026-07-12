"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

type ShimmerDirection = "ltr" | "rtl";
type ShimmerVariant =
  | "default"
  | "blue"
  | "purple"
  | "green"
  | "red"
  | "amber"
  | "gold"
  | "silver"
  | "rose"
  | "cyan"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "teal"
  | "violet";

interface ShimmerTextProps {
  /** The text content to display */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Primary shimmer color (overrides variant) */
  shimmerColor?: string;
  /** Secondary shimmer color for gradient effect */
  shimmerColor2?: string;
  /** Direction of shimmer animation */
  direction?: ShimmerDirection;
  /** Duration of one shimmer cycle in seconds */
  duration?: number;
  /** Width of the shimmer band (0.1 - 1) */
  shimmerWidth?: number;
  /** Preset color variant */
  variant?: ShimmerVariant;
}

const variantColors: Record<ShimmerVariant, [string, string]> = {
  default: ["#60a5fa", "#3b82f6"],
  blue: ["#60a5fa", "#3b82f6"],
  purple: ["#a855f7", "#7c3aed"],
  green: ["#22c55e", "#16a34a"],
  red: ["#ef4444", "#dc2626"],
  amber: ["#f59e0b", "#d97706"],
  gold: ["#fbbf24", "#f59e0b"],
  silver: ["#e4e4e7", "#a1a1aa"],
  rose: ["#f43f5e", "#e11d48"],
  cyan: ["#06b6d4", "#0891b2"],
  indigo: ["#6366f1", "#4f46e5"],
  lime: ["#84cc16", "#65a30d"],
  orange: ["#f97316", "#ea580c"],
  pink: ["#ec4899", "#db2777"],
  teal: ["#14b8a6", "#0d9488"],
  violet: ["#8b5cf6", "#7c3aed"],
};

/**
 * ShimmerText - A premium text component with shimmer effect flowing within the text itself.
 * Uses background-clip: text to ensure the shimmer stays inside the text characters.
 * Animation starts when the component comes into view and loops infinitely.
 */
export const ShimmerText = ({
  children,
  className,
  shimmerColor,
  shimmerColor2,
  direction = "rtl",
  duration = 2,
  shimmerWidth = 0.5,
  variant = "default",
}: ShimmerTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Get colors from variant or custom props
  const [primary, secondary] = variantColors[variant];
  const color1 = shimmerColor || primary;
  const color2 = shimmerColor2 || secondary;

  const backgroundSize = shimmerWidth * 300;
  const startPos =
    direction === "ltr" ? `-${backgroundSize}%` : `${backgroundSize}%`;
  const endPos =
    direction === "ltr" ? `${backgroundSize}%` : `-${backgroundSize}%`;

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-block bg-clip-text text-transparent font-bold",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, #52525b 0%, ${color1} 40%, ${color2} 50%, ${color1} 60%, #52525b 100%)`,
        backgroundSize: `${backgroundSize}% 100%`,
      }}
      animate={isInView ? { backgroundPosition: [startPos, endPos] } : {}}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};
