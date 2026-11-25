# Sirius Trail

Sustainable tourism platform for Algeria — public site, trip planner, carbon calculator, bookings, and an admin dashboard.

## Stack

- Next.js App Router
- Neon PostgreSQL + Prisma
- Auth.js (NextAuth v5) Credentials for a single admin
- EN / FR / AR (+ RTL)

## Local setup

1. Copy `.env.example` to `.env` and fill in values:

```env
DATABASE_URL="postgresql://...neon.tech/...?sslmode=require"
DIRECT_URL="postgresql://...neon.tech/...?sslmode=require"
AUTH_SECRET="generate-a-long-random-string"
AUTH_URL="http://localhost:3000"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="choose-a-strong-password"
```

- `DATABASE_URL` — Neon **pooled** connection (runtime)
- `DIRECT_URL` — Neon **direct** connection (migrations)
- `AUTH_SECRET` — long random string for Auth.js sessions
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used by `npm run db:seed` to create the first admin

2. Install and prepare the database:

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Without `DATABASE_URL`, public pages fall back to local seed content so the UI still runs. Writes (contact, bookings, admin) require Neon.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | `prisma generate && next build` |
| `npm run build:netlify` | Generate client, run migrations, then build |
| `npm run db:seed` | Seed destinations, trips, factors, and admin |
| `npm run db:migrate` | Prisma migrate (dev) |

## Admin

- Login: `/admin/login`
- Dashboard CRUD: destinations (+ gallery URLs), trips, accommodations, activities, transport, emission factors, bookings, messages

Media is URL-based (`/images/...` or absolute URLs). No local disk uploads.

## Netlify

`netlify.toml` uses `@netlify/plugin-nextjs` and `npm run build:netlify`.

Set the same env vars in the Netlify UI:

- `DATABASE_URL`
- `DIRECT_URL`
- `AUTH_SECRET`
- `AUTH_URL` (your production URL)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` (seed/bootstrap only)

After the first deploy, run seed once (locally against production Neon, or a one-off Netlify/CLI job):

```bash
npm run db:seed
```
