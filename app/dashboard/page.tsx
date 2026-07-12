import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  description: "Your private Spark UI dashboard.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/?login=1");

  const displayName =
    user.user_metadata.user_name ??
    user.user_metadata.preferred_username ??
    user.user_metadata.name ??
    user.email ??
    "GitHub user";

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-sm">
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          {displayName}
        </h1>
        {user.email && (
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        )}
        <div className="mt-8 border-t pt-6">
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
