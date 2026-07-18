import { BadgeArt } from "@/components/badges/badge-art";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: earnedBadges } = await supabase
    .from("user_badges")
    .select("badge_slug, badges(title, image_url)")
    .eq("user_id", user!.id);

  const firstName = (
    user?.user_metadata.name ??
    user?.user_metadata.user_name ??
    "there"
  ).split(" ")[0];

  const badges = (earnedBadges ?? []).map((row) => {
    const badge = row.badges as unknown as {
      title: string;
      image_url: string | null;
    } | null;
    return {
      slug: row.badge_slug as string,
      title: badge?.title ?? row.badge_slug,
      imageUrl: badge?.image_url ?? null,
    };
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Hi, {firstName} 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        Here&apos;s what&apos;s happening with your account.
      </p>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Badges</h2>
        {badges.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No badges yet — earn your first one on the badges page.
          </p>
        ) : (
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
            {badges.map((badge) => (
              <div key={badge.slug} className="flex items-center gap-3">
                <BadgeArt imageUrl={badge.imageUrl} size={40} />
                <p className="font-semibold tracking-tight">{badge.title}</p>
              </div>
            ))}
          </div>
        )}
        <Link
          href="/account/badges"
          className="mt-5 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all badges
        </Link>
      </div>
    </div>
  );
}
