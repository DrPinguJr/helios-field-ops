# Helios Field Ops --- Codex Research & Asset Processing Handover

## Purpose

This document is the handover guide for Codex when converting Helios
Fitness research materials into structured content files for the
`helios-field-ops` static site.

This combines:

1.  Research processing instructions
2.  Product/market data conversion rules
3.  Image asset handling rules

Codex is responsible for generating content data files.

Claude Code is responsible for infrastructure and components.

------------------------------------------------------------------------

# Part 1 --- Research Source

The research source contains:

-   Helios Fitness cold plunge products
-   Competitor cold plunge systems
-   Compression boot comparisons
-   Recovery studio comparisons
-   Recovery protocols and usage guidance

Research must be treated as source material.

Rules:

-   Do not invent specifications.
-   Do not estimate missing values.
-   Preserve uncertainty.
-   Use null when information is unavailable.
-   Only include facts supported by the research.

------------------------------------------------------------------------

# Part 2 --- Data Conversion Rules

## Non-Negotiable Rules

1.  Match the schema exactly.
2.  Never add extra fields.
3.  Never rename fields.
4.  Missing information must be `null`.
5.  Every market/product entry requires `research_date`.
6.  Process one category at a time.
7.  Output JSON only when generating final data files.

------------------------------------------------------------------------

# Product Schema

``` json
{
  "id": "kebab-case-unique-id",
  "category": "product",
  "type": "ice-bath",
  "source": "helios",
  "name": null,
  "price": null,
  "material": null,
  "capacity_liters": null,
  "temp_range_c": null,
  "notes": null,
  "image": null,
  "research_date": null
}
```

Allowed values:

## type

-   ice-bath
-   compression-boots

## source

-   helios
-   competitor

------------------------------------------------------------------------

# Usage Guide Schema

Only create usage guide entries when the research contains actual
guidance.

``` json
{
  "id": "kebab-case-unique-id",
  "category": "usage-guide",
  "item": "ice-bath",
  "context": "before-sport",
  "guidance": null,
  "cautions": null
}
```

Allowed contexts:

-   before-sport
-   during-sport
-   after-sport
-   injury-recovery
-   cramps-muscle-ache

------------------------------------------------------------------------

# Part 3 --- Image Asset Library

## Purpose

The Helios Field Ops project includes a curated image library for:

-   product pages
-   equipment references
-   troubleshooting guides
-   usage guides
-   website visual content

The image library has already been:

-   sorted into categories
-   cleaned of duplicate files
-   separated by relevance

------------------------------------------------------------------------

# Image Folder Structure

## 01_cold_plunge_products

Contains:

-   Cold plunge tubs
-   Chillers
-   Product photography

Use for:

-   ice-bath product entries

------------------------------------------------------------------------

## 02_compression_boots

Contains:

-   Compression recovery equipment

Use for:

-   compression-boots product entries

------------------------------------------------------------------------

## 03_sauna_wellness

Contains:

-   Wellness facilities
-   Sauna environments
-   Recovery spaces

Use for:

-   studio/environment content

------------------------------------------------------------------------

## 04_equipment_accessories

Contains:

-   Supporting equipment
-   Accessories
-   Images requiring manual confirmation

Use carefully.

Do not assign images unless the match is clear.

------------------------------------------------------------------------

## 05_brand_assets

Contains:

-   Logos
-   Brand visuals

Use for:

-   branding sections only

------------------------------------------------------------------------

# Image Mapping Rules

When populating the `image` field:

## Allowed

Attach an image only when:

-   the product identity is confirmed
-   the image clearly represents the item
-   the relationship is supported by the source material

## Not Allowed

Do not:

-   guess product identity from appearance
-   attach competitor images to Helios products
-   reuse random marketing images
-   create fake image paths

If uncertain:

``` json
"image": null
```

is preferred.

------------------------------------------------------------------------

# Part 4 --- Handling Ambiguous Information

## Missing Field

Use:

``` json
null
```

Never estimate.

------------------------------------------------------------------------

## Conflicting Information

If different sources provide different values:

-   keep one entry
-   record the conflict in `notes`

Example:

``` json
"notes": "Price reported differently across sources; requires verification."
```

------------------------------------------------------------------------

## Unclear Source

If unclear whether an item is:

-   Helios
-   competitor

Do not guess.

------------------------------------------------------------------------

# Part 5 --- Output Structure

Generate separate files by category.

Example:

``` text
/data

├── helios-products.json
├── competitor-icebaths.json
├── competitor-compression-boots.json
├── usage-guides.json
└── troubleshooting.json
```

Do not combine unrelated categories.

------------------------------------------------------------------------

# Part 6 --- Recommended Workflow

1.  Read the research source.
2.  Select one category.
3.  Convert items into schema format.
4.  Validate every field against the source.
5.  Match images only where confirmed.
6.  Output JSON.

Recommended processing order:

1.  Helios products
2.  Competitor ice baths
3.  Compression boots
4.  Usage guides
5.  Troubleshooting
6.  Image linking pass

------------------------------------------------------------------------

# Final Principle

Accuracy is more important than completeness.

A missing field with `null` is acceptable.

An invented value or incorrect image mapping is not.
