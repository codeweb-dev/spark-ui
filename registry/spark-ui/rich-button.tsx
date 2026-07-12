"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

type Color =
  | "default"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "sky"
  | "emerald"
  | "fuchsia";

interface RichButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
}

const colorConfig: Record<
  Color,
  {
    bg: string;
    text: string;
    border: string;
    glow: string;
  }
> = {
  default: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    text: "text-zinc-100 dark:text-zinc-900",
    border: "border-zinc-800 dark:border-zinc-200",
    glow: "shadow-zinc-500/10",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-white",
    border: "border-blue-400/50",
    glow: "shadow-blue-500/20",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-white",
    border: "border-purple-400/50",
    glow: "shadow-purple-500/20",
  },
  emerald: {
    bg: "bg-emerald-500",
    text: "text-white",
    border: "border-emerald-400/50",
    glow: "shadow-emerald-500/20",
  },
  red: {
    bg: "bg-red-500",
    text: "text-white",
    border: "border-red-400/50",
    glow: "shadow-red-500/20",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-white",
    border: "border-pink-400/50",
    glow: "shadow-pink-500/20",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-400/50",
    glow: "shadow-orange-500/20",
  },
  yellow: {
    bg: "bg-yellow-400",
    text: "text-zinc-950",
    border: "border-yellow-300/50",
    glow: "shadow-yellow-500/20",
  },
  green: {
    bg: "bg-green-500",
    text: "text-white",
    border: "border-green-400/50",
    glow: "shadow-green-500/20",
  },
  teal: {
    bg: "bg-teal-500",
    text: "text-white",
    border: "border-teal-400/50",
    glow: "shadow-teal-500/20",
  },
  cyan: {
    bg: "bg-cyan-500",
    text: "text-zinc-950",
    border: "border-cyan-400/50",
    glow: "shadow-cyan-500/20",
  },
  indigo: {
    bg: "bg-indigo-500",
    text: "text-white",
    border: "border-indigo-400/50",
    glow: "shadow-indigo-500/20",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-white",
    border: "border-violet-400/50",
    glow: "shadow-violet-500/20",
  },
  rose: {
    bg: "bg-rose-500",
    text: "text-white",
    border: "border-rose-400/50",
    glow: "shadow-rose-500/20",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-white",
    border: "border-amber-400/50",
    glow: "shadow-amber-500/20",
  },
  lime: {
    bg: "bg-lime-500",
    text: "text-zinc-950",
    border: "border-lime-400/50",
    glow: "shadow-lime-500/20",
  },
  sky: {
    bg: "bg-sky-500",
    text: "text-white",
    border: "border-sky-400/50",
    glow: "shadow-sky-500/20",
  },
  fuchsia: {
    bg: "bg-fuchsia-500",
    text: "text-white",
    border: "border-fuchsia-400/50",
    glow: "shadow-fuchsia-500/20",
  },
};

const sizeStyles: Record<"sm" | "default" | "lg", string> = {
  sm: "h-9 px-4 text-[11px] gap-2",
  default: "h-11 px-6 text-[13px] gap-2.5",
  lg: "h-13 px-10 text-[15px] gap-3",
};

const RichButton = React.forwardRef<HTMLButtonElement, RichButtonProps>(
  (
    {
      className,
      color = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const colors = colorConfig[color];

    return (
      <Comp
        ref={ref}
        className={cn(
          "group relative cursor-pointer inline-flex items-center justify-center transition-all duration-300",
          "rounded-2xl overflow-hidden active:scale-95 hover:scale-[1.02]",
          colors.bg,
          colors.text,
          colors.border,
          colors.glow,
          "border shadow-lg",
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {asChild && React.isValidElement(children) ? (
          React.cloneElement(
            children as React.ReactElement<{ children?: React.ReactNode }>,
            {
              children: (
                <>
                  <span className="relative z-10 flex items-center justify-center">
                    {
                      (children.props as { children?: React.ReactNode })
                        .children
                    }
                  </span>
                  <span className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />
                  <span className="absolute inset-x-0 top-0 h-px bg-white/30 pointer-events-none" />
                  <span className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </>
              ),
            },
          )
        ) : (
          <>
            <span className="relative z-10 flex items-center justify-center">
              {children}
            </span>
            <span className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />
            <span className="absolute inset-x-0 top-0 h-px bg-white/30 pointer-events-none" />
            <span className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          </>
        )}
      </Comp>
    );
  },
);

RichButton.displayName = "RichButton";

export { RichButton };
