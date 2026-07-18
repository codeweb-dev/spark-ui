import { FavoritesMasonry } from "@/components/favorites/favorites-masonry";
import { Button } from "@/components/ui/button";
import { getAllDocs } from "@/lib/docs";
import { createClient } from "@/lib/supabase/server";
import { Heart } from "lucide-react";
import Link from "next/link";

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

  const { data: favorites } = await supabase
    .from("favorites")
    .select("id, component_slug, created_at")
    .order("created_at", { ascending: false });

  const docsBySlug = new Map(getAllDocs().map((doc) => [doc.slug, doc]));
  const visibleFavorites = favorites?.filter((favorite) =>
    docsBySlug.has(favorite.component_slug),
  );
  const count = visibleFavorites?.length ?? 0;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Favorites
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Components you saved, ready when you are.
          </p>
        </div>
        {count > 0 && (
          <span className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            <Heart className="size-3 fill-rose-500 text-rose-500" aria-hidden />
            {count} saved
          </span>
        )}
      </div>

      {count === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed px-8 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl border bg-card shadow-sm">
            <Heart className="size-5 text-muted-foreground" aria-hidden />
          </span>
          <p className="mt-5 font-medium">No favorites yet</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Tap the heart on any component page and it will show up here.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/docs/components">Browse components</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          <FavoritesMasonry
            items={visibleFavorites!.map((favorite) => {
              const doc = docsBySlug.get(favorite.component_slug);
              return {
                id: favorite.id,
                slug: favorite.component_slug,
                title: doc?.title ?? favorite.component_slug,
                description: doc?.description,
                category: doc?.category,
                savedAt: formatSavedDate(favorite.created_at),
              };
            })}
          />
        </div>
      )}
    </div>
  );
}
