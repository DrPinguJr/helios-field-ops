# Helios Field Ops — Content Schema & Build Contract

## Purpose
This is the contract between infra (Claude Code) and content (Codex/ChatGPT).
Claude Code builds components that READ this shape. Codex/ChatGPT WRITES data files in this shape.
Neither side improvises fields. If research doesn't cover a field, use `null` — never omit the key, never invent a value.

## Repo
Name: `helios-field-ops`
Type: Static SPA (Vite + React + Tailwind + Fuse.js), deployed via GitHub Pages, no backend.

## Directory boundary (hard rule)
- `/src` — owned by Claude Code. Components, routing, search logic, styling.
- `/data` — owned by Codex/ChatGPT. Content only, matching schemas below.
- Components in `/src` import and render `/data` files. Never hardcode content in `/src`.

---

## 1. Packing / Teardown Step

```json
{
  "id": "icebath-teardown-01",
  "category": "packing",
  "item": "ice-bath",
  "phase": "teardown",
  "order": 1,
  "title": "Drain the water",
  "detail": "Plug is at the bottom right side of every ice bath.",
  "warning": "Stand clear of the faucet before pulling the plug — pressure is high and releases in a flicking motion. Water can gush out and injure you if you're in the pressure point path.",
  "image": null,
  "substeps": [
    { "order": 1, "text": "Locate plug at bottom right." },
    { "order": 2, "text": "Stand clear of faucet path before opening." },
    { "order": 3, "text": "At half-empty and only in an open area, flip bath to dump remaining water." },
    { "order": 4, "text": "Confirm pipes are unplugged before flipping/dumping." }
  ]
}
```

Field notes:
- `phase`: `"teardown"` | `"setup"` (setup steps use the same shape, reverse order — not yet written, placeholder until confirmed)
- `item`: `"ice-bath"` | `"compression-boots"` | `"chair"` | `"misc"`
- `warning`: null if no safety-relevant note; otherwise always its own field, never buried in `detail`.

---

## 2. Troubleshooting Entry

```json
{
  "id": "boots-not-full-leg",
  "category": "troubleshooting",
  "item": "compression-boots",
  "symptom": "Not pumping full leg",
  "causes": [
    {
      "cause": "Wrong mode selected",
      "fix": "Set to Mode 4 for full leg.",
      "detail": {
        "mode-1": "Ankle only",
        "mode-2": "Foot to calf",
        "mode-3": "Thigh only",
        "mode-4": "Full leg",
        "mode-5-8": "TBC — not yet documented"
      }
    },
    {
      "cause": "Air hole disconnected from boot",
      "fix": "Reconnect / plug back in.",
      "detail": null
    }
  ],
  "escalation": null
}
```

Field notes:
- `escalation`: use for cases like the generator hardware fault → contact hardware support. Keep generic (`"Escalate to hardware support"`) not a personal name, unless you want names in an internal-only repo — your call, flag it to Codex either way so it's consistent.
- `causes` is always an array, even for one cause — keeps shape consistent for the component.

---

## 3. Product Spec (Helios items + competitor market research)

```json
{
  "id": "helios-icebath-x1",
  "category": "product",
  "type": "ice-bath",
  "source": "helios",
  "name": "TBC",
  "price": null,
  "material": null,
  "capacity_liters": null,
  "temp_range_c": null,
  "notes": null,
  "image": null,
  "research_date": null
}
```

Field notes:
- `source`: `"helios"` | `"competitor"`
- Every numeric/factual field: `null` if unverified. ChatGPT must not fill plausible-sounding placeholder numbers.
- `research_date`: when the data point was pulled — market data ages, needs a freshness marker.

---

## 4. Usage Guide Entry

```json
{
  "id": "boots-usage-before-sport",
  "category": "usage-guide",
  "item": "compression-boots",
  "context": "before-sport",
  "guidance": "Full text guidance here.",
  "cautions": null
}
```

Field notes:
- `context`: `"before-sport"` | `"during-sport"` | `"after-sport"` | `"injury-recovery"` | `"cramps-muscle-ache"`
- Same shape reused for ice bath (`item: "ice-bath"`).

---

## Open items before Codex can fully populate
1. Setup (not just teardown) sequence for ice bath and compression boots — not yet written.
2. Compression boot Modes 5–8 — undocumented, currently TBC.
3. Escalation contact convention — named individual vs generic role.
4. Market research data — pending Gemini Notebook output, to be processed by ChatGPT into schema #3 above before this repo is touched.

## Build order
1. Lock this schema (edit if needed before handing to Claude Code).
2. Claude Code scaffolds `/src` against schema, using empty/placeholder `/data` files.
3. ChatGPT processes Gemini research + your manual input into `/data` files matching schema exactly.
4. You spot-check factual fields (`price`, `material`, `temp_range_c`, etc.) before commit.
5. Codex integration pass if needed to reconcile file structure, but no field invention.
