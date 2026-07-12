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
import { Button } from "@/components/ui/button";
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
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm gap-0 rounded-2xl p-0">
        <div className="border-b p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Sign in to Spark UI</DialogTitle>
            <DialogDescription className="pt-1 leading-relaxed">
              Continue with your GitHub account to access your dashboard.
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
          <GitHubLoginButton />
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Authentication is securely handled by Supabase.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
