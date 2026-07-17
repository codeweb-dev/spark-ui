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
import { Keyboard as KeyboardIcon } from "lucide-react";

export default function KeyboardDemo() {
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
          <DialogHeader className="mx-auto w-full max-w-4xl">
            <DialogTitle>Keyboard</DialogTitle>
            <DialogDescription>
              Type on your physical keyboard to see the keys press down.
            </DialogDescription>
          </DialogHeader>
          <Keyboard className="mx-auto" />
          <p className="mx-auto w-full text-center max-w-4xl text-xs text-muted-foreground sm:text-sm">
            The preview card is too narrow for a full-width keyboard, so it
            opens down here where the board fits at its real size.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
