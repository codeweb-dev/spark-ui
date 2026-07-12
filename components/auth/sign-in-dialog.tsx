"use client";

import { GitHubLoginButton } from "@/components/auth/github-login-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogoIcon } from "@/components/landing/logo-icon";
import { Send, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function SignInDialog() {
  const searchParams = useSearchParams();
  const [manualOpen, setManualOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const requestedOpen = searchParams.get("login") === "1";
  const open = manualOpen || (requestedOpen && !dismissed);
  const oauthFailed = searchParams.get("error") === "oauth_failed";

  const handleOpenChange = (nextOpen: boolean) => {
    setManualOpen(nextOpen);
    setDismissed(!nextOpen);

    if (!nextOpen && window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-2xl p-0">
        <div className="relative border-b px-6 pb-6 pt-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/6 to-transparent"
          />
          <div className="relative mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border bg-background shadow-sm">
            <LogoIcon className="size-6" />
          </div>
          <DialogHeader className="relative text-center sm:text-center">
            <DialogTitle className="text-xl tracking-tight">
              Sign in to Spark UI
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              One click with GitHub — no forms, no passwords.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-6">
          {oauthFailed && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
            >
              GitHub sign-in was not completed. Please try again.
            </p>
          )}
          <ul className="mb-6 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                <Star className="size-4" aria-hidden />
              </span>
              <div className="text-sm">
                <p className="font-medium">Save favorites</p>
                <p className="text-muted-foreground">
                  Keep your go-to components in one place.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                <Send className="size-4" aria-hidden />
              </span>
              <div className="text-sm">
                <p className="font-medium">
                  Submit your work
                  <span className="ml-2 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Soon
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Share your projects to the showcase.
                </p>
              </div>
            </li>
          </ul>
          <GitHubLoginButton />
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Authentication is securely handled by Supabase.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
