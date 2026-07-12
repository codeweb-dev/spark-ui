"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type RingColor =
  | "muted"
  | "primary"
  | "secondary"
  | "destructive"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "orange"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "emerald"
  | "sky"
  | "slate"
  | "fuchsia";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ringColor?: RingColor;
  containerClassName?: string;
}

const ringColorMap: Record<RingColor, string> = {
  muted: "focus-within:ring-muted-500/20 focus-within:border-muted-500",
  primary: "focus-within:ring-primary/20 focus-within:border-primary",
  secondary: "focus-within:ring-secondary/20 focus-within:border-secondary",
  destructive: "focus-within:ring-destructive/20 focus-within:border-destructive",
  red: "focus-within:ring-red-500/20 focus-within:border-red-500",
  blue: "focus-within:ring-blue-500/20 focus-within:border-blue-500",
  green: "focus-within:ring-green-500/20 focus-within:border-green-500",
  yellow: "focus-within:ring-yellow-500/20 focus-within:border-yellow-500",
  purple: "focus-within:ring-purple-500/20 focus-within:border-purple-500",
  pink: "focus-within:ring-pink-500/20 focus-within:border-pink-500",
  orange: "focus-within:ring-orange-500/20 focus-within:border-orange-500",
  cyan: "focus-within:ring-cyan-500/20 focus-within:border-cyan-500",
  indigo: "focus-within:ring-indigo-500/20 focus-within:border-indigo-500",
  violet: "focus-within:ring-violet-500/20 focus-within:border-violet-500",
  rose: "focus-within:ring-rose-500/20 focus-within:border-rose-500",
  amber: "focus-within:ring-amber-500/20 focus-within:border-amber-500",
  lime: "focus-within:ring-lime-500/20 focus-within:border-lime-500",
  emerald: "focus-within:ring-emerald-500/20 focus-within:border-emerald-500",
  sky: "focus-within:ring-sky-500/20 focus-within:border-sky-500",
  slate: "focus-within:ring-slate-500/20 focus-within:border-slate-500",
  fuchsia: "focus-within:ring-fuchsia-500/20 focus-within:border-fuchsia-500",
};

export function LabelInput({
  label = "",
  ringColor = "muted",
  containerClassName,
  className,
  type = "text",
  placeholder = "",
  ...props
}: LabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType ? (isVisible ? "text" : "password") : type;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== "");
    props.onChange?.(e);
  };

  const showFloatingLabel = isFocused || hasValue || !placeholder;

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <div
        className={cn(
          "relative flex items-center",
          "rounded-lg border border-input",
          "bg-transparent",
          "transition-all duration-200 ease-in-out",
          "focus-within:ring-2 focus-within:ring-offset-0",
          ringColorMap[ringColor],
          className,
        )}
      >
        {/* Floating Label */}
        <AnimatePresence>
          {showFloatingLabel && label && (
            <motion.label
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute left-3 top-0 -translate-y-1/2",
                "px-1 text-xs font-medium",
                "bg-background",
                "pointer-events-none",
                "text-muted-foreground",
              )}
            >
              {label}
            </motion.label>
          )}
        </AnimatePresence>

        {/* Input Field */}
        <input
          type={inputType}
          placeholder={showFloatingLabel ? undefined : placeholder}
          className={cn(
            "w-full bg-transparent px-3 py-2 text-sm",
            "placeholder:text-muted-foreground/70",
            "outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isPasswordType && "pr-10",
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Password Toggle */}
        {isPasswordType && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVisible(!isVisible)}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2",
              "p-1.5 rounded-md",
              "text-muted-foreground hover:text-foreground",
              "transition-colors",
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isVisible ? "visible" : "hidden"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default LabelInput;
