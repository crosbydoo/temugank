# Deploy to Cloudflare Pages

This project runs on **Cloudflare Pages** with **D1** (SQLite) and **Astro SSR**.

## Prerequisites

- Cloudflare account
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)
- Git repository connected to Cloudflare Pages

## 1. Create D1 database

```bash
wrangler login
wrangler d1 create temugank-db
```

Copy the `database_id` from the output into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "temugank-db"
database_id = "<your-database-id>"
```

## 2. Apply migrations

**Local:**

```bash
npm run db:migrate:local
```

**Production:**

```bash
npm run db:migrate:remote
```

## 3. Configure secrets

Copy `.dev.vars.example` to `.dev.vars` for local development:

```bash
cp .dev.vars.example .dev.vars
```

Set production variables in Cloudflare dashboard → Pages → your project → **Settings → Environment variables**:

| Variable | Description |
|----------|-------------|
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `SESSION_SECRET` | Random string, 32+ characters |

## 4. Cloudflare Pages build settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 20+ |

Add **D1 binding** in Pages → Settings → Functions → D1 bindings:

- Variable name: `DB`
- D1 database: `temugank-db`

## 5. Deploy

Push to your connected branch, or:

```bash
npm run build
wrangler pages deploy dist
```

## 6. Admin desk

After deploy:

- Public site: `https://your-domain.pages.dev/`
- Admin login: `https://your-domain.pages.dev/desk/login`

The desk is **not linked** from public navigation and uses `noindex` + `robots.txt`.

## Local development with D1

```bash
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

Open `/desk/login` with credentials from `.dev.vars`.

## Fallback without D1

If D1 is unavailable, the public site falls back to JSON files in `src/content/`. The admin desk requires D1 and returns 503 on API calls without a database binding.
