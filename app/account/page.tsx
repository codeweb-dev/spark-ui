import { getAllDocs } from "@/lib/docs";
import { createClient } from "@/lib/supabase/server";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: favorites } = await supabase
    .from("favorites")
    .select("id, component_slug, created_at")
    .order("created_at", { ascending: false });

  const docsBySlug = new Map(getAllDocs().map((doc) => [doc.slug, doc]));
  const visibleFavorites =
    favorites?.filter((f) => docsBySlug.has(f.component_slug)) ?? [];

  const firstName = (
    user?.user_metadata.name ??
    user?.user_metadata.user_name ??
    "there"
  ).split(" ")[0];

  const stats = [
    { value: visibleFavorites.length, label: "Saved favorites" },
    { value: docsBySlug.size, label: "Components available" },
    { value: user ? formatDate(user.created_at) : "—", label: "Member since" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Hi, {firstName} 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        Here&apos;s what&apos;s happening with your account.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border bg-card p-5">
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-semibold tracking-tight">Recent favorites</h2>
          <Link
            href="/account/favorites"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>
        {visibleFavorites.length === 0 ? (
          <p className="px-5 py-8 text-sm text-muted-foreground">
            No favorites yet. Tap the heart on any component page and it will
            show up here.
          </p>
        ) : (
          <ul className="divide-y">
            {visibleFavorites.slice(0, 5).map((favorite) => {
              const doc = docsBySlug.get(favorite.component_slug);
              return (
                <li key={favorite.id}>
                  <Link
                    href={`/docs/${favorite.component_slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 font-medium">
                        {doc?.title ?? favorite.component_slug}
                        <ArrowUpRight
                          className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </p>
                      {doc?.description && (
                        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                          {doc.description}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground/70">
                      {formatDate(favorite.created_at)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
