import { RemoveFavoriteButton } from "@/components/favorites/remove-favorite-button";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { getAllDocs } from "@/lib/docs";
import { createClient } from "@/lib/supabase/server";
import { ArrowUpRight, Heart } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Favorites",
  description: "Components you saved for quick access.",
};

function formatSavedDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function FavoritesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/?login=1");

  const { data: favorites } = await supabase
    .from("favorites")
    .select("id, component_slug, created_at")
    .order("created_at", { ascending: false });

  const docsBySlug = new Map(getAllDocs().map((doc) => [doc.slug, doc]));
  const count = favorites?.length ?? 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Your library
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Favorites
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Components you saved, ready when you are.
              </p>
            </div>
            {count > 0 && (
              <span className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                <Heart
                  className="size-3 fill-rose-500 text-rose-500"
                  aria-hidden
                />
                {count} saved
              </span>
            )}
          </div>

          {count === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed px-8 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl border bg-card shadow-sm">
                <Heart className="size-5 text-muted-foreground" aria-hidden />
              </span>
              <p className="mt-5 font-medium">No favorites yet</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Tap the heart on any component page and it will show up here.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/docs/components/button">Browse components</Link>
              </Button>
            </div>
          ) : (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {favorites!.map((favorite) => {
                const doc = docsBySlug.get(favorite.component_slug);
                const title = doc?.title ?? favorite.component_slug;
                return (
                  <li
                    key={favorite.id}
                    className="group relative flex flex-col rounded-2xl border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                          {doc?.category ?? "Component"}
                        </p>
                        <Link
                          href={`/docs/${favorite.component_slug}`}
                          className="mt-1.5 flex items-center gap-1 font-semibold tracking-tight after:absolute after:inset-0"
                        >
                          {title}
                          <ArrowUpRight
                            className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      </div>
                      <RemoveFavoriteButton id={favorite.id} title={title} />
                    </div>
                    {doc?.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    )}
                    <p className="mt-4 text-xs text-muted-foreground/70">
                      Saved {formatSavedDate(favorite.created_at)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
