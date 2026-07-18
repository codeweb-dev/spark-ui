import { Navbar } from "@/components/landing/Navbar";
import TwitterXIcon from "@/components/ui/twitter-x-icon";
import { isBackendEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { BadgeArt } from "@/components/badges/badge-art";
import {
  Facebook,
  Instagram,
  Link as LinkSocialMedia,
  Linkedin,
  Plus,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountNav } from "./account-nav";
import { EditProfileDialog } from "./edit-profile-dialog";
import { Badge } from "@/components/ui/badge";

const SOCIAL_ICONS = [
  { key: "x", label: "X", icon: TwitterXIcon },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "tiktok", label: "TikTok", icon: LinkSocialMedia },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "instagram", label: "Instagram", icon: Instagram },
];

export const metadata = {
  title: "Account",
  description: "Manage your Spark UI account.",
};

function formatJoined(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isBackendEnabled()) redirect("/");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/?login=1");

  const name =
    user.user_metadata.name ??
    user.user_metadata.user_name ??
    user.email ??
    "GitHub user";
  const username =
    user.user_metadata.user_name ?? user.user_metadata.preferred_username;
  const avatarUrl = user.user_metadata.avatar_url as string | undefined;

  const [{ data: profile }, { data: linkRows }] = await Promise.all([
    supabase
      .from("profiles")
      .select("member_number, equipped_badge, bio")
      .eq("id", user.id)
      .single(),
    supabase
      .from("profile_links")
      .select("platform, url")
      .eq("user_id", user.id),
  ]);
  const memberNumber = profile?.member_number as number | undefined;
  const bio = (profile?.bio as string | null) ?? "";
  const links = Object.fromEntries(
    linkRows?.map((row) => [row.platform as string, row.url as string]) ?? [],
  );

  const { data: equippedBadge } = profile?.equipped_badge
    ? await supabase
        .from("badges")
        .select("title, image_url")
        .eq("slug", profile.equipped_badge as string)
        .single()
    : { data: null };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="size-24 shrink-0 rounded-full border md:size-28"
              />
            ) : (
              <span className="flex size-24 shrink-0 items-center justify-center rounded-full border bg-muted text-3xl font-medium md:size-28">
                {name[0]?.toUpperCase()}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold tracking-tight md:text-3xl">
                  {name}
                </h1>
                {equippedBadge ? (
                  <Badge variant="outline">
                    <BadgeArt
                      imageUrl={equippedBadge.image_url as string | null}
                      size={14}
                    />
                    <span className="ml-1">
                      {equippedBadge.title as string}
                    </span>
                  </Badge>
                ) : (
                  <Link href="/account/badges">
                    <Badge variant="outline">
                      <Plus size={12} className="mr-2" /> Custom Badge
                    </Badge>
                  </Link>
                )}
              </div>

              {username && (
                <p className="mt-1 text-muted-foreground">@{username}</p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {memberNumber != null && (
                  <Badge variant="outline">#{memberNumber}</Badge>
                )}
                <span>Joined {formatJoined(user.created_at)}</span>
              </div>
            </div>

            <EditProfileDialog initialBio={bio} initialLinks={links} />
          </header>

          <div className="mt-6 flex flex-col gap-2">
            {bio && <p className="max-w-lg text-sm">{bio}</p>}

            {Object.keys(links).length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-4">
                {SOCIAL_ICONS.map(({ key, label, icon: Icon }) =>
                  links[key] ? (
                    <a
                      key={key}
                      href={links[key]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <Badge variant="outline">
                        <Icon size={12} className="mr-2" /> {label}
                      </Badge>
                    </a>
                  ) : null,
                )}
              </div>
            )}
          </div>

          <div className="mt-8 border-b">
            <AccountNav />
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </main>
    </>
  );
}
