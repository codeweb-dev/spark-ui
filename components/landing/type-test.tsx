"use client";

import { PostScoreDialog } from "@/components/landing/post-score-dialog";
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

/**
 * Limits fast-changing values to one visual update per interval.
 */
function useThrottled(value: number, milliseconds: number): number {
  const [shown, setShown] = React.useState(value);
  const latest = React.useRef(value);

  React.useEffect(() => {
    latest.current = value;
  }, [value]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setShown(latest.current);
    }, milliseconds);

    return () => {
      window.clearInterval(interval);
    };
  }, [milliseconds]);

  return shown;
}

/**
 * Animated live statistic.
 */
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
          initial={{
            y: "0.8em",
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: "-0.8em",
            opacity: 0,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                }
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
  const pickedWords: string[] = [];

  for (let index = 0; index < count; index += 1) {
    pickedWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  return pickedWords.join(" ");
}

export function TypeTest() {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState("");
  const [typed, setTyped] = React.useState("");
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState(DURATION);
  const [finished, setFinished] = React.useState(false);

  const [strokes, setStrokes] = React.useState({
    total: 0,
    correct: 0,
  });

  const [soundOn, setSoundOn] = React.useState(true);
  const [postOpen, setPostOpen] = React.useState(false);
  const [mobileInputFocused, setMobileInputFocused] = React.useState(false);

  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  /*
   * Refs provide the current values inside global keyboard event handlers
   * without continuously recreating those handlers.
   */
  const targetRef = React.useRef("");
  const typedRef = React.useRef("");
  const startedAtRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);

  const reducedMotion = useReducedMotion();

  const markFinished = React.useCallback(() => {
    finishedRef.current = true;
    setFinished(true);

    hiddenInputRef.current?.blur();
    setMobileInputFocused(false);
  }, []);

  const reset = React.useCallback(() => {
    const nextTarget = randomWords(30);

    targetRef.current = nextTarget;
    typedRef.current = "";
    startedAtRef.current = null;
    finishedRef.current = false;

    setTarget(nextTarget);
    setTyped("");
    setStartedAt(null);
    setTimeLeft(DURATION);
    setFinished(false);
    setStrokes({
      total: 0,
      correct: 0,
    });

    hiddenInputRef.current?.blur();
    setMobileInputFocused(false);
  }, []);

  const openTest = React.useCallback(() => {
    reset();
    setPostOpen(false);
    setOpen(true);
  }, [reset]);

  const closeTest = React.useCallback(() => {
    hiddenInputRef.current?.blur();
    setMobileInputFocused(false);
    setOpen(false);
  }, []);

  const startTimer = React.useCallback(() => {
    if (startedAtRef.current !== null) {
      return;
    }

    const now = Date.now();

    startedAtRef.current = now;
    setStartedAt(now);
  }, []);

  /**
   * Adds characters entered through a physical keyboard.
   */
  const appendCharacters = React.useCallback(
    (characters: string) => {
      if (!characters || finishedRef.current) {
        return;
      }

      const currentTarget = targetRef.current;
      const currentTyped = typedRef.current;

      if (!currentTarget || currentTyped.length >= currentTarget.length) {
        return;
      }

      const remainingLength = currentTarget.length - currentTyped.length;

      const acceptedCharacters = characters.slice(0, remainingLength);

      if (!acceptedCharacters) {
        return;
      }

      startTimer();

      let correctCharactersAdded = 0;

      for (let index = 0; index < acceptedCharacters.length; index += 1) {
        const targetIndex = currentTyped.length + index;

        if (acceptedCharacters[index] === currentTarget[targetIndex]) {
          correctCharactersAdded += 1;
        }
      }

      const nextTyped = currentTyped + acceptedCharacters;

      typedRef.current = nextTyped;
      setTyped(nextTyped);

      setStrokes((currentStrokes) => ({
        total: currentStrokes.total + acceptedCharacters.length,
        correct: currentStrokes.correct + correctCharactersAdded,
      }));

      if (nextTyped.length >= currentTarget.length) {
        markFinished();
      }
    },
    [markFinished, startTimer],
  );

  /**
   * Handles Backspace from a physical keyboard.
   */
  const removeLastCharacter = React.useCallback(() => {
    if (finishedRef.current) {
      return;
    }

    const currentTyped = typedRef.current;

    if (!currentTyped) {
      return;
    }

    const nextTyped = currentTyped.slice(0, -1);

    typedRef.current = nextTyped;
    setTyped(nextTyped);
  }, []);

  /**
   * Focuses the invisible input and opens the phone keyboard.
   *
   * It must happen directly from a tap/click event for iOS Safari.
   */
  const focusHiddenInput = React.useCallback(() => {
    if (finishedRef.current) {
      return;
    }

    const input = hiddenInputRef.current;

    if (!input) {
      return;
    }

    try {
      input.focus({
        preventScroll: true,
      });
    } catch {
      input.focus();
    }

    const caretPosition = typedRef.current.length;

    try {
      input.setSelectionRange(caretPosition, caretPosition);
    } catch {
      // Selection ranges are not supported by every mobile browser.
    }
  }, []);

  /**
   * Handles text from the phone's virtual keyboard.
   */
  const handleMobileInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (finishedRef.current) {
        return;
      }

      const currentTarget = targetRef.current;
      const previousValue = typedRef.current;

      const nextValue = event.currentTarget.value.slice(
        0,
        currentTarget.length,
      );

      if (nextValue === previousValue) {
        return;
      }

      /*
       * A shorter value means the user pressed Backspace.
       * Backspace does not remove previous stroke statistics.
       */
      if (nextValue.length < previousValue.length) {
        typedRef.current = nextValue;
        setTyped(nextValue);
        return;
      }

      /*
       * Find the section added by the mobile keyboard.
       * Autocorrect is disabled, but this also handles replacements safely.
       */
      let sharedPrefixLength = 0;

      while (
        sharedPrefixLength < previousValue.length &&
        sharedPrefixLength < nextValue.length &&
        previousValue[sharedPrefixLength] === nextValue[sharedPrefixLength]
      ) {
        sharedPrefixLength += 1;
      }

      const addedCharacters = nextValue.slice(sharedPrefixLength);

      if (addedCharacters.length > 0) {
        startTimer();

        let correctCharactersAdded = 0;

        for (let index = 0; index < addedCharacters.length; index += 1) {
          const targetIndex = sharedPrefixLength + index;

          if (addedCharacters[index] === currentTarget[targetIndex]) {
            correctCharactersAdded += 1;
          }
        }

        setStrokes((currentStrokes) => ({
          total: currentStrokes.total + addedCharacters.length,
          correct: currentStrokes.correct + correctCharactersAdded,
        }));
      }

      typedRef.current = nextValue;
      setTyped(nextValue);

      if (
        nextValue.length >= currentTarget.length &&
        currentTarget.length > 0
      ) {
        markFinished();
      }
    },
    [markFinished, startTimer],
  );

  /**
   * Keep the invisible input caret at the end.
   */
  React.useEffect(() => {
    const input = hiddenInputRef.current;

    if (!input || document.activeElement !== input) {
      return;
    }

    try {
      input.setSelectionRange(typed.length, typed.length);
    } catch {
      // Ignore unsupported mobile selection behavior.
    }
  }, [typed]);

  /**
   * Countdown timer.
   */
  React.useEffect(() => {
    if (startedAt === null || finished) {
      return;
    }

    const interval = window.setInterval(() => {
      const elapsedMilliseconds = Date.now() - startedAt;

      const remaining = DURATION - elapsedMilliseconds / 1000;

      setTimeLeft(Math.max(0, remaining));

      if (remaining <= 0) {
        window.clearInterval(interval);
        markFinished();
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [startedAt, finished, markFinished]);

  /**
   * Desktop keyboard and external hardware keyboard support.
   */
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!postOpen) {
          closeTest();
        }

        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        return;
      }

      /*
       * When the hidden input is focused, its onChange event handles
       * the character. Returning prevents counting it twice.
       */
      if (event.target === hiddenInputRef.current) {
        return;
      }

      if (
        finishedRef.current ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        removeLastCharacter();
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      event.preventDefault();
      appendCharacters(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, postOpen, appendCharacters, closeTest, removeLastCharacter]);

  /**
   * Prevent the page behind the modal from scrolling.
   */
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const elapsed = DURATION - timeLeft;

  const correctCharacters = [...typed].filter(
    (character, index) => character === target[index],
  ).length;

  const wpm =
    elapsed > 0 ? Math.round(correctCharacters / 5 / (elapsed / 60)) : 0;

  const liveWpm = useThrottled(wpm, 800);

  const accuracy =
    strokes.total > 0
      ? Math.round((strokes.correct / strokes.total) * 100)
      : 100;

  const mobileInstructions = (() => {
    if (startedAt !== null) {
      return "Keep typing until the timer reaches zero.";
    }

    if (mobileInputFocused) {
      return "Keyboard ready. Start typing the words below.";
    }

    return "Tap the words below to start typing.";
  })();

  const renderCharacter = (
    character: string,
    index: number,
    insideWord: boolean,
  ) => (
    <span key={index} className="relative">
      {index === typed.length && (
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
          index < typed.length
            ? typed[index] === character
              ? "text-foreground"
              : character === " "
                ? "rounded-sm bg-destructive/20"
                : "text-destructive"
            : "text-muted-foreground/60",
          insideWord && "inline-block",
          insideWord &&
            index === typed.length - 1 &&
            "motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-200",
        )}
      >
        {character}
      </span>
    </span>
  );

  const renderWords = () => {
    const words = target.split(" ");
    let characterIndex = 0;

    return words.map((word, wordIndex) => {
      const wordStart = characterIndex;

      characterIndex += word.length + 1;

      return (
        <React.Fragment key={`${wordIndex}-${word}`}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((character, index) =>
              renderCharacter(character, wordStart + index, true),
            )}
          </span>

          {wordIndex < words.length - 1 &&
            renderCharacter(" ", wordStart + word.length, false)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="h-11 rounded-full bg-background/60 px-6 backdrop-blur"
        onClick={openTest}
      >
        <KeyboardIcon size={16} aria-hidden />
        Type test
      </Button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Typing test"
            className={cn(
              /*
               * Mobile:
               * - scrollable
               * - starts near the top
               * - smaller vertical gaps
               *
               * Desktop:
               * - restores the original centered design
               * - restores the original 2rem gap
               */
              "fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-start gap-5 overflow-y-auto bg-background px-4 py-5",
              "motion-safe:animate-in motion-safe:fade-in-0",
              "md:justify-center md:gap-8 md:overflow-hidden md:py-0",
            )}
          >
            {/*
             * Invisible input used to open the phone keyboard.
             * It is not display:none, because iOS must be able to focus it.
             */}
            <input
              ref={hiddenInputRef}
              type="text"
              value={typed}
              maxLength={target.length}
              inputMode="text"
              enterKeyHint="done"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Typing test input"
              onFocus={() => setMobileInputFocused(true)}
              onBlur={() => setMobileInputFocused(false)}
              onChange={handleMobileInput}
              onPaste={(event) => event.preventDefault()}
              onDrop={(event) => event.preventDefault()}
              className="pointer-events-none fixed left-0 top-0 h-px w-px border-0 bg-transparent p-0 opacity-0 outline-none"
              style={{
                fontSize: "16px",
                caretColor: "transparent",
              }}
            />

            {/*
             * On desktop this restores the exact original horizontal header.
             * It only stacks vertically on smaller screens.
             */}
            <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
                  <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
                    esc
                  </kbd>
                  to close
                </span>

                <button
                  type="button"
                  onClick={closeTest}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
                >
                  <X className="size-3" aria-hidden />
                  Close
                </button>

                <button
                  type="button"
                  aria-label={soundOn ? "Mute key sounds" : "Unmute key sounds"}
                  aria-pressed={!soundOn}
                  onClick={() => setSoundOn((current) => !current)}
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

              <div className="grid w-full grid-cols-3 divide-x divide-border rounded-xl border border-border text-left md:w-auto">
                <div className="flex min-w-0 flex-col px-3 py-2 sm:px-4 sm:py-2.5">
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

                <div className="flex min-w-0 flex-col px-3 py-2 sm:px-4 sm:py-2.5">
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

                <div className="flex min-w-0 flex-col px-3 py-2 sm:px-4 sm:py-2.5">
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

            {/*
             * This instruction is mobile-only.
             * Nothing is added above the words on desktop.
             */}
            {!finished && (
              <p
                id="mobile-type-test-instructions"
                className="w-full max-w-4xl text-center text-sm text-muted-foreground md:hidden"
              >
                {mobileInstructions}
              </p>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {finished ? (
                <motion.div
                  key="result"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(8px)",
                  }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }
                  }
                  className="flex min-h-40 w-full max-w-4xl flex-col items-center justify-center gap-4"
                >
                  <p className="text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    <NumberTicker
                      from={0}
                      target={wpm}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 1,
                              ease: "easeOut",
                            }
                      }
                      className="tabular-nums"
                    />{" "}
                    <span className="text-xl text-muted-foreground sm:text-2xl">
                      wpm
                    </span>{" "}
                    <NumberTicker
                      from={0}
                      target={accuracy}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 1,
                              ease: "easeOut",
                            }
                      }
                      className="tabular-nums"
                    />
                    <span className="text-xl text-muted-foreground sm:text-2xl">
                      % acc
                    </span>
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <PostScoreDialog
                      wpm={wpm}
                      accuracy={accuracy}
                      onOpenChange={setPostOpen}
                    />

                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={reset}
                    >
                      <RotateCcw size={14} aria-hidden />
                      Restart
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key={target}
                  role="textbox"
                  tabIndex={0}
                  aria-label="Typing test words"
                  aria-describedby="mobile-type-test-instructions"
                  aria-multiline="false"
                  initial={{
                    opacity: 0,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    filter: "blur(6px)",
                  }}
                  transition={
                    reducedMotion ? { duration: 0 } : { duration: 0.3 }
                  }
                  onClick={focusHiddenInput}
                  onFocus={focusHiddenInput}
                  className={cn(
                    /*
                     * Mobile receives a visible tappable container.
                     *
                     * Every decorative mobile style is explicitly removed
                     * at md so the original desktop word design is retained.
                     */
                    "w-full max-w-4xl cursor-text select-none rounded-xl border border-border bg-muted/10 px-4 py-5 text-left font-mono text-xl leading-relaxed tracking-wide outline-none",
                    "transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
                    "sm:text-2xl",
                    "md:cursor-default md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-3xl md:focus-visible:ring-0",
                  )}
                >
                  {renderWords()}
                </motion.p>
              )}
            </AnimatePresence>

            {/*
             * Original desktop keyboard:
             * visible at md and above, hidden only on mobile.
             */}
            {!finished && (
              <Keyboard className="hidden max-w-3xl md:block" sound={soundOn} />
            )}

            {/*
             * Original description remains unchanged on desktop.
             * It is hidden on mobile because the illustrated keyboard
             * is also hidden there.
             */}
            <div className="hidden max-w-xl text-center text-xs text-muted-foreground md:block">
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
