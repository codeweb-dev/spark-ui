-- LOCAL-DEV EXAMPLE — mirrors the production `favorites` schema the frontend
-- depends on. Run this in your personal/local Supabase project's SQL editor.
-- The production migration lives in the private backend repository.

-- Favorites: docs pages a signed-in user has hearted.
-- Rows are scoped to their owner via RLS; the anon/publishable key can only
-- ever read or write the caller's own favorites.

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  component_slug text not null
    check (component_slug ~ '^[a-z0-9]+([/-][a-z0-9]+)*$')
    check (char_length(component_slug) <= 120),
  created_at timestamptz not null default now(),
  unique (user_id, component_slug)
);

alter table public.favorites enable row level security;

create policy "Users can read own favorites"
  on public.favorites for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add own favorites"
  on public.favorites for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  to authenticated
  using ((select auth.uid()) = user_id);
