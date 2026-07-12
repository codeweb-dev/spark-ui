"use client";

import { createClient } from "@/lib/supabase/client";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function RemoveFavoriteButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    setBusy(true);
    // RLS only lets the signed-in user delete their own rows.
    const { error } = await createClient()
      .from("favorites")
      .delete()
      .eq("id", id);
    setBusy(false);

    if (error) {
      toast.error(`Couldn't remove ${title}`, {
        description: "Something went wrong. Please try again.",
      });
      return;
    }
    toast(`${title} removed from favorites`, {
      description: "You can add it back anytime from its component page.",
    });
    router.refresh();
  };

  return (
    <button
      onClick={remove}
      disabled={busy}
      aria-label={`Remove ${title} from favorites`}
      title="Remove from favorites"
      className="relative z-10 flex size-8 items-center justify-center rounded-lg border bg-background text-rose-500 transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 disabled:opacity-50"
    >
      <Heart className="size-4 fill-current" aria-hidden />
    </button>
  );
}
