/* Backend features (GitHub login + favorites) are opt-in so the open-source
   frontend runs with zero Supabase setup. Enabled only when the flag isn't
   "false" AND the public Supabase values are present. */
export function isBackendEnabled() {
  return (
    process.env.NEXT_PUBLIC_BACKEND !== "false" &&
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return { url, publishableKey };
}
