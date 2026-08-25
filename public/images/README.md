# Image asset library

Sourced from the curated Helios Fitness image library (see
[`/docs/codex-research-handover.md`](../../docs/codex-research-handover.md)
Part 3 for the full category rules). Folder structure preserved from that
handoff:

| Folder | Contents | Use for |
| --- | --- | --- |
| `01_cold_plunge_products/` | Cold plunge tubs, chillers, product photography | `ice-bath` product entries |
| `02_compression_boots/` | Compression recovery equipment | `compression-boots` product entries |
| `03_sauna_wellness/` | Sauna/wellness facility images | studio/environment content — *not included in this drop* |
| `04_equipment_accessories/` | Supporting equipment, accessories, unconfirmed shots | use carefully — don't assign unless the match is clear |
| `05_brand_assets/` | Logos, brand visuals | branding sections only |

Several Helios-owned assets now have descriptive filenames and visible Helios
branding. Confirmed product-family images may be linked from `/data`; generic
or ambiguous files must remain unmapped. The cold-plunge photos do not label
the Active and Turbo chiller variants, so the shared system photo is used for
both rather than assigning an unverified variant identity. `/src` does not
guess image mappings.

## Format note

Where the source zip had multiple format variants of the same image
(`.png` + `.jpg` + `.webp`, typically 10-80x larger as an uncompressed PNG
for the same picture), only one was kept — `.webp` if present, else `.jpg`,
else `.png` — to avoid bloating the repo with redundant binaries. The full
original set is not stored in git; re-derive from the source zip if a
dropped variant is ever needed.

## Path convention

An `image` field in `/data` should hold a path **relative to this
directory's parent (`/public`), with no leading slash** — e.g.:

```json
"image": "images/01_cold_plunge_products/Icebathandgenerator.png"
```

Components resolve it via `src/lib/assetUrl.js`, which prefixes the app's
base URL (`import.meta.env.BASE_URL`). This matters because the production
build is served from `/helios-field-ops/` on GitHub Pages, not `/` — a bare
`/images/...` path would 404 there even though it works in local dev.
