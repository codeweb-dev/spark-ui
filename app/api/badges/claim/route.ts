import { SITE_CONFIG } from "@/lib/constants";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const [OWNER, REPO] = new URL(SITE_CONFIG.github).pathname.slice(1).split("/");
const REPO_FULL = `${OWNER}/${REPO}`;

async function gh(path: string) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  return res.json();
}

async function searchHasResults(q: string) {
  const data = await gh(`/search/issues?q=${encodeURIComponent(q)}&per_page=1`);
  return (data.total_count as number) > 0;
}

// The repo's stargazers list requires auth on GitHub's API, but a user's
// starred repos are public — so we check the user's 500 most recent stars.
// ponytail: misses our repo only if the user starred it long ago AND has
// 500+ newer stars. Set GITHUB_TOKEN to lift the 60 req/hr anon limit.
async function hasStarred(username: string) {
  for (let page = 1; page <= 5; page++) {
    const repos: { full_name: string }[] = await gh(
      `/users/${username}/starred?per_page=100&sort=created&direction=desc&page=${page}`,
    );
    if (
      repos.some((r) => r.full_name.toLowerCase() === REPO_FULL.toLowerCase())
    ) {
      return true;
    }
    if (repos.length < 100) return false;
  }
  return false;
}

// Self-claimable badges. Helper is deliberately absent: it's granted manually
// from the dashboard.
const CHECKS: Record<
  string,
  { check: (username: string) => Promise<boolean>; reason: string }
> = {
  stargazer: {
    check: hasStarred,
    reason: "No star found yet. Star the repo on GitHub, then verify again.",
  },
  "bug-hunter": {
    check: (username) =>
      searchHasResults(`repo:${REPO_FULL} author:${username} type:issue`),
    reason: "No issues from your account yet. Report a bug first.",
  },
  contributor: {
    check: (username) =>
      searchHasResults(`repo:${REPO_FULL} author:${username} type:pr is:merged`),
    reason: "No merged pull request from your account yet.",
  },
  "christmas-2026": {
    check: async () => {
      const now = new Date();
      return now >= new Date("2026-12-01") && now < new Date("2027-01-01");
    },
    reason: "The winter event runs in December 2026. Come back then!",
  },
};

export async function POST(request: Request) {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Badge granting is not configured." },
      { status: 500 },
    );
  }

  const { slug } = await request.json().catch(() => ({}));
  const entry = typeof slug === "string" ? CHECKS[slug] : undefined;
  if (!entry) {
    return NextResponse.json(
      { error: "This badge can't be claimed." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const username =
    user.user_metadata.user_name ?? user.user_metadata.preferred_username;
  if (!username) {
    return NextResponse.json(
      { error: "No GitHub username on this account." },
      { status: 400 },
    );
  }

  let earned: boolean;
  try {
    earned = await entry.check(username);
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach GitHub. Try again in a bit." },
      { status: 502 },
    );
  }

  if (!earned) return NextResponse.json({ earned: false, reason: entry.reason });

  const admin = createAdminClient(getSupabaseConfig().url, secretKey);
  const { error } = await admin
    .from("user_badges")
    .upsert({ user_id: user.id, badge_slug: slug });
  if (error) {
    return NextResponse.json(
      { error: "Couldn't grant the badge." },
      { status: 500 },
    );
  }

  return NextResponse.json({ earned: true });
}
