# Contributing to Temugank

Welcome. This guide is written for developers at any level — including your first day on the project.

## Before you start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build check
```

## Project layout in 30 seconds

| Folder | You edit this when… |
|--------|---------------------|
| `src/content/` | Changing runs, journal posts, gallery, manifesto text |
| `src/config/site.ts` | Changing nav, brand name, social links |
| `src/components/islands/` | Changing animated or interactive UI |
| `src/components/astro/` | Changing static HTML (footer, layout shell) |
| `src/components/ui/` | Adding reusable buttons, cards, labels |
| `src/lib/` | Adding shared logic (never UI markup here) |
| `src/pages/` | Adding or wiring routes |
| `src/styles/globals.css` | Changing design tokens (colors, fonts) |

Full details: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Common tasks

### Edit site copy (no code)

Open JSON files in `src/content/`:

```
src/content/runs/silent-city.json
src/content/journal/silence-between-intervals.json
src/content/gallery/river-crossing.json
src/content/manifesto/site.json
```

Save and refresh the dev server. No component changes needed.

### Edit navigation or brand

Open `src/config/site.ts`. All nav links and section anchor IDs live here.

### Add a new run

1. Create `src/content/runs/my-run.json`:

```json
{
  "title": "Dawn patrol — 8k",
  "location": "East loop",
  "dateLabel": "Sat 10 — 06:00",
  "note": "Quiet start. No photos."
}
```

2. Run `npm run dev` — it appears automatically on the home page.

### Add a React island

1. Create the component in `src/components/islands/`.
2. Import it in a `.astro` page.
3. Add a hydration directive:

```astro
---
import { MyWidget } from '@/components/islands/MyWidget'
---

<MyWidget client:visible someProp={value} />
```

**Never** import islands without a `client:*` directive — they will render as static HTML without interactivity.

## Coding conventions

### Imports

Use the `@/` alias (maps to `src/`):

```ts
import { SITE } from '@/config/site'
import { cn } from '@/lib/cn'
import { HeroSection } from '@/components/islands/sections/HeroSection'
```

### Naming

| Item | Convention | Example |
|------|------------|---------|
| Astro components | PascalCase `.astro` | `SiteFooter.astro` |
| React islands | PascalCase `.tsx` | `HeroSection.tsx` |
| Content files | kebab-case `.json` | `silent-city.json` |
| Lib helpers | camelCase | `getHomePageData.ts` |
| Types | PascalCase interfaces | `RunEvent` |

### Component rules

- **UI components** (`components/ui/`) are presentational only — no `fetch`, no `getCollection`.
- **Islands** receive data via props from the parent page.
- **Pages** call `lib/content/` helpers to load data once.
- **Lib** has no JSX and no `.astro` files.

### Styling

- Use Tailwind utility classes in components.
- Design tokens (colors, fonts) live in `src/styles/globals.css` under `@theme`.
- Prefer existing tokens: `bg-bg-deep`, `text-paper`, `font-display`, etc.

### Motion

- Animation variants: `src/lib/motion/variants.ts`
- Timing: `src/lib/motion/transitions.ts`
- Always respect reduced motion via `usePreferReducedMotion()`

## Pull request checklist

- [ ] `npm run build` passes
- [ ] New content has a JSON file (not hardcoded strings in components)
- [ ] React islands have a `client:*` directive
- [ ] No business logic added to `components/ui/`
- [ ] Imports use `@/` paths

## Getting help

- Architecture questions → [ARCHITECTURE.md](./ARCHITECTURE.md)
- Astro patterns → `.cursor/rules/` in the repo
- Cursor AI → invoke the `temugank-project` skill for project-specific guidance
