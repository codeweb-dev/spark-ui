import { isBackendEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function getSafeNext(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!isBackendEnabled()) {
    return NextResponse.redirect(new URL("/", url.origin));
  }
  const code = url.searchParams.get("code");
  const next = getSafeNext(url.searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(
    new URL("/?login=1&error=oauth_failed", url.origin),
  );
}
