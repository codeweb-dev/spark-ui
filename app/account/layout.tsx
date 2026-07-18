import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isBackendEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { BadgeArt } from "@/components/badges/badge-art";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountNav } from "./account-nav";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("member_number, equipped_badge")
    .eq("id", user.id)
    .single();
  const memberNumber = profile?.member_number as number | undefined;

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
                  <div className="inline-flex h-6 items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2 text-xs font-medium leading-none text-white/90 backdrop-blur">
                    <BadgeArt
                      imageUrl={equippedBadge.image_url as string | null}
                      size={14}
                    />
                    <span>{equippedBadge.title as string}</span>
                  </div>
                ) : (
                  <Link
                    href="/account/badges"
                    className="inline-flex h-6 items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 text-xs font-medium leading-none text-white/90 backdrop-blur transition-colors hover:bg-black/50"
                  >
                    <Plus className="size-3.5 shrink-0" strokeWidth={2} />
                    <span>Custom Badge</span>
                  </Link>
                )}
              </div>

              {username && (
                <p className="mt-1 text-muted-foreground">@{username}</p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {memberNumber != null && (
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-2 text-xs font-medium text-white/90 backdrop-blur">
                    #{memberNumber}
                  </span>
                )}
                <span>Joined {formatJoined(user.created_at)}</span>
              </div>
            </div>

            {username && (
              <Button
                asChild
                variant="outline"
                className="shrink-0 self-start sm:self-center"
              >
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub profile
                </a>
              </Button>
            )}
          </header>

          <div className="mt-8 border-b">
            <AccountNav />
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </main>
    </>
  );
}
