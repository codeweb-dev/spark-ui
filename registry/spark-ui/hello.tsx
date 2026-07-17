"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as React from "react";

const GREETINGS = [
  "Hello",
  "こんにちは",
  "Bonjour",
  "Hola",
  "안녕하세요",
  "Ciao",
  "你好",
  "Hallo",
  "Olá",
  "नमस्ते",
];

interface HelloProps {
  /** Greetings to cycle through. Defaults to "Hello" in ten languages. */
  greetings?: readonly string[];
  /**
   * Milliseconds each greeting stays on screen.
   * @default 2000
   */
  interval?: number;
  className?: string;
}

export function Hello({
  greetings = GREETINGS,
  interval = 2000,
  className,
}: HelloProps) {
  const [index, setIndex] = React.useState(0);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % greetings.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [greetings.length, interval]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${index}-${greetings[index]}`}
          initial={{ opacity: 0, y: 14, scale: 0.96, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, scale: 0.96, filter: "blur(10px)" }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
          className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
