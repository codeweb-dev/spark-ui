"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function EquipButton({
  slug,
  equipped,
}: {
  slug: string;
  equipped: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    setBusy(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // ponytail: earned-check is render-side only; equipping is display-only so
    // a crafted request equipping an unearned slug is harmless.
    const { error } = await supabase
      .from("profiles")
      .update({ equipped_badge: equipped ? null : slug })
      .eq("id", user.id);
    setBusy(false);

    if (error) {
      toast.error("Couldn't update your badge", {
        description: "Something went wrong. Please try again.",
      });
      return;
    }
    router.refresh();
  };

  return (
    <Button
      size="sm"
      variant={equipped ? "secondary" : "outline"}
      className="shrink-0"
      onClick={toggle}
      disabled={busy}
    >
      {equipped ? "Unequip" : "Equip"}
    </Button>
  );
}
