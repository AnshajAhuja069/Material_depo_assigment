# Material Stories

**Five Materials. Five Stories. Infinite Possibilities.**

An immersive digital exhibition of five material narratives, built as an independent visual-storytelling concept for the
*Visual Designer — Tiles* hiring process at Material Depot. It is **not** an official Material Depot website or a commissioned
project. Interior imagery consists of concept visualizations from the original Figma boards; material specifications are
sourced from materialdepot.com.

- Figma file: <https://www.figma.com/design/MZBL82EFBErr6I5f6g2cNS/Material-Depot-Assignment-Anshaj-Ahuja?node-id=0-1>

## Run it

Requires Node 18.18+ (built with Node 22).

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Checks: `npm run lint`, `npm run typecheck`.

## Routes

| Route | Content |
| --- | --- |
| `/` | The exhibition: opening, the assignment, the challenge, the approach, the collection, the five boards, the 4 × 8 ft display concept |
| `/stories/tidal-ritual` | 01 Tidal Ritual — TL 03643 E |
| `/stories/nordic-daylight` | 02 Nordic Daylight — TL 06117 |
| `/stories/casa-terracotta` | 03 Casa Terracotta — TL 05181 (listed as discontinued; shown as a design exploration) |
| `/stories/monaco-after-dark` | 04 Monaco After Dark — TL 05819 |
| `/stories/botanical-sanctuary` | 05 Botanical Sanctuary — TL 06127 |

## Structure

```
src/
  data/stories.ts          single source of truth: copy, palettes, themes, products, images, links
  data/site.ts             site copy, Figma links, neutral home theme
  data/image-manifest.json generated — intrinsic sizes + provenance of every image
  lib/                     motion tokens, theme helpers, image helper
  components/motion/       reveal primitives, page transition, Lenis + MotionConfig provider
  components/story/        the story-page chapters (hero → intro → applications → signature → language → material → board → sources → next)
  components/home/         homepage scenes
  components/boards/       full-resolution board viewer
scripts/build-assets.mjs   asset pipeline (crops + WebP + manifest)
assets-src/                source images (originals from Figma + board exports)
```

## Assets

Source images live in `assets-src/<story>/`. Running `npm run assets` crops what is missing from the original board exports,
converts everything to WebP in `public/`, and rewrites `src/data/image-manifest.json`.

| Story | Source |
| --- | --- |
| Tidal Ritual, Nordic Daylight | Original full-resolution images pulled from the Figma file |
| Casa Terracotta | Bathroom, tile study, details and moodboard are originals; kitchen and patio are cropped from the 1200 × 1800 board |
| Monaco After Dark, Botanical Sanctuary | Cropped from the 1200 × 1800 board exports (the Figma API rate limit was reached) |

Board crops are rendered no larger than ~1.2× their native size. To upgrade one, export the original image from Figma and drop it
into `assets-src/<story>/<name>.png` (same file name), then run `npm run assets`. Larger originals replace the crop and are
re-labelled automatically.

The Nordic Daylight moodboard is a composition from the Figma canvas that was not placed on the final board; the site labels it as such.

## Motion & accessibility

- Motion for React handles reveals, parallax, theme transitions and the page wipe. Lenis smooths wheel scrolling, but not touch.
- `prefers-reduced-motion` turns off smooth scrolling, parallax, zooms and long reveals; content renders in its final state.
- Dialogs trap focus, close on Esc and restore focus. Hotspots, swatches and inspectors work by hover, tap and keyboard.
