# Figma Revision Handoff: Whole-Home Moodboards

This brief rebuilds the five static boards so they show **whole-home material curation** (several materials across three rooms) rather than one tile in several applications. Do not edit the original frames (`1:2`, `1:3`, `1:5`, `1:7`, `1:9`). Duplicate them onto a new page, **"V2 — Whole-home boards"**.

Product data was checked on materialdepot.com on 20 Oct 2026. The source of truth is `src/data/materials.ts` and `src/data/homes.ts`.

## Shared board system (all five)

| Element | Spec |
| --- | --- |
| Frame | 1200 × 1800 px (2:3), white canvas, 50 px margins. Same grid as V1 |
| Header | Colour strip (5 bars, top right); `MATERIAL STORIES / 0X—05`; `0X — TITLE` (number in signature colour); tagline; **home name** (e.g. "A Coastal Home") |
| Rooms | Hero room ≈ 690 × 460 px (left), plus two supporting rooms ≈ 330 × 260 px each. Label each room (Living room / Kitchen / …) |
| Material collection | A finish-board flat-lay of 6–7 samples, right column or bottom band. Show real proportions: planks long, 1200 × 600 tiles 1:2, sheets as chips, quartz as a slab. Label each with **code + name + surface** (Flooring / Wall / Feature / Joinery / Countertop / Accent) |
| Room map | A mini row under each room: thumbnails of the materials used in that room |
| Rationale | One line at the foot: the home's first cohesion principle (see each home below) |
| Footer | Material Depot wordmark for attribution only, plus "Interior imagery is illustrative; materials sourced from materialdepot.com" |

**Assets.** Rooms are in `assets-src/<story>/` (AI-generated concept visuals are listed in `assets-src/provenance.json` as `ai-concept`). Material samples: use the Material Depot product photos (URLs in `materials.ts`), or photograph physical samples.

---

## 01 — Tidal Ritual · A Coastal Home
*Where the world slows down.* Palette: #1F5F67 #78B5AD #CFDAD4 #DED4BE #F7F5F0

| Code | Material | Surface | Rooms |
| --- | --- | --- | --- |
| TL 04445 | Antania Latte, stone-look, matte, 1200 × 600 | Flooring | Living, Kitchen, Bathroom |
| TL 03643 E | Snaper Kitkat Aqua Mint, glossy ceramic, 300 × 100 | Feature | Bathroom |
| 1E172 PU | Frosted Mint laminate, PU | Joinery | Kitchen |
| LM 15506 | Moore Honey fluted laminate | Joinery | Living, Kitchen, Bathroom |
| QR 00054 | Frosted Pebble quartz, 20 mm | Countertop | Kitchen, Bathroom |
| TL 05147 | Marblis Jade Cascade (seafoam onyx-look), glossy, 1200 × 600 | Accent | Living |

Rooms: **Living** (hero) `tidal-ritual/living` · **Kitchen** `tidal-ritual/kitchen` · **Bathroom** `tidal-ritual/hero`.
Rationale line: *"Aqua at three strengths: glossy kitkat in the bath, frosted mint in the kitchen, seafoam stone in the living room."*

## 02 — Nordic Daylight · A Scandinavian Home
*The luxury of less.* Palette: #C59B65 #E5D5BF #B0B8A6 #F4F1E9 #373B36

| Code | Material | Surface | Rooms |
| --- | --- | --- | --- |
| TL 06117 | Nordic Honey wood-look plank, matte, 1200 × 200 (2–3 mm spacer mandatory) | Flooring | Living, Kitchen, Bedroom |
| LM 01269 | Alstonia fluted wood-look laminate | Feature | Living (media wall), Kitchen (uppers) |
| LM 10851 | Sage Green laminate, matte | Joinery / Accent | Kitchen (base), Bedroom (headboard) |
| LM 03017 | Cuneo Oak Light (whitewashed), suede | Joinery | Living, Bedroom |
| QR 00104 | Arctic Veil quartz, 20 mm | Countertop | Kitchen |
| TL 09790 C | Matt Ivory wall tile, 600 × 300 | Wall | Kitchen backsplash |

Rooms: **Living** (hero) `nordic-daylight/hero` · **Kitchen** `nordic-daylight/kitchen` · **Bedroom** `nordic-daylight/bedroom`.
Rationale line: *"One honey floor through every room; sage at full scale only in the kitchen, returning once in the bedroom."*

## 03 — Casa Terracotta · A Mediterranean Home
*Every pattern holds a memory.* Palette: #AA583D #D9A778 #EEE4D6 #6B7151 #392E28

| Code | Material | Surface | Rooms |
| --- | --- | --- | --- |
| TL 04455 | Latin Travertine Grande, punch matte, 1200 × 600 | Flooring | Living, Kitchen |
| TL 05430 | Morissa Terrabrown Moroccan, matte ceramic, 300 × 300 | Feature | Kitchen (backsplash), Balcony (floor) |
| LM 02891 | Light Natural Oak laminate | Joinery | Living, Kitchen |
| LM 01356 | Beige taupe fluted laminate | Joinery | Living (sideboard) |
| QR 00011 | Sandstone Mist quartz, 20 mm | Countertop | Kitchen |
| TL 00778 | Raw Olive stone-look, matte, 1200 × 600 | Accent | Balcony (bench) |
| — | Lime-plaster wall finish (**conceptual**, not a Material Depot product) | Wall | All rooms |

Rooms: **Living** (hero) `casa-terracotta/living` · **Kitchen** `casa-terracotta/kitchen` · **Balcony** `casa-terracotta/balcony`.
⚠ The V1 tile **TL 05181** and the suggested **TL 05859 B** are both listed as **discontinued**. TL 05430 has a different motif (a terracotta quatrefoil with grey leaves). Do not relabel the V1 tile imagery as TL 05430.
Rationale line: *"Pattern is the accent, not the backdrop: a backsplash and a balcony floor, never the living room."*

## 04 — Monaco After Dark · A Contemporary Luxury Home
*Some spaces are made to be remembered.* Palette: #141519 #AD8759 #4B3934 #B6A597 #EFE8DF

| Code | Material | Surface | Rooms |
| --- | --- | --- | --- |
| TL 05310 B | Aurelio Matrix White (Carrara-look), high gloss, 1200 × 600 | Flooring | Living, Dining |
| TL 05819 | Marble Portoro Black Gold, high gloss, 1200 × 600 | Feature | Living (one wall), Dining (niche), Powder (immersive) |
| LM 02979 | Smoke Walnut laminate, extra matt | Joinery | Living, Dining |
| LM 01406 | Nordic Walnut fluted laminate | Joinery | Powder (vanity) |
| QR 00052 | Ivory Whisper quartz, 20 mm | Countertop | Dining, Powder |
| — | Brushed brass (**conceptual** finish) | Accent | All rooms |

Rooms: **Living** (hero) `monaco-after-dark/living-room` · **Dining** `monaco-after-dark/dining` · **Powder room** `monaco-after-dark/powder`.
Rationale line: *"Black marble rationed by scale: a wall, then a niche, then one small room."*

## 05 — Botanical Sanctuary · A Biophilic Home
*Let the outside find its way in.* Palette: #215A49 #7F9D7F #B9C6A1 #D8C4A4 #F4F1E8

| Code | Material | Surface | Rooms |
| --- | --- | --- | --- |
| TL 00797 | Statuario Plazma, matte, 1200 × 600 | Flooring | Living, Bathroom |
| TL 06127 | Monstera Blanco Decor Pattern 2, matte, 1200 × 600 | Feature | Living (panel), Dining (wall), Bathroom (accent) |
| LM 15488 | Dusty Sage fluted laminate | Joinery | Living (storage) |
| 1E208 CFL | Sand Beige classic flute laminate | Joinery | Bathroom (vanity) |
| LM 02969 | Village Oak laminate, high gloss | Joinery | Living (shelving), Dining (banquette) |
| QR 00035 | Ivory Whisper quartz (Regalia), 20 mm | Countertop | Dining, Bathroom |

Rooms: **Living** (hero) `botanical-sanctuary/living` · **Dining nook** `botanical-sanctuary/dining` · **Bathroom** `botanical-sanctuary/bathroom`.
Rationale line: *"One print at three scales: a framed panel, a full wall, an accent behind the vanity."*

---

## Asset gaps to close in Figma

- **Low-resolution V1 crops still used as rooms:** Casa kitchen, Botanical dining and Botanical bathroom. Export their **original** images from Figma at full size and drop them into `assets-src/` under the same filenames, then run `npm run assets`.
- **Room images that show illustrative tiles:** the Casa kitchen and balcony show tile patterns that differ from TL 05430. Regenerate or retouch them before using them in print.
- **Physical samples:** for the 4 × 8 ft showroom panel, source hand samples of every coded material.

## After the boards are made

Export each V2 frame at 2× and save it as `assets-src/boards-v2/board-N.png`. Then set `revisedBoard` for that home in `src/data/homes.ts`, and the site will show the real board in place of the live draft.
