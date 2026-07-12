"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* Multiple previews on one page share the same slug; this event keeps
   their hearts in sync without shared state. */
const FAVORITES_CHANGED = "spark:favorites-changed";

export function FavoriteButton() {
  const pathname = usePathname();
  const router = useRouter();
  const slug = pathname.startsWith("/docs/")
    ? pathname.slice("/docs/".length)
    : null;
  const [signedIn, setSignedIn] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient();
    let active = true;

    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;
      setSignedIn(!!session);
      if (!session) {
        setFavorited(false);
        return;
      }
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("component_slug", slug)
        .maybeSingle();
      if (active) setFavorited(!!data);
    };

    load();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => load());
    window.addEventListener(FAVORITES_CHANGED, load);
    return () => {
      active = false;
      subscription.unsubscribe();
      window.removeEventListener(FAVORITES_CHANGED, load);
    };
  }, [slug]);

  if (!slug) return null;

  const toggle = async () => {
    if (!signedIn) {
      router.push("?login=1", { scroll: false });
      return;
    }
    setBusy(true);
    const supabase = createClient();
    // RLS scopes both calls to the signed-in user; user_id defaults to auth.uid().
    const { error } = favorited
      ? await supabase.from("favorites").delete().eq("component_slug", slug)
      : await supabase.from("favorites").insert({ component_slug: slug });
    if (!error) {
      setFavorited(!favorited);
      window.dispatchEvent(new Event(FAVORITES_CHANGED));
    }
    setBusy(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-pressed={favorited}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      title="Favorite"
      className="p-1.5 h-7 w-7 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95 disabled:opacity-50"
    >
      <Heart
        size={12}
        className={cn(favorited && "fill-rose-500 text-rose-500")}
      />
    </button>
  );
}
