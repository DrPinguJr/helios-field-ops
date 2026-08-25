# Helios Field Ops

Field reference app for Helios gear: packing/teardown steps, troubleshooting,
usage guides, and product specs. Static SPA, no backend.

**Stack:** Vite + React + Tailwind CSS v4 + React Router + Fuse.js, deployed
to GitHub Pages.

## Directory boundary (hard rule)

- **`/src`** — owned by Claude Code. Components, routing, search logic,
  styling. Never hardcodes content.
- **`/data`** — owned by Codex/ChatGPT. Content only, as JSON arrays matching
  the schemas in [`/docs/content-schema.md`](./docs/content-schema.md).

Components in `/src` import and render `/data` files exclusively via
[`src/lib/data.js`](./src/lib/data.js) — that's the one seam between the two
sides.

## Status

`/src` is scaffolded against the schema. `/data` currently holds empty
placeholder arrays (`packing.json`, `troubleshooting.json`, `products.json`,
`usage-guide.json`) — every page renders an empty state until Codex/ChatGPT
populates them per the build order in the schema doc.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint       # oxlint
```

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which builds the app and publishes `dist/` to GitHub Pages via the native
Actions deployment (no `gh-pages` branch). In the repo settings, **Pages →
Build and deployment → Source** must be set to **GitHub Actions** for this to
take effect.

Routing uses `HashRouter` (`/#/packing`, `/#/products`, …) so GitHub Pages'
static hosting doesn't need a deep-link rewrite rule.

## Adding content

See [`/data/README.md`](./data/README.md) and
[`/docs/content-schema.md`](./docs/content-schema.md) for the field contract,
and [`/docs/codex-research-handover.md`](./docs/codex-research-handover.md)
for the research-to-JSON conversion process. Short version: every object
needs every key from its schema; unresearched fields are `null`, never
omitted or invented.

## Image assets

`/public/images` holds the curated Helios image library, sorted by category.
See [`/public/images/README.md`](./public/images/README.md) for what's in
each folder and the `image` field path convention.
