# Supabase (public)

This directory contains only **safe, public examples** for local development.
The production Supabase backend (migrations, policies, functions, deployment)
lives in a separate private repository — staged here under `private-backend/`
until it is extracted. See
[`docs/architecture/OPEN_SOURCE_BOUNDARY.md`](../docs/architecture/OPEN_SOURCE_BOUNDARY.md).

## Local development

The frontend needs one table (`favorites`) plus GitHub auth to exercise every
feature. To set that up on a personal or local Supabase project:

1. Create a project at [supabase.com](https://supabase.com) (or run
   `supabase start` locally).
2. Run [`examples/favorites.sql`](./examples/favorites.sql) in the SQL editor.
3. Enable the GitHub auth provider (see "GitHub authentication setup" in the
   root README).
4. Copy `.env.example` to `.env.local` and fill in
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

The examples mirror the production schema the frontend depends on, but this
repository is not intended to reproduce the complete hosted backend.
