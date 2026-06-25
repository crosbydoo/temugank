# Temugank

Culture-first running collective — a static site built with **Astro** and selective **React islands** for motion and navigation.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output → dist/
npm run preview   # preview production build
```

## Architecture

The codebase uses a **four-layer** structure designed to stay readable as the project grows:

| Layer | Folder | Purpose |
|-------|--------|---------|
| Config & Content | `src/config/`, `src/content/` | Site settings and editable copy |
| Lib | `src/lib/`, `src/types/` | Pure logic — loaders, helpers, types |
| Routes | `src/pages/`, `src/layouts/` | Thin page orchestrators |
| UI | `src/components/` | `astro/` (static), `islands/` (React), `ui/` (primitives) |

```
src/content/*.json  →  lib/content/getHomePageData()  →  pages/index.astro  →  islands/sections/
```

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Layer diagram, folder map, data flow, how to add pages/sections |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Newbie-friendly guide: common tasks, conventions, PR checklist |

## Editing content (no code required)

| What | Where |
|------|-------|
| Runs, journal, gallery, manifesto | `src/content/` |
| Navigation, brand, social links | `src/config/site.ts` |
| Colors, fonts | `src/styles/globals.css` |

## Hidden desk (editors)

| Route | Purpose |
|-------|---------|
| `/desk` | Draft runs & articles, export JSON, link to docs |
| `/docs` | Internal guides (architecture, contributing, content) |

Not linked from public navigation. Available at `http://localhost:4321/desk` during dev.

## Stack

- [Astro 6](https://astro.build) — static site generation
- [React 19](https://react.dev) — interactive islands only
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Framer Motion](https://www.framer.com/motion/) — scroll and entrance animations
- Astro content collections — type-safe JSON at build time

## Cursor AI

Project-specific rules live in:

- `.cursor/rules/temugank-architecture.mdc` — always-on architecture guidance
- `.cursor/skills/temugank-project/SKILL.md` — detailed workflows for agents

Invoke the `temugank-project` skill when asking Cursor to add features or refactor this codebase.
