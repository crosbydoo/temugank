# Content guide

How to add and edit site content without touching components.

## Collections

| Collection | Folder | Used on |
|------------|--------|---------|
| Runs | `src/content/runs/` | Home → Upcoming runs |
| Journal | `src/content/journal/` | Home → Field notes |
| Gallery | `src/content/gallery/` | Home → Gallery strip |
| Manifesto | `src/content/manifesto/` | Home → Manifesto + community |

## Run event JSON

```json
{
  "title": "Silent City — 12k",
  "location": "North embankment",
  "dateLabel": "Sat 24 — 05:15",
  "note": "No music. Headlamps optional."
}
```

Filename: kebab-case, e.g. `silent-city.json`.

## Journal article JSON

```json
{
  "title": "Notes on silence between intervals",
  "dek": "What we do not say at the water fountain is part of the training.",
  "date": "Field Log 014",
  "readTime": "6 min"
}
```

## Gallery item JSON

```json
{
  "src": "https://example.com/photo.jpg",
  "alt": "Describe the image for screen readers",
  "caption": "05:12 — river crossing"
}
```

## Publish workflow

1. Open the hidden desk at `/desk` (not linked from the public site).
2. Draft an event or article and download the JSON file.
3. Save the file into the matching `src/content/` folder.
4. Run `npm run build` to verify, then deploy.

**Hidden routes:** `/desk` (content dashboard), `/docs` (internal guides). Both use `noindex` and are excluded in `public/robots.txt`.

## Schemas

Collection schemas live in `src/content.config.ts`. If you add new fields, update the Zod schema there first.
