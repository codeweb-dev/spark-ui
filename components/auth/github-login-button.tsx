"use client";

import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/ui/github-icon";
import { createClient } from "@/lib/supabase/client";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export function GitHubLoginButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signIn = async () => {
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setMessage("GitHub sign-in could not be started. Please try again.");
        setLoading(false);
      }
    } catch {
      setMessage("GitHub sign-in is unavailable right now. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        className="w-full"
        onClick={signIn}
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
        ) : (
          <GithubIcon size={18} aria-hidden />
        )}
        {loading ? "Redirecting to GitHub…" : "Continue with GitHub"}
      </Button>
      {message && (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}
    </div>
  );
}
