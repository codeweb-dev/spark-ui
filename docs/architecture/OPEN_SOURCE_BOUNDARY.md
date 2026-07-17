# Open Source Boundary

## Purpose

This document defines the architectural boundary between the **public Spark UI repository** and the **private production backend**. It explains what belongs in each repository, why the split exists, how the frontend communicates with the backend, deployment responsibilities, security expectations, and contributor guidelines.

## Philosophy

Spark UI is developed as an **open-source React component library and documentation website**.

The hosted Spark UI platform uses a **private backend** that contains production infrastructure and operational logic.

This separation exists to:

- Keep the public repository focused on reusable UI.
- Protect proprietary operational code.
- Simplify community contributions.
- Allow frontend and backend to evolve independently.
- Reduce accidental exposure of operational infrastructure.

This is **not** a security mechanism. Security is enforced through authentication, authorization, Row Level Security (RLS), least-privilege access, and proper secret management.

## Repository Responsibilities

### Public Repository

The public repository contains everything required to build and contribute to Spark UI's frontend.

Typical contents:

```text
app/
components/
content/
docs/
lib/supabase/
public/
registry/
styles/
```

It may include:

- React components
- Registry
- Documentation
- Blog content
- Website frontend
- Browser and server Supabase clients
- Generated database types required by the frontend
- Public environment placeholders
- Local examples
- Tests for frontend behavior

It must never include production credentials or customer data.

### Private Repository

The private backend contains production infrastructure.

Typical contents:

```text
supabase/
├── migrations/
├── functions/
├── tests/
├── seed/
└── config.toml

deployment/
scripts/
.github/workflows/
```

It may contain:

- Database migrations
- SQL functions
- Triggers
- RLS policies
- Storage policies
- Billing
- Pro entitlements
- Moderation
- Internal analytics
- Scheduled jobs
- Webhook handlers
- Deployment automation

## Communication Model

The frontend never imports backend source code.

Instead, it communicates through the deployed Supabase project.

```text
Frontend (Vercel)
        │
        │ HTTPS
        ▼
Supabase
(Auth • Database • Storage • Edge Functions)
        ▲
        │
Private Backend Repository
```

The frontend only requires:

- Project URL
- Publishable key
- Public authentication helpers
- Database types, when needed

## Deployment Strategy

### Frontend

Deploy target:

- Vercel

Responsibilities:

- Website
- Documentation
- Component previews
- Authentication UI
- Client interactions

Environment variables:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Backend

Deploy target:

- Supabase

Responsibilities:

- Database schema
- Migrations
- Edge Functions
- Storage
- Policies
- Internal services

Deployment should be performed through CI/CD or the Supabase CLI.

Frontend deployments must never automatically modify the production database.

## Environment Variables

### Public

Allowed in frontend:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

These values identify the project and are safe for browser use when RLS is correctly configured.

### Private

Never commit:

```dotenv
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
SUPABASE_DB_PASSWORD=
JWT_SECRET=
STRIPE_SECRET_KEY=
SMTP_PASSWORD=
```

Secrets belong only in secure deployment platforms.

## Security Principles

Security must not rely on hiding the schema.

Security is provided by:

- Authentication
- Authorization
- RLS
- Database grants
- Least privilege
- Protected server-side secrets
- Edge Functions for privileged workflows

## Contributor Scope

Public contributors may work on:

- Components
- Registry
- Documentation
- Blog
- Frontend
- Public authentication flows
- Examples

Production backend changes are maintained separately unless intentionally synchronized.

## Local Development

Developers may connect to:

- Local Supabase
- Personal Supabase projects
- Approved staging environments

See [`supabase/README.md`](../../supabase/README.md) for local setup using the
public examples. The public repository is not intended to reproduce the
complete hosted backend.

## Repository Scope

The public repository distributes:

- Component library
- Documentation
- Registry
- Website frontend
- Public Supabase integration

It does not distribute:

- Billing systems
- Customer data
- Operational infrastructure
- Production migrations
- Administrative tooling
- Secrets

## Release Independence

The frontend and backend have independent release cycles.

Frontend releases may include:

- Components
- Documentation
- UI improvements

Backend releases may include:

- Schema updates
- Policies
- Functions
- Infrastructure

Compatibility between both repositories should be maintained through stable APIs.

## Long-Term Policy

- The frontend repository remains open source.
- The production backend remains private.
- Communication occurs only through supported APIs.
- Production secrets are never committed.
- The public repository remains buildable without exposing production infrastructure.
- Changes affecting both repositories should be documented and coordinated.

Following this policy keeps Spark UI maintainable, secure, and contributor-friendly while allowing the hosted platform to evolve independently.
