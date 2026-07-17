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
import { Keyboard as KeyboardIcon, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function KeyboardDemo() {
  const [soundOn, setSoundOn] = useState(true);

  return (
    <div className="flex w-full justify-center p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <KeyboardIcon className="mr-2 size-4" aria-hidden />
            Open keyboard
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
                Type on your physical keyboard to see the keys press down.
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
          <Keyboard className="mx-auto" sound={soundOn} />
          <p className="mx-auto w-full max-w-4xl text-center text-xs text-muted-foreground sm:text-sm">
            The preview card is too narrow for a full-width keyboard, so it
            opens down here where the board fits at its real size.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
