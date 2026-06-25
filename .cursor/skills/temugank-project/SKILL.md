---
name: temugank-project
description: >-
  Temugank Astro site conventions: four-layer architecture, folder placement,
  content collections, island hydration, and coding rules. Use when working on
  the temugank codebase, adding pages/sections/content, refactoring structure,
  or when the user asks about this project's architecture or conventions.
---

# Temugank Project Rules

## Architecture (four layers)

| Layer | Path | Job |
|-------|------|-----|
| Config & Content | `src/config/`, `src/content/` | What the site says |
| Lib | `src/lib/`, `src/types/` | Pure logic, no UI |
| Presentation | `src/pages/`, `src/layouts/`, `src/components/` | How it looks |

**Data flow:** `content/` → `lib/content/get*PageData()` → `pages/*.astro` → `islands/` (props)

## Where to put new code

| Task | Location |
|------|----------|
| Nav, brand, section IDs | `src/config/site.ts` |
| Runs, journal, gallery, manifesto copy | `src/content/<collection>/*.json` |
| Content schemas | `src/content.config.ts` |
| Page data loaders | `src/lib/content/` |
| Shared helpers | `src/lib/` |
| TypeScript interfaces | `src/types/` |
| Static HTML (zero JS) | `src/components/astro/` |
| Interactivity + motion | `src/components/islands/` |
| Buttons, cards, labels | `src/components/ui/` |
| Routes | `src/pages/` |
| Design tokens | `src/styles/globals.css` |

## Hard rules

1. **Thin pages** — `.astro` pages fetch data and compose; no long markup or business logic.
2. **Dumb islands** — React sections receive props; never call `getCollection()` inside islands.
3. **Static first** — Default to `.astro`. Use React only when JS is required.
4. **No UI in lib** — `src/lib/` has no JSX, no `.astro`, no components.
5. **No fetching in ui** — `src/components/ui/` is presentational only.
6. **Copy in content/config** — Never hardcode editable copy inside components.
7. **Always hydrate islands** — Every React import in `.astro` needs `client:load`, `client:visible`, or `client:idle`.
8. **Respect reduced motion** — Use `usePreferReducedMotion()` for Framer Motion.
9. **Import alias** — Always `@/` (e.g. `@/config/site`, `@/lib/cn`).

## Hydration guide

| Component | Directive | Why |
|-----------|-----------|-----|
| `SiteHeader`, `HeroSection` | `client:load` | Above-the-fold, critical |
| Other sections | `client:visible` | Below fold, scroll animations |
| Low-priority widgets | `client:idle` | Can wait for browser idle |

## Adding a section (checklist)

```
- [ ] JSON in src/content/ (if needed)
- [ ] Type in src/types/content.ts
- [ ] Loader in src/lib/content/
- [ ] Island in src/components/islands/sections/
- [ ] Wire in src/pages/*.astro with client:visible
```

## Adding a page

1. Create `src/pages/name.astro`
2. Wrap with `Layout.astro` + `PageLayout.astro`
3. Create `getNamePageData()` in `lib/content/` if data is needed
4. Compose astro + island components

## Do not

- Put files in deleted folders: `constants/`, `utils/`, `animations/`, `hooks/`, `components/layout/`, `components/common/`, `components/sections/`
- Add React Router — Astro file-based routing only
- Add data fetching to presentation components
- Create empty abstraction layers (no repository pattern unless APIs arrive)

## Database & admin desk

- **Runtime:** Cloudflare Pages + D1 (`wrangler.toml`, `migrations/`)
- **Env access (Astro v6):** `import { env } from 'cloudflare:workers'` — not `locals.runtime.env`
- **Types:** Run `npm run db:types` after changing `wrangler.toml` → `worker-configuration.d.ts`
- **DB layer:** `src/lib/db/` — query helpers per table
- **Auth:** JWT cookie via `src/lib/auth/session.ts`; middleware protects `/desk/*` and admin APIs
- **Admin UI:** `/desk/login` → `/desk/overview|events|articles|docs` (React `DeskApp` with sidebar)
- **Public site:** `index.astro` reads D1 when available, falls back to content JSON
- **Local setup:** `cp .dev.vars.example .dev.vars` → `npm run db:migrate:local` → `npm run dev`
- **Deploy:** See `docs/DEPLOY_CLOUDFLARE.md`

## Reference docs

- Full architecture: [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- Contributor guide: [docs/CONTRIBUTING.md](../../docs/CONTRIBUTING.md)
