import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { getAllDocs } from "@/lib/docs";
import { createClient } from "@/lib/supabase/server";
import { Heart, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Favorites",
  description: "Components you saved for quick access.",
};

async function removeFavorite(formData: FormData) {
  "use server";
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const supabase = await createClient();
  // RLS only lets the signed-in user delete their own rows.
  await supabase.from("favorites").delete().eq("id", id);
  revalidatePath("/favorites");
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Components you saved for quick access.
          </p>

          {!favorites?.length ? (
            <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed p-12 text-center">
              <Heart className="size-8 text-muted-foreground" aria-hidden />
              <p className="mt-4 font-medium">No favorites yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap the heart on any component page to save it here.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/docs/components/button">Browse components</Link>
              </Button>
            </div>
          ) : (
            <ul className="mt-8 space-y-3">
              {favorites.map((favorite) => {
                const doc = docsBySlug.get(favorite.component_slug);
                return (
                  <li
                    key={favorite.id}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/docs/${favorite.component_slug}`}
                        className="font-medium hover:underline"
                      >
                        {doc?.title ?? favorite.component_slug}
                      </Link>
                      {doc?.description && (
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {doc.description}
                        </p>
                      )}
                    </div>
                    <form action={removeFavorite}>
                      <input type="hidden" name="id" value={favorite.id} />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${doc?.title ?? favorite.component_slug} from favorites`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </form>
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
