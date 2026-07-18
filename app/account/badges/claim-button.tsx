"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ClaimBadgeButton({
  slug,
  actionLabel,
  actionUrl,
}: {
  slug: string;
  actionLabel?: string | null;
  actionUrl?: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const claim = async () => {
    setBusy(true);
    const res = await fetch("/api/badges/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);

    if (res.ok && data.earned) {
      toast.success("Badge unlocked!", {
        description: "You can equip it now.",
      });
      router.refresh();
    } else if (res.ok) {
      toast("Not eligible yet", { description: data.reason });
    } else {
      toast.error("Couldn't verify", {
        description: data.error ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      {actionLabel && actionUrl && (
        <Button asChild variant="outline" size="sm">
          <a href={actionUrl} target="_blank" rel="noreferrer">
            {actionLabel}
          </a>
        </Button>
      )}
      <Button size="sm" onClick={claim} disabled={busy}>
        {busy ? "Checking…" : "Verify"}
      </Button>
    </div>
  );
}
