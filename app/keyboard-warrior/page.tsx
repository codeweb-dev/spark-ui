import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { isBackendEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { Keyboard as KeyboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Keyboard Warrior",
  description: "Top typing scores from the Spark UI type test.",
};

export const dynamic = "force-dynamic";

type Score = {
  id: string;
  username: string;
  wpm: number;
  accuracy: number;
  created_at: string;
  profiles: {
    avatar_url: string | null;
  } | null;
};

type PodiumRank = 0 | 1 | 2;

type RankArt = {
  ring: string;
  medal: string;
  avatarSize: string;
  avatarTop: string;
};

const RANK_ART: Record<PodiumRank, RankArt> = {
  0: {
    ring: "gold-ring",
    medal: "gold-medal",
    avatarSize: "80%",
    avatarTop: "55%",
  },
  1: {
    ring: "silver-ring",
    medal: "silver-medal",
    avatarSize: "80%",
    avatarTop: "54%",
  },
  2: {
    ring: "bronze-ring",
    medal: "bronze-medal",
    avatarSize: "80%",
    avatarTop: "52%",
  },
};

const PODIUM_STYLE = {
  0: {
    height: "h-36 sm:h-44",
    tone: "border-yellow-500/40 bg-linear-to-b from-yellow-500/25 to-yellow-500/5",
    label: "1st",
  },
  1: {
    height: "h-28 sm:h-32",
    tone: "border-border bg-linear-to-b from-muted to-muted/20",
    label: "2nd",
  },
  2: {
    height: "h-24 sm:h-28",
    tone: "border-amber-800/30 bg-linear-to-b from-amber-800/20 to-amber-800/5",
    label: "3rd",
  },
} satisfies Record<
  PodiumRank,
  {
    height: string;
    tone: string;
    label: string;
  }
>;

function Avatar({
  score,
  className,
  size,
}: {
  score: Score;
  className?: string;
  size: number;
}) {
  const avatarUrl = score.profiles?.avatar_url;

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={`${score.username}'s avatar`}
        width={size}
        height={size}
        className={`${className ?? ""} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`${className ?? ""} flex shrink-0 items-center justify-center rounded-full border border-border bg-muted font-semibold uppercase`}
    >
      {score.username.charAt(0)}
    </span>
  );
}

function RankedAvatar({ score, rank }: { score: Score; rank: PodiumRank }) {
  const rankArt = RANK_ART[rank];

  return (
    <div className="relative size-16 shrink-0 sm:size-20">
      <div
        className="absolute left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
        style={{
          width: rankArt.avatarSize,
          height: rankArt.avatarSize,
          top: rankArt.avatarTop,
        }}
      >
        <Avatar
          score={score}
          size={96}
          className="size-full border-0 text-lg"
        />
      </div>

      <Image
        src={`/images/ranks/${rankArt.ring}.png`}
        alt=""
        fill
        priority={rank === 0}
        sizes="(min-width: 640px) 80px, 64px"
        className="pointer-events-none z-10 object-contain"
        aria-hidden
      />
    </div>
  );
}

function formatPostedDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ordinal(value: number) {
  const lastTwoDigits = value % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${value}th`;
  }

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export default async function KeyboardWarriorPage() {
  let scores: Score[] | null = null;

  if (isBackendEnabled()) {
    const supabase = await createClient();

    const { data } = await supabase
      .from("type_test_scores")
      .select("id, username, wpm, accuracy, created_at, profiles(avatar_url)")
      .order("wpm", { ascending: false })
      .order("accuracy", { ascending: false })
      .limit(50);

    scores =
      data?.map((row) => ({
        ...row,
        profiles: Array.isArray(row.profiles)
          ? (row.profiles[0] ?? null)
          : row.profiles,
      })) ?? null;
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto mt-14 w-full max-w-6xl px-6 pb-16 lg:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Leaderboard
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Keyboard Warrior
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Top scores from the 15-second type test on the homepage.
            </p>
          </div>

          <Button asChild className="shrink-0 rounded-full">
            <Link href="/">
              <KeyboardIcon size={16} aria-hidden />
              Take the test
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          {!isBackendEnabled() ? (
            <p className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
              The leaderboard needs the Spark UI backend, which is switched off
              in this build. Set{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                NEXT_PUBLIC_BACKEND=true
              </code>{" "}
              with your Supabase project. See{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                supabase/examples/type-test-scores.sql
              </code>{" "}
              to turn it on.
            </p>
          ) : !scores?.length ? (
            <p className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
              No scores yet — take the type test and be the first Keyboard
              Warrior.
            </p>
          ) : (
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-10">
              <div className="flex items-end justify-center gap-3 self-end border-b border-border pt-10 sm:gap-5">
                {([1, 0, 2] as const).map((rank) => {
                  const score = scores[rank];

                  if (!score) {
                    return null;
                  }

                  const podium = PODIUM_STYLE[rank];
                  const rankArt = RANK_ART[rank];

                  return (
                    <div
                      key={score.id}
                      className="flex w-28 flex-col items-center gap-2 sm:w-40"
                    >
                      <RankedAvatar score={score} rank={rank} />

                      <div className="flex items-center justify-center gap-2">
                        <span
                          className="w-full truncate text-center text-sm font-medium"
                          title={score.username}
                        >
                          {score.username}
                        </span>

                        <Image
                          src={`/images/ranks/${rankArt.medal}.png`}
                          alt=""
                          width={24}
                          height={24}
                          className="size-4 shrink-0 object-contain"
                          aria-hidden
                        />
                      </div>

                      <div
                        className={`flex w-full flex-col items-center gap-2 rounded-t-2xl border border-b-0 pt-4 sm:pt-5 ${podium.height} ${podium.tone}`}
                      >
                        <span className="text-lg font-semibold">
                          {podium.label}
                        </span>

                        <span className="max-w-[calc(100%-1rem)] truncate rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                          {score.wpm} wpm · {score.accuracy}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {scores.map((score, index) => (
                  <li
                    key={score.id}
                    className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6"
                  >
                    <span className="w-10 shrink-0 text-center text-sm tabular-nums text-muted-foreground sm:w-12">
                      {ordinal(index + 1)}
                    </span>

                    <Avatar
                      score={score}
                      size={32}
                      className="size-8 text-xs"
                    />

                    <span
                      className="min-w-0 flex-1 truncate font-medium"
                      title={score.username}
                    >
                      {score.username}
                    </span>

                    <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                      {formatPostedDate(score.created_at)}
                    </span>

                    <span className="hidden w-20 shrink-0 text-right font-mono text-sm text-muted-foreground xs:block">
                      {score.accuracy}% acc
                    </span>

                    <span className="w-20 shrink-0 text-right font-mono sm:w-24">
                      <strong className="text-lg">{score.wpm}</strong>{" "}
                      <span className="text-xs text-muted-foreground">wpm</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
