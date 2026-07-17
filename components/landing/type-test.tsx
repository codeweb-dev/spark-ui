"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NumberTicker from "@/registry/spark-ui/basic-number-ticker";
import { Keyboard } from "@/registry/spark-ui/keyboard";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Keyboard as KeyboardIcon,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";

const DURATION = 15;

const WORDS = [
  "men",
  "end",
  "here",
  "went",
  "three",
  "light",
  "good",
  "study",
  "grow",
  "mother",
  "low",
  "think",
  "tree",
  "plant",
  "near",
  "start",
  "such",
  "cross",
  "never",
  "tell",
  "set",
  "name",
  "stand",
  "home",
  "hand",
  "world",
  "small",
  "large",
  "again",
  "turn",
  "move",
  "right",
  "read",
  "land",
  "high",
  "every",
  "found",
  "still",
  "learn",
  "place",
  "year",
  "live",
  "back",
  "only",
  "round",
  "came",
  "show",
  "also",
  "after",
  "line",
  "point",
  "city",
  "play",
  "spell",
  "air",
  "away",
  "animal",
  "house",
  "letter",
  "water",
  "sound",
  "under",
];

/** Re-emits `value` at most once per `ms`, so fast-changing stats don't flicker. */
function useThrottled(value: number, ms: number): number {
  const [shown, setShown] = React.useState(value);
  const latest = React.useRef(value);
  React.useEffect(() => {
    latest.current = value;
  }, [value]);
  React.useEffect(() => {
    const id = window.setInterval(() => setShown(latest.current), ms);
    return () => window.clearInterval(id);
  }, [ms]);
  return shown;
}

/** Live stat that rolls like an odometer when its value changes. */
function RollingNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <span className="inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.strong
          key={value}
          initial={{ y: "0.8em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.8em", opacity: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 34 }
          }
          className={cn(
            "text-3xl font-semibold tabular-nums text-foreground",
            className,
          )}
        >
          {value}
        </motion.strong>
      </AnimatePresence>
    </span>
  );
}

function randomWords(count: number): string {
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return picked.join(" ");
}

export function TypeTest() {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState("");
  const [typed, setTyped] = React.useState("");
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState(DURATION);
  const [finished, setFinished] = React.useState(false);
  const [strokes, setStrokes] = React.useState({ total: 0, correct: 0 });
  const [soundOn, setSoundOn] = React.useState(true);
  const reducedMotion = useReducedMotion();

  const reset = React.useCallback(() => {
    setTarget(randomWords(30));
    setTyped("");
    setStartedAt(null);
    setTimeLeft(DURATION);
    setFinished(false);
    setStrokes({ total: 0, correct: 0 });
  }, []);

  const openTest = () => {
    reset();
    setOpen(true);
  };

  // countdown
  React.useEffect(() => {
    if (startedAt === null || finished) return;
    const tick = window.setInterval(() => {
      const left = DURATION - (Date.now() - startedAt) / 1000;
      setTimeLeft(Math.max(0, left));
      if (left <= 0) setFinished(true);
    }, 100);
    return () => window.clearInterval(tick);
  }, [startedAt, finished]);

  // typing + escape
  React.useEffect(() => {
    if (!open) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") e.preventDefault();
      if (finished || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        setTyped(typed.slice(0, -1));
        return;
      }
      if (e.key.length !== 1 || typed.length >= target.length) return;
      e.preventDefault();
      if (startedAt === null) setStartedAt(Date.now());
      const isCorrect = e.key === target[typed.length];
      setStrokes((s) => ({
        total: s.total + 1,
        correct: s.correct + (isCorrect ? 1 : 0),
      }));
      const next = typed + e.key;
      setTyped(next);
      if (next.length === target.length) setFinished(true);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, finished, target, typed, startedAt]);

  // lock page scroll while open
  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const elapsed = DURATION - timeLeft;
  const correctChars = [...typed].filter((c, i) => c === target[i]).length;
  const wpm = elapsed > 0 ? Math.round(correctChars / 5 / (elapsed / 60)) : 0;
  // wpm recomputes on every keystroke and timer tick — too jittery to read live
  const liveWpm = useThrottled(wpm, 800);
  const accuracy =
    strokes.total > 0
      ? Math.round((strokes.correct / strokes.total) * 100)
      : 100;

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="h-11 rounded-full bg-background/60 px-6 backdrop-blur"
        onClick={openTest}
      >
        <KeyboardIcon size={16} /> Type test
      </Button>

      {open &&
        // portal to <body> so no ancestor stacking context lets the navbar sit on top
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Typing test"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-4 motion-safe:animate-in motion-safe:fade-in-0"
          >
            <div className="flex w-full max-w-4xl items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
                  <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
                    esc
                  </kbd>
                  to close
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
                >
                  <X className="size-3" aria-hidden />
                  Close
                </button>
                <button
                  type="button"
                  aria-label={soundOn ? "Mute key sounds" : "Unmute key sounds"}
                  aria-pressed={!soundOn}
                  onClick={() => setSoundOn((s) => !s)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {soundOn ? (
                    <Volume2 className="size-3" aria-hidden />
                  ) : (
                    <VolumeX className="size-3" aria-hidden />
                  )}
                  {soundOn ? "sound on" : "sound off"}
                </button>
              </div>
              <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border text-left">
                <div className="flex flex-col px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="text-[9px] font-medium uppercase tracking-widest text-foreground">
                    Time left
                  </span>
                  <span className="hidden text-[10px] text-muted-foreground sm:block">
                    15s countdown
                  </span>
                  <span className="mt-1 flex items-baseline">
                    <RollingNumber
                      value={Math.ceil(timeLeft)}
                      className="font-mono text-xl font-medium sm:text-2xl"
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      s
                    </span>
                  </span>
                </div>
                <div className="flex flex-col px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="text-[9px] font-medium uppercase tracking-widest text-foreground">
                    Speed
                  </span>
                  <span className="hidden text-[10px] text-muted-foreground sm:block">
                    words per minute
                  </span>
                  <span className="mt-1 flex items-baseline">
                    <RollingNumber
                      value={liveWpm}
                      className="font-mono text-xl font-medium sm:text-2xl"
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      wpm
                    </span>
                  </span>
                </div>
                <div className="flex flex-col px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="text-[9px] font-medium uppercase tracking-widest text-foreground">
                    Accuracy
                  </span>
                  <span className="hidden text-[10px] text-muted-foreground sm:block">
                    correct keystrokes
                  </span>
                  <span className="mt-1 flex items-baseline">
                    <RollingNumber
                      value={accuracy}
                      className="font-mono text-xl font-medium sm:text-2xl"
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      %
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {finished ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 320, damping: 28 }
                  }
                  className="flex min-h-40 w-full max-w-4xl flex-col items-center justify-center gap-4"
                >
                  <p className="text-5xl font-semibold tracking-tight text-foreground">
                    <NumberTicker
                      from={0}
                      target={wpm}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 1, ease: "easeOut" }
                      }
                      className="tabular-nums"
                    />{" "}
                    <span className="text-2xl text-muted-foreground">wpm</span>{" "}
                    <NumberTicker
                      from={0}
                      target={accuracy}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 1, ease: "easeOut" }
                      }
                      className="tabular-nums"
                    />
                    <span className="text-2xl text-muted-foreground">
                      % acc
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={reset}
                  >
                    <RotateCcw size={14} /> Restart
                  </Button>
                </motion.div>
              ) : (
                <motion.p
                  key={target}
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={
                    reducedMotion ? { duration: 0 } : { duration: 0.3 }
                  }
                  className="w-full max-w-4xl select-none text-left font-mono text-2xl leading-relaxed tracking-wide sm:text-3xl"
                >
                  {(() => {
                    const renderChar = (
                      c: string,
                      i: number,
                      inWord: boolean,
                    ) => (
                      <span key={i} className="relative">
                        {i === typed.length && (
                          <motion.span
                            aria-hidden
                            layoutId="type-test-caret"
                            transition={
                              reducedMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 600,
                                    damping: 38,
                                  }
                            }
                            className="absolute -left-px top-1/2 h-[1.1em] w-0.5 -translate-y-1/2 rounded bg-foreground"
                          />
                        )}
                        <span
                          className={cn(
                            "motion-safe:transition-colors motion-safe:duration-150",
                            i < typed.length
                              ? typed[i] === c
                                ? "text-foreground"
                                : c === " "
                                  ? "rounded-sm bg-destructive/20"
                                  : "text-destructive"
                              : "text-muted-foreground/60",
                            inWord && "inline-block",
                            inWord &&
                              i === typed.length - 1 &&
                              "motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-200",
                          )}
                        >
                          {c}
                        </span>
                      </span>
                    );
                    const words = target.split(" ");
                    let idx = 0;
                    return words.map((word, wi) => {
                      const start = idx;
                      idx += word.length + 1;
                      return (
                        <React.Fragment key={`${wi}-${word}`}>
                          <span className="inline-block whitespace-nowrap">
                            {[...word].map((c, ci) =>
                              renderChar(c, start + ci, true),
                            )}
                          </span>
                          {wi < words.length - 1 &&
                            renderChar(" ", start + word.length, false)}
                        </React.Fragment>
                      );
                    });
                  })()}
                </motion.p>
              )}
            </AnimatePresence>

            <Keyboard className="max-w-3xl" sound={soundOn} />

            <div className="max-w-xl text-center text-xs text-muted-foreground">
              <p>
                The key sound isn&apos;t a real mechanical recording — it&apos;s
                synthesized with the Web Audio API. Don&apos;t want it? Just
                switch the sound off up top.
              </p>

              <p className="mt-1">
                Inspired by{" "}
                <a
                  href="https://getkeeby.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  Keeby
                </a>
                .
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
