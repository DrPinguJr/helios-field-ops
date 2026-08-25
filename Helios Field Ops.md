---
aliases:
  - Helios Project Hub
  - Helios Field Ops Context
tags:
  - project/helios
  - status/active
type: project-hub
status: active
last_verified: 2026-08-25
---

# Helios Field Ops

> [!summary] AI quick context
> Static field-reference SPA for Helios gear, built with React 19, Vite, Tailwind CSS v4, React Router, and Fuse.js. There is no backend. `src/` owns presentation and behavior; `data/` owns schema-constrained operational content. Never hardcode content in `src/`, invent missing facts, or change the documented JSON shape casually. Current content: 13 packing steps, 3 troubleshooting entries, 22 products, and 0 usage-guide entries. Lint, production build, and schema-shape checks passed on 2026-08-25.

## Purpose

A mobile-friendly reference for staff handling Helios equipment:

- packing and teardown procedures;
- troubleshooting by symptom, cause, and fix;
- Helios and competitor product comparisons;
- usage guidance;
- fuzzy search across all populated content.

- Project overview: [[README]]
- Content contract: [[docs/content-schema|Content Schema]]
- Research rules: [[docs/codex-research-handover|Research Handover]]
- Data status: [[data/README|Data README]]
- Image rules: [[public/images/README|Image Library README]]

## Architecture

```text
data/*.json -> src/lib/data.js -> route pages -> reusable cards
          \-> src/lib/search.js -> Fuse.js -> /search
```

- `src/main.jsx` mounts React inside `HashRouter` for GitHub Pages compatibility.
- `src/App.jsx` defines home, packing, troubleshooting, products, usage-guide, search, and not-found routes.
- `src/components/Layout.jsx` provides the shared navigation and page container.
- `src/lib/data.js` is the only intended import seam between `src/` and `data/`.
- `src/lib/search.js` builds its Fuse index once when the module loads.
- The Products page first separates Cold Plunges from Compression Boots, then presents Helios Fitness and competitor products in distinct comparison columns.
- `vite.config.js` uses `/helios-field-ops/` as the production base path.
- `.github/workflows/deploy.yml` deploys `dist/` to GitHub Pages when `main` is pushed.

## Content status

| Dataset | Entries | Notes |
| --- | ---: | --- |
| `data/packing.json` | 13 | Teardown only: 7 ice-bath, 4 compression-boots, 1 chair, 1 misc |
| `data/troubleshooting.json` | 3 | Includes one generic hardware escalation |
| `data/products.json` | 22 | 3 Helios and 19 competitors; 15 ice baths and 7 compression boots |
| `data/usage-guide.json` | 0 | Awaiting a schema decision for multi-step contrast protocols |

All populated records had exact documented top-level keys and unique IDs when last checked.

## Non-negotiable content rules

1. Keep application code in `src/` and factual content in `data/`.
2. Every JSON object must match its schema exactly.
3. Use `null` for unknown values; never estimate or invent facts.
4. Keep safety warnings in the dedicated `warning` field.
5. Only map an image when its identity is confirmed.
6. Record a real `research_date` for time-sensitive market data.
7. Preserve uncertainty and explain source conflicts in `notes`.

## Known gaps and risks

- All 22 product `research_date` values are currently `null`.
- The three Helios product entries have confirmed product-family images;
  competitor and packing images remain unmapped.
- Ice-bath and compression-boots setup sequences are missing.
- Compression-boot modes 5–8 remain undocumented.
- Usage-guide content is empty because the current schema does not naturally represent the supplied multi-step protocols.
- Product prices mix SGD, MYR, and USD-derived values, but `ProductCard` always renders a bare `$` prefix. The schema needs explicit currency/provenance before prices can be displayed unambiguously.
- Search does not index packing substeps or troubleshooting `detail` values, even though those values are visible on cards.
- There is no automated test suite or committed schema validator.
- Deployment runs the production build but does not run the available lint command.
- The production base path is tied to the repository name; renaming the repo requires updating `vite.config.js`.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Validated on 2026-08-25:

- dependency audit: 0 reported vulnerabilities;
- Oxlint: passed;
- Vite production build: passed;
- JavaScript bundle: approximately 91.6 KB gzipped.

No `test` script currently exists.

## Working-tree caution

The image library was being renamed and reorganized when this note was created. Before changing anything under `public/images/`, inspect `git status` and preserve existing uncommitted work. Do not reset or delete those changes. The three Helios product records now reference confirmed product-family images.

## Best next actions

1. Decide how currency and price provenance should be represented in the product schema.
2. Supply real research dates and verify market facts.
3. Confirm additional image identities, then populate paths using the documented relative-path convention.
4. Document setup sequences and compression-boot modes 5–8.
5. Decide whether to extend the usage-guide schema for multi-step protocols.
6. Expand search coverage and add schema validation/tests.

## Minimal handoff prompt

> Read `Helios Field Ops.md` and only the linked schema/source note relevant to the task. Preserve existing uncommitted image work. Keep `src/` and `data/` responsibilities separate, use `null` for unknown facts, then lint and build after code changes.
