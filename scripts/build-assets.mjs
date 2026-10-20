// Asset pipeline for Material Stories.
//
// 1. Fills gaps in assets-src/<slug>/ by cropping from the original 1200×1800
//    Figma board exports (assets-src/boards/board-N.png). A crop is only made
//    when the file is missing, so dropping a higher-resolution original into
//    assets-src/ and re-running this script always wins.
// 2. Converts every source image to WebP in public/ and writes
//    src/data/image-manifest.json with intrinsic dimensions + provenance.
//
// Run: npm run assets

import { readdir, mkdir, writeFile, access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "assets-src");
const OUT = path.join(root, "public");
const MANIFEST = path.join(root, "src", "data", "image-manifest.json");
const PROVENANCE = path.join(SRC, "provenance.json");

const exists = (p) => access(p).then(() => true, () => false);

// Frame-space crops (x, y, w, h) measured from Figma node metadata.
const boardCrops = {
  "casa-terracotta": {
    board: 3,
    crops: {
      kitchen: [50, 410, 695, 522],
      patio: [395, 958, 350, 400],
    },
  },
  "monaco-after-dark": {
    board: 4,
    crops: {
      bathroom: [50, 407, 695, 538],
      living: [50, 985, 693, 390],
      tile: [812, 407, 351, 614],
      moodboard: [818, 1138, 340, 426],
      detail: [50, 1428, 644, 206],
    },
  },
  "botanical-sanctuary": {
    board: 5,
    crops: {
      bathroom: [52, 414, 720, 540],
      tile: [823, 414, 327, 565],
      bath: [50, 986, 327, 404],
      dining: [412, 986, 360, 404],
      moodboard: [808, 1115, 347, 413],
      detail: [50, 1426, 624, 208],
    },
  },
};

// Crops from the full-resolution Tidal tile sheet (raw Figma fill, 1122×1402).
const sheetCrops = {
  "tidal-ritual": {
    from: "tile-sheet.png",
    crops: {
      tile: [40, 36, 542, 930],
      detail: [40, 996, 1042, 370],
    },
  },
};

// Tight texture swatches (no studio margins) cut from each tile study.
// `null` = use the whole tile image. Coordinates are in tile.png pixel space.
const swatchCrops = {
  "tidal-ritual": [8, 8, 526, 912],
  "nordic-daylight": [112, 52, 756, 1516],
  "casa-terracotta": [214, 79, 692, 1178],
  "monaco-after-dark": null,
  "botanical-sanctuary": null,
};

async function makeSwatches(provenance) {
  for (const [slug, crop] of Object.entries(swatchCrops)) {
    const target = path.join(SRC, slug, "swatch.png");
    if (await exists(target)) continue;
    const input = sharp(path.join(SRC, slug, "tile.png"));
    const out = crop ? input.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] }) : input;
    await out.png().toFile(target);
    provenance[`${slug}/swatch`] = provenance[`${slug}/tile`] ?? "figma-raw";
    console.log("swatch", slug);
  }
}

async function makeCrops() {
  const provenance = (await exists(PROVENANCE)) ? JSON.parse(await readFile(PROVENANCE, "utf8")) : {};

  for (const [slug, { from, crops }] of Object.entries(sheetCrops)) {
    for (const [name, [left, top, width, height]] of Object.entries(crops)) {
      const target = path.join(SRC, slug, `${name}.png`);
      if (await exists(target)) continue;
      await sharp(path.join(SRC, slug, from)).extract({ left, top, width, height }).png().toFile(target);
      provenance[`${slug}/${name}`] ??= "figma-raw";
      console.log("sheet crop", slug, name);
    }
  }

  for (const [slug, { board, crops }] of Object.entries(boardCrops)) {
    for (const [name, [x, y, w, h]] of Object.entries(crops)) {
      const target = path.join(SRC, slug, `${name}.png`);
      if (await exists(target)) {
        // A replaced, higher-resolution original is no longer a board crop.
        const { width } = await sharp(target).metadata();
        if (width !== w - 2) provenance[`${slug}/${name}`] = "figma-raw";
        continue;
      }
      // Inset by 1px so anti-aliased frame edges never show.
      await sharp(path.join(SRC, "boards", `board-${board}.png`))
        .extract({ left: x + 1, top: y + 1, width: w - 2, height: h - 2 })
        .png()
        .toFile(target);
      provenance[`${slug}/${name}`] = "board-crop";
      console.log("board crop", slug, name);
    }
  }

  await makeSwatches(provenance);
  await writeFile(PROVENANCE, JSON.stringify(provenance, null, 2));
  return provenance;
}

async function convert(provenance) {
  const manifest = {};
  const dirs = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory());

  for (const dir of dirs) {
    const files = (await readdir(path.join(SRC, dir.name))).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
    const outDir = path.join(OUT, dir.name === "boards" ? "boards" : path.join("stories", dir.name));
    await mkdir(outDir, { recursive: true });

    for (const file of files) {
      const name = file.replace(/\.[^.]+$/, "");
      const input = path.join(SRC, dir.name, file);
      const outFile = path.join(outDir, `${name}.webp`);
      const img = sharp(input).flatten({ background: "#ffffff" });
      const meta = await img.metadata();
      const width = Math.min(meta.width ?? 0, 2400);
      const info = await img.resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(outFile);
      const key = "/" + path.relative(OUT, outFile).split(path.sep).join("/");
      const id = `${dir.name}/${name}`;
      manifest[key] = {
        width: info.width,
        height: info.height,
        source: dir.name === "boards" ? "figma-board-export" : provenance[id] ?? "figma-raw",
      };
      console.log(key, info.width, "×", info.height);
    }
  }

  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
}

const provenance = await makeCrops();
await convert(provenance);
console.log("Manifest written:", path.relative(root, MANIFEST));
