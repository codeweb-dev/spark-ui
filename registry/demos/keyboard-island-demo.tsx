"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Keyboard } from "@/registry/spark-ui/keyboard";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Keyboard as KeyboardIcon, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SYMBOLS: Record<string, string> = {
  " ": "␣",
  Backspace: "⌫",
  Enter: "⏎",
  Shift: "⇧",
  Meta: "⌘",
  Alt: "⌥",
  Control: "⌃",
  Tab: "⇥",
  CapsLock: "⇪",
  Escape: "esc",
};

export default function KeyboardIslandDemo() {
  const [feed, setFeed] = useState<{ id: number; label: string }[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const nextId = useRef(0);
  const reducedMotion = useReducedMotion();

  const push = useCallback((key: string) => {
    const label = SYMBOLS[key] ?? (key.length === 1 ? key : null);
    if (label === null) return;
    const id = nextId.current++;
    setFeed((f) => [...f, { id, label }].slice(-6));
    window.setTimeout(() => setFeed((f) => f.filter((k) => k.id !== id)), 1400);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!e.repeat) push(e.key);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [push]);

  return (
    <div className="flex w-full justify-center p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <KeyboardIcon className="mr-2 size-4" aria-hidden />
            Open keyboard with island
          </Button>
        </DialogTrigger>
        <DialogContent
          className={
            "bottom-0 left-0 top-auto max-w-none translate-x-0 translate-y-0 rounded-none border-x-0 border-b-0 sm:rounded-none " +
            "data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-bottom-10 " +
            "data-[state=closed]:zoom-out-100 data-[state=closed]:slide-out-to-bottom-10"
          }
        >
          <div className="mx-auto flex w-full max-w-4xl items-start justify-between gap-4">
            <DialogHeader className="text-left">
              <DialogTitle>Keyboard</DialogTitle>
              <DialogDescription>
                Every keystroke blurs into the island, lingers, and blurs away.
              </DialogDescription>
            </DialogHeader>
            <button
              type="button"
              aria-label={soundOn ? "Mute key sounds" : "Unmute key sounds"}
              aria-pressed={!soundOn}
              onClick={() => setSoundOn((s) => !s)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {soundOn ? (
                <Volume2 className="size-3" aria-hidden />
              ) : (
                <VolumeX className="size-3" aria-hidden />
              )}
              {soundOn ? "sound on" : "sound off"}
            </button>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-10 min-w-32 items-center gap-2.5 rounded-full bg-zinc-950 px-4 text-white shadow-lg dark:border dark:border-zinc-800">
              <KeyboardIcon
                className="size-4 shrink-0 text-zinc-400"
                aria-hidden
              />
              <div
                className="flex items-center gap-1 font-mono text-sm"
                aria-live="polite"
              >
                <AnimatePresence mode="popLayout">
                  {feed.map((k) => (
                    <motion.span
                      key={k.id}
                      layout
                      initial={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 500, damping: 32 }
                      }
                      className="inline-block"
                    >
                      {k.label}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <Keyboard onKeyPress={push} sound={soundOn} />
          </div>
          <p className="mx-auto w-full max-w-4xl text-xs text-muted-foreground sm:text-sm">
            The preview card is too narrow for a full-width keyboard, so it
            opens down here where the board fits at its real size.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
