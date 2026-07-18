import { createClient } from "@/lib/supabase/server";
import { TriangleAlert } from "lucide-react";
import { DeleteAccountButton } from "./delete-account-button";

export const metadata = {
  title: "Settings",
  description: "Your Spark UI account details.",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rows = [
    { label: "Name", value: user?.user_metadata.name },
    {
      label: "Username",
      value:
        user?.user_metadata.user_name ??
        user?.user_metadata.preferred_username,
    },
    { label: "Email", value: user?.email },
    { label: "Signed in with", value: "GitHub" },
    { label: "Member since", value: user && formatDate(user.created_at) },
  ].filter((row) => row.value);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Settings
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your account details, synced from GitHub.
      </p>

      <dl className="mt-8 divide-y rounded-2xl border bg-card">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="truncate text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        Profile details come from your GitHub account. Update them on GitHub
        and sign in again to refresh.
      </p>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-destructive/30">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-destructive/8 to-transparent"
        />
        <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10">
            <TriangleAlert className="size-5 text-destructive" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold tracking-tight">Danger zone</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Permanently delete your account along with your favorites and
              leaderboard scores.
            </p>
          </div>
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
