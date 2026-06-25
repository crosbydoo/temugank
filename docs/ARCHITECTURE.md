# Temugank Architecture

This project uses a **four-layer** structure. Each layer has one job. If you know which layer you are in, you know where to put code and what not to mix in.

## The four layers

```
┌─────────────────────────────────────────────────────────────┐
│  PAGES & LAYOUTS          Wire routes → compose UI           │
│  src/pages/  src/layouts/  src/components/astro/             │
├─────────────────────────────────────────────────────────────┤
│  ISLANDS (React)          Interactivity + motion only        │
│  src/components/islands/  src/components/ui/                 │
├─────────────────────────────────────────────────────────────┤
│  LIB                      Pure logic — no UI, no Astro       │
│  src/lib/  src/types/                                       │
├─────────────────────────────────────────────────────────────┤
│  CONFIG & CONTENT         Data the site is built from        │
│  src/config/  src/content/  src/content.config.ts            │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Folder | Purpose | Can import from |
|-------|--------|---------|-----------------|
| **Config** | `src/config/` | Site-wide constants: brand, nav, section IDs | `types/` only |
| **Content** | `src/content/` | Editable JSON entries loaded at build time | — (files only) |
| **Lib** | `src/lib/`, `src/types/` | Helpers, content loaders, motion tokens | `config/`, `types/` |
| **Presentation** | `layouts/`, `pages/`, `components/` | HTML shells, routes, UI | all layers above |

## Folder map

```
src/
├── config/
│   └── site.ts              # Brand name, nav links, section anchor IDs
├── content/                 # JSON files — edit copy here, not in components
│   ├── runs/
│   ├── journal/
│   ├── gallery/
│   └── manifesto/
├── content.config.ts        # Collection schemas (Zod)
├── lib/
│   ├── cn.ts                # className helper
│   ├── content/
│   │   ├── getHomePageData.ts   # Fetch + shape content for a page
│   │   └── mapCollectionEntries.ts
│   └── motion/
│       ├── variants.ts      # Framer Motion variants
│       ├── transitions.ts
│       └── usePreferReducedMotion.ts
├── types/
│   └── content.ts           # Shared TypeScript interfaces
├── layouts/
│   └── Layout.astro         # HTML document shell
├── pages/
│   └── index.astro          # Home route — thin orchestrator
├── components/
│   ├── astro/               # Zero JavaScript (.astro)
│   │   ├── PageLayout.astro
│   │   └── SiteFooter.astro
│   ├── islands/             # React — hydrated with client:*
│   │   ├── SiteHeader.tsx
│   │   ├── motion/          # Reusable motion primitives
│   │   └── sections/        # Page sections with animation
│   └── ui/                  # Shared UI building blocks (React)
├── styles/
│   └── globals.css          # Design tokens + base styles
└── assets/                  # Processed images and fonts
public/                      # Static files served as-is
```

## Data flow (home page)

```
content/*.json
      ↓  build time
getHomePageData()          ← lib/content/
      ↓
index.astro                ← fetches once, passes props
      ↓
islands/sections/*.tsx     ← receive props, render UI
```

**Rule:** Pages fetch data. Islands receive props. Islands never call `getCollection()` themselves.

## Component types

### `.astro` (default — zero JS)

Use for static markup: footers, shells, anything that does not need click handlers or animation libraries.

```
src/components/astro/
src/layouts/
```

### React islands (JavaScript only when needed)

Use when you need state, events, or Framer Motion. Always add a `client:*` directive in the parent `.astro` file:

| Directive | When to use |
|-----------|-------------|
| `client:load` | Critical above-the-fold UI (header, hero) |
| `client:visible` | Below-the-fold sections with scroll animations |
| `client:idle` | Low-priority interactivity |

```
src/components/islands/
```

### UI primitives

Small reusable pieces shared by islands. Stay presentational — no data fetching.

```
src/components/ui/
```

## Adding a new section

1. **Content** — Add JSON under `src/content/` if the section needs collection data. Update `content.config.ts` if it is a new collection type.
2. **Types** — Add or extend interfaces in `src/types/content.ts`.
3. **Loader** — Extend `getHomePageData()` (or create `getXPageData()`) in `src/lib/content/`.
4. **Island** — Create `src/components/islands/sections/YourSection.tsx`. Accept data via props.
5. **Page** — Import the island in the relevant `.astro` page and pass props.

## Adding a new page

1. Create `src/pages/your-page.astro`.
2. Use `Layout.astro` and optionally `PageLayout.astro`.
3. Fetch data in the page frontmatter via a `lib/content/` helper.
4. Compose `.astro` and island components.

## What goes where (quick reference)

| I want to… | Put it in… |
|------------|------------|
| Change nav labels or social links | `src/config/site.ts` |
| Add a run / journal entry / gallery photo | `src/content/<collection>/` |
| Add a helper function | `src/lib/` |
| Add a TypeScript interface | `src/types/` |
| Add static HTML (no JS) | `src/components/astro/` |
| Add animation or interactivity | `src/components/islands/` |
| Add a button, card, label | `src/components/ui/` |
| Change colors / fonts | `src/styles/globals.css` |
| Add a route | `src/pages/` |

## Principles

1. **Thin pages** — Routes orchestrate; they do not contain UI logic or long markup.
2. **Dumb islands** — Sections receive props; they do not fetch their own content.
3. **Static first** — Prefer `.astro`. Reach for React only when JavaScript is required.
4. **One source of truth** — Copy lives in `config/` or `content/`, not hardcoded in components.
5. **Flat lib** — Shared logic lives in `lib/`, not scattered across `utils/`, `hooks/`, and `animations/`.
