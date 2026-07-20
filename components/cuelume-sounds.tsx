"use client";

import { bind, play, setEnabled } from "cuelume";
import { Volume2, VolumeX } from "lucide-react";
import * as React from "react";

const STORAGE_KEY = "cuelume-enabled";
const INTERACTIVE =
  "a, button, [role='button'], [role='menuitem'], [role='tab']";
const HOVER_GAP_MS = 150;

const isStoredEnabled = () =>
  typeof window === "undefined" || localStorage.getItem(STORAGE_KEY) !== "off";

// Plays a sound for ANY interactive element, no attributes needed.
// Elements carrying an explicit data-cuelume-* attribute are handled by
// cuelume's own bind() and skipped here so they don't play twice.
let globalBound = false;

function bindGlobal() {
  if (globalBound) return;
  globalBound = true;
  let lastHover = -Infinity;

  const target = (event: Event, attr: string) => {
    const el =
      event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
    return el && !el.closest(`[${attr}]`) ? el : null;
  };

  document.addEventListener(
    "pointerenter",
    (event) => {
      const el = target(event, "data-cuelume-hover");
      if (!el || event.pointerType !== "mouse") return;
      if (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))
        return;
      const now = performance.now();
      if (now - lastHover < HOVER_GAP_MS) return;
      lastHover = now;
      play("tick");
    },
    true
  );
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (target(event, "data-cuelume-press")) play("press");
    },
    true
  );
  document.addEventListener(
    "pointerup",
    (event) => {
      if (target(event, "data-cuelume-release")) play("release");
    },
    true
  );
}

export function CuelumeSounds() {
  React.useEffect(() => {
    setEnabled(isStoredEnabled());
    bind();
    bindGlobal();
  }, []);
  return null;
}

export function SoundToggle() {
  const [enabled, setEnabledState] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration gate
    setMounted(true);
    setEnabledState(isStoredEnabled());
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-md border border-input bg-background" />
    );
  }

  const toggle = () => {
    const next = !enabled;
    setEnabledState(next);
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    if (next) play("success");
  };

  return (
    <button
      onClick={toggle}
      className="relative h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors group"
      aria-label={enabled ? "Mute interaction sounds" : "Unmute interaction sounds"}
    >
      {enabled ? (
        <Volume2
          size={18}
          className="text-muted-foreground group-hover:text-accent-foreground transition-colors"
        />
      ) : (
        <VolumeX
          size={18}
          className="text-muted-foreground group-hover:text-accent-foreground transition-colors"
        />
      )}
    </button>
  );
}
