# /data — owned by Codex/ChatGPT

This directory is content-only. The full contract (field names, allowed
values, null-handling rules) lives at
[`/docs/content-schema.md`](../docs/content-schema.md) — read that before
editing anything here.

## Files

| File                 | `category`         | Schema section |
| --------------------- | ------------------- | -------------- |
| `packing.json`        | `packing`           | §1 Packing / Teardown Step |
| `troubleshooting.json`| `troubleshooting`   | §2 Troubleshooting Entry |
| `products.json`       | `product`           | §3 Product Spec |
| `usage-guide.json`    | `usage-guide`       | §4 Usage Guide Entry |

Each file is a JSON array of objects matching its schema section exactly.
Currently all four are placeholder empty arrays (`[]`) pending content from
Codex/ChatGPT per the build order in the contract doc.

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
