import manifest from "@/data/image-manifest.json";

/** Where an image came from — surfaced in captions and credits. */
export type ImageSource = "figma-raw" | "board-crop" | "figma-board-export";

/** What an image depicts — interiors are always labelled as concept visualizations. */
export type ImageKind = "interior-concept" | "material-study" | "material-composition" | "board";

export interface Img {
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: ImageKind;
  source: ImageSource;
}

type ManifestEntry = { width: number; height: number; source: ImageSource };
const entries = manifest as Record<string, ManifestEntry>;

/**
 * Resolve an image from the generated manifest (scripts/build-assets.mjs).
 * Throws at build time if an asset is missing, so broken references never ship.
 */
export function img(src: string, alt: string, kind: ImageKind): Img {
  const entry = entries[src];
  if (!entry) throw new Error(`Missing image asset "${src}" — run \`npm run assets\`.`);
  return { src, alt, kind, width: entry.width, height: entry.height, source: entry.source };
}

export const kindLabel: Record<ImageKind, string> = {
  "interior-concept": "Concept visualization",
  "material-study": "Material study",
  "material-composition": "Supporting material composition",
  board: "Original Figma board",
};

/**
 * Board crops are only 1× board resolution. Cap their rendered width so they
 * are never blown up beyond ~1.2× native size.
 */
export function maxDisplayWidth(image: Img): number | undefined {
  return image.source === "board-crop" ? Math.round(image.width * 1.2) : undefined;
}
