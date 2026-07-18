import { BadgeArt } from "@/components/badges/badge-art";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { ClaimBadgeButton } from "./claim-button";
import { EquipButton } from "./equip-button";

// Badges with a self-serve check in /api/badges/claim. Helper stays manual.
const CLAIMABLE = new Set([
  "stargazer",
  "bug-hunter",
  "contributor",
  "christmas-2026",
  "kw-gold",
  "kw-silver",
  "kw-bronze",
]);

export const metadata = {
  title: "Badges",
  description: "Badges you can earn on Spark UI.",
};

interface BadgeRow {
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  action_label: string | null;
  action_url: string | null;
  coming_soon: boolean;
}

function StatusPill({ earned }: { earned: boolean }) {
  return earned ? (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
      <Check className="size-3" aria-hidden />
      Unlocked
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
      Locked
    </span>
  );
}

export default async function BadgesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: badges }, { data: earnedRows }, { data: profile }] =
    await Promise.all([
      supabase.from("badges").select("*").order("sort_order"),
      supabase.from("user_badges").select("badge_slug").eq("user_id", user!.id),
      supabase
        .from("profiles")
        .select("equipped_badge")
        .eq("id", user!.id)
        .single(),
    ]);

  const equippedBadge = profile?.equipped_badge as string | null | undefined;
  const earned = new Set(earnedRows?.map((row) => row.badge_slug as string));

  const rowClass =
    "flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-foreground/20";

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Badges</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Earn badges by competing, contributing, and supporting Spark UI.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {((badges ?? []) as BadgeRow[]).map((badge) => {
          const isEarned = earned.has(badge.slug);

          return (
            <div key={badge.slug} className={rowClass}>
              <BadgeArt imageUrl={badge.image_url} size={32} />

              <div className="min-w-0 flex-1">
                <p className="font-semibold tracking-tight">{badge.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>

              {badge.coming_soon ? (
                <span className="inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                  Soon
                </span>
              ) : isEarned ? (
                <div className="flex shrink-0 items-center gap-2">
                  <StatusPill earned />
                  <EquipButton
                    slug={badge.slug}
                    equipped={equippedBadge === badge.slug}
                  />
                </div>
              ) : CLAIMABLE.has(badge.slug) ? (
                <ClaimBadgeButton
                  slug={badge.slug}
                  actionLabel={badge.action_label}
                  actionUrl={badge.action_url}
                />
              ) : badge.action_label && badge.action_url ? (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  <Link href={badge.action_url}>{badge.action_label}</Link>
                </Button>
              ) : (
                <StatusPill earned={false} />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Custom Badges
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            <Sparkles className="size-3" aria-hidden />
            New
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Custom badges let you create your own badge with a custom icon and
          name, shown next to your profile.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button disabled>Purchase</Button>
          <Button variant="outline" disabled>
            Preview Custom Badge
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Coming soon.</p>
      </div>
    </div>
  );
}
