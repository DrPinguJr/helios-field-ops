# /data — owned by Codex/ChatGPT

This directory is content-only. The full contract (field names, allowed
values, null-handling rules) lives at
[`/docs/content-schema.md`](../docs/content-schema.md) — read that before
editing anything here. Research/conversion process and image-matching rules
are in [`/docs/codex-research-handover.md`](../docs/codex-research-handover.md).

## Files

| File                 | `category`         | Schema section |
| --------------------- | ------------------- | -------------- |
| `packing.json`        | `packing`           | §1 Packing / Teardown Step |
| `troubleshooting.json`| `troubleshooting`   | §2 Troubleshooting Entry |
| `products.json`       | `product`           | §3 Product Spec |
| `usage-guide.json`    | `usage-guide`       | §4 Usage Guide Entry |

Each file is a JSON array of objects matching its schema section exactly.
`packing.json`, `troubleshooting.json`, and `products.json` are populated
(from teardown/troubleshooting notes and the Singapore market comparison
research). `usage-guide.json` is still an empty placeholder — see Open items
below.

## Open items

- **Setup sequences** (ice bath, compression boots) — only teardown has been
  documented so far.
- **Compression boot modes 5–8** — undocumented (`mode-5-8` is `"TBC"` in
  `troubleshooting.json`).
- **Escalation contact convention** — `boots-switching-off`'s `escalation`
  currently uses the generic `"Escalate to hardware support."` per the
  schema's own stated default, since the named-vs-generic decision is still
  open.
- **`research_date`** — every entry in `products.json` currently has this
  `null`. The market research doc it's sourced from doesn't state when it
  was pulled; a plausible date wasn't invented. Needs the real pull date
  filled in once known.
- **`usage-guide.json`** — the market doc's four Re+ contrast protocols
  (80/20, 50/50, 90/10, Release) don't map cleanly onto the schema's five
  fixed `context` values; forcing a mapping would mean guessing which
  context each protocol belongs to. Left unpopulated pending a decision on
  how (or whether) to represent multi-step protocols in this schema.
- **Studio/bathhouse comparison data** (Section 3 of the market doc) — no
  schema category covers this; not converted.
- **`image`** — the three Helios product entries now use confirmed,
  Helios-branded product-family images from
  [`/public/images`](../public/images/README.md). The same shared cold-plunge
  system photo represents both Active and Turbo because the available photos
  do not identify their chiller variant. Competitor and packing images remain
  `null` unless their identity can be confirmed without guessing.

## Rules (from the contract — repeated here for convenience)

- Every object must include every key defined by its schema. If research
  doesn't cover a field, set it to `null` — never omit the key, never invent
  a plausible-sounding value.
- `warning` (packing) is always its own field, never folded into `detail`.
- `causes` (troubleshooting) is always an array, even for a single cause.
- `research_date` (product) marks when a data point was pulled — required
  whenever a factual field is populated, since market data ages.
- Do not edit `/src`. Components there read this directory; they don't
  hardcode content.
- `image` (packing, product) is a path relative to `/public`, no leading
  slash, e.g. `"images/01_cold_plunge_products/helios_marketing_7.webp"`.
  See [`/public/images/README.md`](../public/images/README.md) for what's
  available and the matching rules — only set it when the product/step
  identity is actually confirmed, `null` otherwise.
