"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { Heart, Trash2, TriangleAlert, Trophy, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CONSEQUENCES = [
  { icon: User, label: "Your profile", detail: "Username and member number" },
  { icon: Heart, label: "Your favorites", detail: "Every saved component" },
  {
    icon: Trophy,
    label: "Your leaderboard score",
    detail: "Keyboard Warrior stats",
  },
];

export function DeleteAccountButton() {
  const [busy, setBusy] = useState(false);

  const deleteAccount = async () => {
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.rpc("delete_account");

    if (error) {
      setBusy(false);
      toast.error("Couldn't delete your account", {
        description: "Something went wrong. Please try again.",
      });
      return;
    }

    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="size-4" aria-hidden />
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-2xl p-0">
        <div className="relative border-b px-6 pb-6 pt-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-destructive/10 to-transparent"
          />
          <div className="relative mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 shadow-sm">
            <TriangleAlert className="size-6 text-destructive" aria-hidden />
          </div>
          <DialogHeader className="relative text-center sm:text-center">
            <DialogTitle className="text-xl tracking-tight">
              Delete your account?
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              This is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <ul className="mb-6 space-y-4">
            {CONSEQUENCES.map(({ icon: Icon, label, detail }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5">
                  <Icon className="size-4 text-destructive" aria-hidden />
                </span>
                <div className="text-sm">
                  <p className="font-medium">{label}</p>
                  <p className="text-muted-foreground">{detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <Button
              variant="destructive"
              className="w-full"
              onClick={deleteAccount}
              disabled={busy}
            >
              {busy ? "Deleting…" : "Yes, delete my account"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" disabled={busy}>
                Keep my account
              </Button>
            </DialogClose>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            You can sign in with GitHub again anytime — you&apos;ll just start
            fresh.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
