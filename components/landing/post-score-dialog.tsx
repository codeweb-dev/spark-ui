"use client";

import { GitHubLoginButton } from "@/components/auth/github-login-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { isBackendEnabled } from "@/lib/supabase/config";
import type { User } from "@supabase/supabase-js";
import {
  ArrowUpRight,
  Keyboard as KeyboardIcon,
  LoaderCircle,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostScoreDialogProps {
  wpm: number;
  accuracy: number;
  /** Notifies the parent when the dialog opens/closes (e.g. to pause Esc handling). */
  onOpenChange?: (open: boolean) => void;
}

function displayName(user: User): string {
  const meta = user.user_metadata as Record<string, unknown>;
  const name =
    (typeof meta.user_name === "string" && meta.user_name) ||
    (typeof meta.full_name === "string" && meta.full_name) ||
    user.email?.split("@")[0] ||
    "anonymous";
  return name.slice(0, 60);
}

export function PostScoreDialog({
  wpm,
  accuracy,
  onOpenChange,
}: PostScoreDialogProps) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setChecking(true);
      setStatus("idle");
    }
    onOpenChange?.(next);
  };
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const backend = isBackendEnabled();

  useEffect(() => {
    if (!open || !backend) return;
    let active = true;
    createClient()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (!active) return;
        setUser(session?.user ?? null);
        setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [open, backend]);

  const post = async () => {
    if (!user) return;
    setStatus("saving");
    // one row per user — posting again replaces the previous run
    const { error } = await createClient()
      .from("type_test_scores")
      .upsert(
        {
          user_id: user.id,
          username: displayName(user),
          wpm,
          accuracy,
          created_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    setStatus(error ? "error" : "done");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Trophy size={14} aria-hidden /> Post score
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-2xl p-0 text-left">
        <div className="relative border-b px-6 pb-6 pt-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/6 to-transparent"
          />
          <div className="relative mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border bg-background shadow-sm">
            <KeyboardIcon className="size-6" aria-hidden />
          </div>
          <DialogHeader className="relative text-center sm:text-center">
            <DialogTitle className="text-xl tracking-tight">
              Post your score
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              Put your run on the Keyboard Warrior leaderboard.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-6">
          <p className="mb-6 flex items-baseline justify-center gap-4 rounded-xl border bg-muted/40 px-4 py-3 font-mono">
            <span>
              <strong className="text-3xl font-medium text-foreground">
                {wpm}
              </strong>{" "}
              <span className="text-sm text-muted-foreground">wpm</span>
            </span>
            <span>
              <strong className="text-3xl font-medium text-foreground">
                {accuracy}
              </strong>
              <span className="text-sm text-muted-foreground">% acc</span>
            </span>
          </p>

          {!backend ? (
            <p className="text-center text-sm text-muted-foreground">
              The leaderboard needs the Spark UI backend, which is switched off
              in this build. Your score stays yours — screenshot it!
            </p>
          ) : checking ? (
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Checking your session…
            </p>
          ) : status === "done" ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Score posted. Go see where you landed!
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href="/keyboard-warrior">
                  View leaderboard <ArrowUpRight size={16} aria-hidden />
                </Link>
              </Button>
            </div>
          ) : user ? (
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={post}
                disabled={status === "saving"}
              >
                {status === "saving" ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Trophy size={16} aria-hidden />
                )}
                {status === "saving"
                  ? "Posting…"
                  : `Post as ${displayName(user)}`}
              </Button>
              {status === "error" && (
                <p role="alert" className="text-center text-sm text-destructive">
                  Posting failed. Please try again.
                </p>
              )}
              <p className="text-center text-xs text-muted-foreground">
                One score per player — posting again replaces your previous
                run.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <GitHubLoginButton />
              <p className="text-center text-xs text-muted-foreground">
                Sign in with GitHub to post — you&apos;ll come back to the
                homepage after.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
