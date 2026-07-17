"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface KeyDef {
  /** KeyboardEvent.code used to match physical key presses. */
  code: string;
  label: string;
  /** Shifted symbol rendered above the label (e.g. "!" over "1"). */
  sublabel?: string;
  /** Value passed to onKeyPress; defaults to the lowercased label. */
  value?: string;
  /** Relative width in key units (1 = a standard key). */
  width?: number;
  /** Dark keycap (two-tone mechanical look). */
  accent?: boolean;
  ariaLabel?: string;
}

// 60% ANSI layout — every row sums to 15 units so keys align across rows.
const ROWS: KeyDef[][] = [
  [
    { code: "Backquote", label: "`", sublabel: "~" },
    { code: "Digit1", label: "1", sublabel: "!" },
    { code: "Digit2", label: "2", sublabel: "@" },
    { code: "Digit3", label: "3", sublabel: "#" },
    { code: "Digit4", label: "4", sublabel: "$" },
    { code: "Digit5", label: "5", sublabel: "%" },
    { code: "Digit6", label: "6", sublabel: "^" },
    { code: "Digit7", label: "7", sublabel: "&" },
    { code: "Digit8", label: "8", sublabel: "*" },
    { code: "Digit9", label: "9", sublabel: "(" },
    { code: "Digit0", label: "0", sublabel: ")" },
    { code: "Minus", label: "-", sublabel: "_" },
    { code: "Equal", label: "=", sublabel: "+" },
    { code: "Backspace", label: "delete", value: "Backspace", width: 2, accent: true },
  ],
  [
    { code: "Tab", label: "tab", value: "Tab", width: 1.5, accent: true },
    { code: "KeyQ", label: "Q" },
    { code: "KeyW", label: "W" },
    { code: "KeyE", label: "E" },
    { code: "KeyR", label: "R" },
    { code: "KeyT", label: "T" },
    { code: "KeyY", label: "Y" },
    { code: "KeyU", label: "U" },
    { code: "KeyI", label: "I" },
    { code: "KeyO", label: "O" },
    { code: "KeyP", label: "P" },
    { code: "BracketLeft", label: "[", sublabel: "{" },
    { code: "BracketRight", label: "]", sublabel: "}" },
    { code: "Backslash", label: "\\", sublabel: "|", width: 1.5, accent: true },
  ],
  [
    { code: "CapsLock", label: "caps", value: "CapsLock", width: 1.75, accent: true },
    { code: "KeyA", label: "A" },
    { code: "KeyS", label: "S" },
    { code: "KeyD", label: "D" },
    { code: "KeyF", label: "F" },
    { code: "KeyG", label: "G" },
    { code: "KeyH", label: "H" },
    { code: "KeyJ", label: "J" },
    { code: "KeyK", label: "K" },
    { code: "KeyL", label: "L" },
    { code: "Semicolon", label: ";", sublabel: ":" },
    { code: "Quote", label: "'", sublabel: '"' },
    { code: "Enter", label: "return", value: "Enter", width: 2.25, accent: true },
  ],
  [
    { code: "ShiftLeft", label: "shift", value: "Shift", width: 2.25, accent: true },
    { code: "KeyZ", label: "Z" },
    { code: "KeyX", label: "X" },
    { code: "KeyC", label: "C" },
    { code: "KeyV", label: "V" },
    { code: "KeyB", label: "B" },
    { code: "KeyN", label: "N" },
    { code: "KeyM", label: "M" },
    { code: "Comma", label: ",", sublabel: "<" },
    { code: "Period", label: ".", sublabel: ">" },
    { code: "Slash", label: "/", sublabel: "?" },
    { code: "ShiftRight", label: "shift", value: "Shift", width: 2.75, accent: true },
  ],
  [
    { code: "ControlLeft", label: "control", value: "Control", width: 1.5, accent: true },
    { code: "AltLeft", label: "option", value: "Alt", width: 1.25, accent: true },
    { code: "MetaLeft", label: "⌘", value: "Meta", width: 1.5, accent: true, ariaLabel: "command" },
    { code: "Space", label: "", value: " ", width: 6.5, ariaLabel: "space" },
    { code: "MetaRight", label: "⌘", value: "Meta", width: 1.5, accent: true, ariaLabel: "command" },
    { code: "AltRight", label: "option", value: "Alt", width: 1.25, accent: true },
    { code: "ControlRight", label: "control", value: "Control", width: 1.5, accent: true },
  ],
];

interface KeyboardProps {
  className?: string;
  /**
   * Highlight keys while the user types on their physical keyboard.
   * @default true
   */
  listen?: boolean;
  /**
   * Called with the key's value when an on-screen key is clicked.
   * Single characters for printable keys ("a", "1", " "), names for the
   * rest ("Backspace", "Enter", "Shift", …).
   */
  onKeyPress?: (key: string) => void;
}

export function Keyboard({ className, listen = true, onKeyPress }: KeyboardProps) {
  const [pressed, setPressed] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!listen) return;
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      setPressed((prev) => new Set(prev).add(e.code));
    };
    const up = (e: KeyboardEvent) => {
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };
    // macOS swallows keyup while ⌘ is held; clearing on blur avoids stuck keys
    const clear = () => setPressed(new Set());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, [listen]);

  return (
    <div
      className={cn(
        "flex w-full max-w-4xl select-none flex-col gap-1.5 rounded-xl border border-border bg-muted/60 p-2 shadow-md sm:gap-2.5 sm:rounded-2xl sm:p-3.5",
        className,
      )}
    >
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5 sm:gap-2.5">
          {row.map((key) => {
            const isPressed = pressed.has(key.code);
            return (
              <button
                key={key.code}
                type="button"
                aria-label={key.ariaLabel}
                data-pressed={isPressed || undefined}
                onClick={() => onKeyPress?.(key.value ?? key.label.toLowerCase())}
                style={{ flexGrow: key.width ?? 1, flexBasis: 0 }}
                className={cn(
                  "flex h-9 min-w-0 flex-col items-center justify-center rounded-md border border-b-[3px] font-medium sm:h-12 sm:rounded-lg",
                  key.accent
                    ? "border-foreground/90 border-b-black/40 bg-foreground/90 text-background"
                    : "border-border border-b-foreground/25 bg-background text-foreground",
                  (key.value ?? key.label).length > 1
                    ? "text-[8px] sm:text-[11px]"
                    : "text-[10px] sm:text-sm",
                  "motion-safe:transition-[transform,border-width,filter] motion-safe:duration-100 motion-safe:ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "active:translate-y-0.5 active:border-b active:brightness-90",
                  "data-pressed:translate-y-0.5 data-pressed:border-b data-pressed:brightness-90",
                )}
              >
                {key.sublabel && (
                  <span
                    className={cn(
                      "hidden text-[9px] leading-none sm:block",
                      key.accent ? "text-background/60" : "text-muted-foreground",
                    )}
                  >
                    {key.sublabel}
                  </span>
                )}
                <span className="leading-none">{key.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
