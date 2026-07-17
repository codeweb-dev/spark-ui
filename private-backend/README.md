# Spark UI — Private Backend

Production Supabase backend for the hosted Spark UI platform. This folder is
**staged for extraction into its own private repository** and is not part of
the open-source component library. See
[`docs/architecture/OPEN_SOURCE_BOUNDARY.md`](../docs/architecture/OPEN_SOURCE_BOUNDARY.md)
for the full boundary policy.

## Contents

```text
supabase/
└── migrations/   Production database migrations (schema, RLS policies)
```

Edge Functions, seeds, deployment automation, and `config.toml` are added here
as they are created — none exist yet.

## Deploying

Deploy with the Supabase CLI (or CI/CD), never from frontend deployments:

```bash
supabase link --project-ref <PROJECT_REF>
supabase db push
```

## Rules

- Never commit `.env`, service-role keys, database passwords, or dumps.
- Secrets belong only in secure deployment platforms (CI secrets, Supabase
  dashboard).
- The public frontend communicates with this backend only through the deployed
  Supabase project (URL + publishable key); it never imports this code.

## Extracting into a private repository

```bash
# From the spark-ui repo root:
git subtree split --prefix=private-backend -b private-backend-split
mkdir ../spark-ui-backend && cd ../spark-ui-backend && git init
git pull ../spark-ui private-backend-split
git remote add origin <PRIVATE_REPO_URL> && git push -u origin main

# Then remove the staging folder from the public repo:
cd ../spark-ui
git rm -r private-backend && git branch -D private-backend-split
git commit -m "chore: extract private backend into its own repository"
```
