import type { ThemeTokens } from "@/data/stories";

export const FIGMA_FILE = "https://www.figma.com/design/MZBL82EFBErr6I5f6g2cNS/Material-Depot-Assignment-Anshaj-Ahuja";

export const figmaFrameUrl = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId}`;

export const site = {
  name: "Material Stories",
  headline: "Five Stories. Five Homes. One Language of Design.",
  supporting: "Exploring how different materials come together to create cohesive spaces across an entire home.",
  designer: "Anshaj Ahuja",
  figmaFile: `${FIGMA_FILE}?node-id=0-1`,
  disclaimer:
    "An independent visual-storytelling concept created for the Visual Designer — Tiles hiring process at Material Depot. Not an official Material Depot website and not a commissioned project.",
  imageNote: "Interior concept imagery is illustrative; material specifications are sourced from Material Depot.",
};

/** Neutral exhibition theme used outside individual stories. */
export const homeTheme: ThemeTokens = {
  bg: "#F3EFE8",
  surface: "#E9E3D8",
  ink: "#161514",
  muted: "#5A564F",
  accent: "#161514",
  accentInk: "#161514",
  line: "rgba(22, 21, 20, 0.14)",
  scheme: "light",
};
