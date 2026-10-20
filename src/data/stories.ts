import { img, type Img } from "@/lib/images";
import type { MotionStyle } from "@/lib/motion";
import { figmaFrameUrl } from "@/data/site";

export interface ThemeTokens {
  /** Page background. */
  bg: string;
  /** Slightly offset surface for panels. */
  surface: string;
  /** Primary text. */
  ink: string;
  /** Secondary text — AA on bg. */
  muted: string;
  /** Decorative accent (lines, strips, large display numerals). */
  accent: string;
  /** Accent safe for body-size text on bg (AA). */
  accentInk: string;
  /** Hairlines. */
  line: string;
  scheme: "light" | "dark";
}

export interface Swatch {
  name: string;
  hex: string;
}

export interface Hotspot {
  /** Percent position on the moodboard image. */
  x: number;
  y: number;
  label: string;
  note: string;
}

export interface Application {
  image: Img;
  label: string;
  caption: string;
  /** CSS object-position used when the frame crops the image. */
  focus?: string;
}

export interface Product {
  name: string;
  code: string;
  size: string;
  sizeNote?: string;
  finish: string;
  material: string;
  thickness: string;
  type: string;
  designs?: string;
  notes?: string[];
  applications: string[];
  url: string;
  status: "listed" | "discontinued";
  statusNote?: string;
  alternative?: { name: string; code: string; url: string; note: string };
}

export type HeroLayout = "wide" | "split" | "arch" | "framed" | "leaf";
export type GalleryLayout = "offset" | "grid" | "arches" | "framed" | "organic";

export interface Story {
  slug: string;
  index: number;
  number: string;
  title: string;
  subtitle: string;
  narrative: string;
  statement: string;
  intro: string;
  chapters: [string, string, string, string, string];
  chapterCopy: { applications: string; signature: string; language: string };
  palette: Swatch[];
  theme: ThemeTokens;
  motion: MotionStyle;
  heroLayout: HeroLayout;
  galleryLayout: GalleryLayout;
  product: Product;
  images: {
    hero: Img;
    tile: Img;
    /** Margin-free texture crop of the tile study. */
    swatch: Img;
    detail: Img;
    moodboard: Img;
    board: Img;
  };
  applications: Application[];
  moodboardNote: string;
  moodboardOnBoard: boolean;
  hotspots: Hotspot[];
  pairing: string;
  figmaUrl: string;
  inspirationUrl: string;
}

const P = (slug: string, file: string) => `/stories/${slug}/${file}.webp`;

export const stories: Story[] = [
  {
    slug: "tidal-ritual",
    index: 0,
    number: "01",
    title: "Tidal Ritual",
    subtitle: "Where the world slows down.",
    narrative:
      "Inspired by the rhythm of the ocean, where fluid textures, calming hues, and gentle reflections turn everyday spaces into peaceful escapes.",
    statement: "Water keeps its own time. This surface keeps it with you.",
    intro:
      "A glossy aqua-mint kitkat ceramic, laid vertically so every slim tile catches daylight a little differently. Against warm sand stone, oak and brushed brass, the wall stops being a finish and starts to feel like a tide line.",
    chapters: ["The Stillness", "The Retreat", "A Surface in Motion", "Everyday Escapes", "The Material"],
    chapterCopy: {
      applications:
        "From a spa-like vanity to a walk-in shower, the same slim module keeps its rhythm. It is calm at a distance and alive up close.",
      signature:
        "Each slim tile is glazed a shade apart. Light gathers along the gloss and slides as you move past, so the wall seems to move a little.",
      language:
        "One cool family, varied by gloss and scale. Chalk-white matte calms the aqua, sea-glass greens extend it, and warm sand and brass stop it feeling clinical.",
    },
    palette: [
      { name: "Deep Tide", hex: "#1F5F67" },
      { name: "Sea Glass", hex: "#78B5AD" },
      { name: "Soft Foam", hex: "#CFDAD4" },
      { name: "Warm Sand", hex: "#DED4BE" },
      { name: "Chalk White", hex: "#F7F5F0" },
    ],
    theme: {
      bg: "#F4F2EC",
      surface: "#E6ECE8",
      ink: "#112A2E",
      muted: "#475C5E",
      accent: "#78B5AD",
      accentInk: "#1F5F67",
      line: "rgba(17, 42, 46, 0.14)",
      scheme: "light",
    },
    motion: "fluid",
    heroLayout: "wide",
    galleryLayout: "offset",
    product: {
      name: "Snaper Kitkat Aqua Mint",
      code: "TL 03643 E",
      size: "300 × 100 mm",
      finish: "Glossy",
      material: "Ceramic",
      thickness: "8 mm",
      type: "Kitkat / subway wall tile",
      designs: "16 random designs",
      applications: ["Spa-inspired bathroom", "Shower feature wall", "Kitchen backsplash", "Hospitality washroom"],
      url: "https://materialdepot.com/tl-03643-e-mint-aqua-300x100-mm-glossy-finish-ceramic-wall-tile-8-mm-random-16/product",
      status: "listed",
    },
    images: {
      hero: img(P("tidal-ritual", "hero"), "Spa-inspired bathroom with a vertical aqua kitkat tile wall, stone vanity and brass fittings", "interior-concept"),
      tile: img(P("tidal-ritual", "tile"), "Stack of glossy aqua-mint kitkat tiles showing tonal variation between pieces", "material-study"),
      swatch: img(P("tidal-ritual", "swatch"), "Close texture of the aqua-mint kitkat glaze", "material-study"),
      detail: img(P("tidal-ritual", "detail"), "Close-up studies of the aqua kitkat glaze, its curved profile and grout lines", "material-study"),
      moodboard: img(P("tidal-ritual", "moodboard"), "Flat-lay of aqua fluted ceramic, green onyx-look stone, chalk-white and sage tiles", "material-composition"),
      board: img("/boards/board-1.webp", "Original Figma board 01 — Tidal Ritual", "board"),
    },
    applications: [
      {
        image: img(P("tidal-ritual", "shower"), "Walk-in shower with floor-to-ceiling aqua kitkat tiles and brushed brass shower set", "interior-concept"),
        label: "Shower feature wall",
        caption: "Floor-to-ceiling verticals make a narrow shower feel taller and quieter.",
        focus: "35% 50%",
      },
      {
        image: img(P("tidal-ritual", "vanity"), "Vanity niche with aqua kitkat tiles, oval mirror and stone vessel basin", "interior-concept"),
        label: "Hospitality-style vanity",
        caption: "Backlit mirror and stone basin: a hotel-washroom calm, at home.",
        focus: "60% 50%",
      },
    ],
    moodboardNote: "Complementary finishes are illustrative pairings, not linked Material Depot products.",
    moodboardOnBoard: true,
    hotspots: [
      { x: 22, y: 40, label: "Fluted aqua ceramic", note: "Repeats the kitkat rhythm at a larger scale." },
      { x: 56, y: 19, label: "Green onyx-look stone", note: "A veined accent for counters or niches." },
      { x: 86, y: 22, label: "Deep tide glaze", note: "The darkest note in the palette, for trims." },
      { x: 52, y: 55, label: "Chalk-white matte", note: "A quiet field tile to rest the eye." },
      { x: 78, y: 56, label: "Sea-urchin decor", note: "An optional playful inset." },
      { x: 35, y: 86, label: "Sage glazed field", note: "Softens the transition to warmer zones." },
      { x: 80, y: 84, label: "Elongated hex mosaic", note: "Floor-ready texture in the same family." },
    ],
    pairing: "Aqua gloss + chalk matte + warm sand stone + brushed brass",
    figmaUrl: figmaFrameUrl("1-2"),
    inspirationUrl: "https://materialdepot.com/image-gallery-details/serene-blue-tile-bathroom-with-wood-vanity-df7c88b54c",
  },
  {
    slug: "nordic-daylight",
    index: 1,
    number: "02",
    title: "Nordic Daylight",
    subtitle: "The luxury of less.",
    narrative:
      "Rooted in Scandinavian simplicity, where warm natural textures, soft daylight, and thoughtful minimalism create spaces that feel effortlessly like home.",
    statement: "Less, but warmer.",
    intro:
      "A matte, wood-look vitrified plank in a honeyed oak tone. It is the steady base beneath sage cabinetry, linen and pale morning light, with the warmth of timber and the practicality of a tile.",
    chapters: ["The Luxury of Less", "Morning Light", "A Grounded Space", "The Warmth of Simplicity", "The Material"],
    chapterCopy: {
      applications:
        "Long planks run through the living room and kitchen without a break, so the floor ties the open plan together.",
      signature:
        "Each 1200 × 200 mm plank comes from a series of twelve random designs, so knots and grain shift from board to board and the floor never looks printed.",
      language:
        "Honey oak sets the temperature. Sage and oat linen keep it soft, and charcoal gives the edges definition. Every material stays matte or gently textured.",
    },
    palette: [
      { name: "Honey Oak", hex: "#C59B65" },
      { name: "Oat Linen", hex: "#E5D5BF" },
      { name: "Sage Ash", hex: "#B0B8A6" },
      { name: "Warm White", hex: "#F4F1E9" },
      { name: "Soft Charcoal", hex: "#373B36" },
    ],
    theme: {
      bg: "#F4F1E9",
      surface: "#EAE3D6",
      ink: "#2B2E2A",
      muted: "#5B5D56",
      accent: "#C59B65",
      accentInk: "#7A5629",
      line: "rgba(43, 46, 42, 0.14)",
      scheme: "light",
    },
    motion: "measured",
    heroLayout: "split",
    galleryLayout: "grid",
    product: {
      name: "Nordic Honey",
      code: "TL 06117",
      size: "1200 × 200 mm",
      finish: "Matte",
      material: "Vitrified",
      thickness: "9 mm",
      type: "Wood-look floor tile",
      designs: "12 random designs",
      notes: ["The listing states a 2–3 mm spacer is mandatory."],
      applications: ["Scandinavian living room", "Kitchen flooring", "Minimalist bedroom", "Open-plan residential flooring"],
      url: "https://materialdepot.com/tl-06117-wood-floor-tile-1200-x-200-mm-vitrified-matte-finish-9-mm-12-random-design-ml-1650/product",
      status: "listed",
    },
    images: {
      hero: img(P("nordic-daylight", "hero"), "Sunlit Scandinavian living room with honey oak plank floor, linen sofa and round oak table", "interior-concept"),
      tile: img(P("nordic-daylight", "tile"), "Six honey-oak wood-look planks stacked, showing knots and grain variation", "material-study"),
      swatch: img(P("nordic-daylight", "swatch"), "Close texture of the honey-oak wood-look planks", "material-study"),
      detail: img(P("nordic-daylight", "detail"), "Close-ups of the wood-look grain, plank edge and laid joint", "material-study"),
      moodboard: img(P("nordic-daylight", "moodboard"), "Flat-lay of oak, sage shaker panel, fluted oak, speckled quartz, wool bouclé and sage tile", "material-composition"),
      board: img("/boards/board-2.webp", "Original Figma board 02 — Nordic Daylight", "board"),
    },
    applications: [
      {
        image: img(P("nordic-daylight", "kitchen"), "Scandinavian kitchen with sage cabinets, fluted oak uppers and honey oak plank floor", "interior-concept"),
        label: "Kitchen with sage cabinetry",
        caption: "The honey floor warms the sage cabinets and white quartz, and the fluted oak above picks up the grain.",
      },
      {
        image: img(P("nordic-daylight", "hero"), "Detail of the honey oak plank floor in raking morning light", "interior-concept"),
        label: "Open-plan flooring",
        caption: "Low morning light picks out the plank joints, a quiet rhythm across the room.",
        focus: "40% 92%",
      },
    ],
    moodboardNote:
      "This composition sits on the Figma canvas but was not placed on the final board. It is shown here as a supporting study. The complementary finishes are illustrative.",
    moodboardOnBoard: false,
    hotspots: [
      { x: 13, y: 42, label: "Wool bouclé", note: "Texture underfoot and on upholstery." },
      { x: 42, y: 30, label: "Natural oak", note: "Echoes the tile's honey tone in joinery." },
      { x: 75, y: 20, label: "Sage shaker panel", note: "The kitchen's soft colour counterpoint." },
      { x: 82, y: 50, label: "Fluted oak", note: "Vertical rhythm for upper shutters." },
      { x: 27, y: 76, label: "Speckled quartz", note: "A bright, low-maintenance worktop." },
      { x: 57, y: 82, label: "Sage glazed tile", note: "A handmade-looking backsplash option." },
      { x: 83, y: 83, label: "Fluted white ceramic", note: "Light relief for splashbacks." },
    ],
    pairing: "Honey oak + sage + oat linen + soft charcoal",
    figmaUrl: figmaFrameUrl("1-3"),
    inspirationUrl:
      "https://materialdepot.com/image-gallery-details/scandinavian-kitchen-with-sage-green-laminate-cabinets-fluted-wood-upper-shutters-and-white-quartz-countertop-in-bengaluru-8e9c",
  },
  {
    slug: "casa-terracotta",
    index: 2,
    number: "03",
    title: "Casa Terracotta",
    subtitle: "Every pattern holds a memory.",
    narrative:
      "A celebration of sun-warmed earth and timeless craftsmanship, where expressive patterns and organic textures bring stories of tradition into modern living.",
    statement: "Pattern is how a home remembers.",
    intro:
      "A Moroccan-patterned tile in burnt terracotta and cream, a repeat that looks hand-drawn, set against lime plaster, oak and aged brass. It is expressive on a backsplash and grounding on a floor.",
    chapters: ["The Art of Belonging", "Crafted by Tradition", "A Home with Character", "Patterns That Remember", "The Material"],
    chapterCopy: {
      applications:
        "In the kitchen, bathroom and courtyard, one motif goes from feature to backdrop depending on the scale it is laid at.",
      signature:
        "Fifteen tiles, one motif. Laid together, the quatrefoils lock into a continuous lattice, so the pattern only really appears once the pieces meet.",
      language:
        "Terracotta stays the hero. Travertine and plaster give it room, olive and oak keep it rooted, and a single star-pattern encaustic adds a second voice.",
    },
    palette: [
      { name: "Burnt Terracotta", hex: "#AA583D" },
      { name: "Sunbaked Clay", hex: "#D9A778" },
      { name: "Natural Plaster", hex: "#EEE4D6" },
      { name: "Olive Branch", hex: "#6B7151" },
      { name: "Earth Brown", hex: "#392E28" },
    ],
    theme: {
      bg: "#F1E7D9",
      surface: "#E7D7C3",
      ink: "#392E28",
      muted: "#66534A",
      accent: "#AA583D",
      accentInk: "#8A3F26",
      line: "rgba(57, 46, 40, 0.16)",
      scheme: "light",
    },
    motion: "geometric",
    heroLayout: "arch",
    galleryLayout: "arches",
    product: {
      name: "Zellige Desert Flora Brown",
      code: "TL 05181",
      size: "300 × 300 mm",
      sizeNote: "1 ft × 1 ft",
      finish: "Matte",
      material: "Ceramic",
      thickness: "9 mm",
      type: "Moroccan wall & floor tile",
      notes: [
        "Pattern variation between pieces is expected.",
        "The listing's specification gives the base material as ceramic, although its web address says vitrified.",
      ],
      applications: ["Mediterranean kitchen", "Patterned bathroom", "Balcony or patio", "Decorative accent walls"],
      url: "https://materialdepot.com/tl-05181-moroccan-tile-zellige-desert-flora-brown-1-ft-x-1-ft-vitrified-matte-finish-9-mm/product",
      status: "discontinued",
      statusNote:
        "The original listing indicates this tile is discontinued or unavailable. It is kept here as the material this story was designed around. This is a design exploration, not a purchase recommendation.",
      alternative: {
        name: "Zellige Terracotta Floral Brown",
        code: "TL 05859 B",
        url: "https://materialdepot.com/tl-05859-b-moroccan-tile-zellige-terracotta-floral-brown-1-ft-x-1-ft-vitrified-matte-finish-9-mm/product",
        note: "A separate, related product listed by Material Depot. It does not appear in any of the visuals on this page.",
      },
    },
    images: {
      hero: img(P("casa-terracotta", "kitchen"), "Mediterranean kitchen with terracotta Moroccan-pattern backsplash, plaster hood and oak cabinetry", "interior-concept"),
      tile: img(P("casa-terracotta", "tile"), "Fifteen terracotta and cream Moroccan-pattern tiles laid in a three-by-five grid", "material-study"),
      swatch: img(P("casa-terracotta", "swatch"), "Close texture of the terracotta Moroccan pattern", "material-study"),
      detail: img(P("casa-terracotta", "detail"), "Close-ups of the terracotta glaze, tile edge and a four-tile repeat", "material-study"),
      moodboard: img(P("casa-terracotta", "moodboard"), "Flat-lay of terracotta arabesque tile, plain terracotta, travertine, oak, encaustic star tile and olive branch", "material-composition"),
      board: img("/boards/board-3.webp", "Original Figma board 03 — Casa Terracotta", "board"),
    },
    applications: [
      {
        image: img(P("casa-terracotta", "bathroom"), "Bathroom with terracotta Moroccan-pattern walls and floor, round mirror and oak floating vanity", "interior-concept"),
        label: "Patterned bathroom",
        caption: "Wrapped wall to floor, the pattern turns a small bathroom into a courtyard.",
      },
      {
        image: img(P("casa-terracotta", "patio"), "Sunny patio with terracotta patterned floor, olive trees and clay planters", "interior-concept"),
        label: "Balcony or patio",
        caption: "Outdoors, the pattern reads at a distance and warms in the afternoon sun.",
      },
    ],
    moodboardNote: "Complementary finishes are illustrative pairings, not linked Material Depot products.",
    moodboardOnBoard: true,
    hotspots: [
      { x: 43, y: 45, label: "Arabesque terracotta", note: "A lantern-shaped cousin of the hero pattern." },
      { x: 68, y: 18, label: "Plain terracotta", note: "A quiet field to let pattern breathe." },
      { x: 83, y: 46, label: "Tumbled travertine", note: "Soft, porous stone for counters and sills." },
      { x: 82, y: 79, label: "Star encaustic", note: "A second motif in olive and clay." },
      { x: 42, y: 81, label: "Natural oak", note: "Warm cabinetry and open shelving." },
      { x: 23, y: 22, label: "Olive branch", note: "The palette's living green." },
      { x: 8, y: 56, label: "Clay vessel", note: "Hand-thrown accessories in the same earth." },
    ],
    pairing: "Terracotta pattern + lime plaster + travertine + oak + olive",
    figmaUrl: figmaFrameUrl("1-5"),
    inspirationUrl:
      "https://materialdepot.com/image-gallery-details/modern-bathroom-with-terracotta-and-white-patterned-moroccan-tiles-and-light-oak-floating-vanity-1fe3",
  },
  {
    slug: "monaco-after-dark",
    index: 3,
    number: "04",
    title: "Monaco After Dark",
    subtitle: "Some spaces are made to be remembered.",
    narrative:
      "An expression of quiet opulence, where dramatic marble, rich contrasts, and golden details create spaces designed to leave a lasting impression.",
    statement: "Darkness, edited with gold.",
    intro:
      "A high-gloss, black marble-look slab with gold veining, sized at 1200 × 600 mm so the drama runs on without interruption. Walnut, smoked glass and brushed brass keep the mood warm rather than cold.",
    chapters: ["An Impression of Luxury", "The Beauty of Contrast", "After Dark", "Where Detail Becomes Drama", "The Material"],
    chapterCopy: {
      applications:
        "On a bathroom wall or underfoot in a living room, the gold veining reads like lighting before any lamp is switched on.",
      signature:
        "The veins are where the drama lives. On a high-gloss surface every line doubles as a reflection, so the stone changes with every light source.",
      language:
        "Black and gold set the contrast. Walnut adds depth, smoked glass softens the edges, ivory stone gives the eye a rest, and brushed brass carries the vein colour into the hardware.",
    },
    palette: [
      { name: "Midnight Black", hex: "#141519" },
      { name: "Brushed Gold", hex: "#AD8759" },
      { name: "Dark Walnut", hex: "#4B3934" },
      { name: "Warm Stone", hex: "#B6A597" },
      { name: "Soft Ivory", hex: "#EFE8DF" },
    ],
    theme: {
      bg: "#121317",
      surface: "#1C1C21",
      ink: "#EFE8DF",
      muted: "#B6A597",
      accent: "#AD8759",
      accentInk: "#C9A577",
      line: "rgba(239, 232, 223, 0.14)",
      scheme: "dark",
    },
    motion: "cinematic",
    heroLayout: "framed",
    galleryLayout: "framed",
    product: {
      name: "Marble Portoro Black Gold",
      code: "TL 05819",
      size: "1200 × 600 mm",
      sizeNote: "≈ 4 × 2 ft",
      finish: "High gloss",
      material: "Vitrified",
      thickness: "9 mm",
      type: "Marble-look wall & floor tile",
      notes: ["Listed as Marble Portoro Wall & Floor Tile, Black Gold; the original web address names it Gravier Galaxy Gold."],
      designs: "6 random designs",
      applications: ["Luxury bathroom", "Living-room feature wall", "Refined powder room", "Dining or hospitality feature surface"],
      url: "https://materialdepot.com/tl-05819-marble-wall-tile-galaxy-gold-2-ft-x-4-ft-vitrified-high-gloss-finish-9-mm-6-random-design/product",
      status: "listed",
    },
    images: {
      hero: img(P("monaco-after-dark", "bathroom"), "Bathroom clad in black and gold marble-look tiles with oak vanity and backlit round mirror", "interior-concept"),
      tile: img(P("monaco-after-dark", "tile"), "Three black marble-look slabs with dramatic gold veining", "material-study"),
      swatch: img(P("monaco-after-dark", "swatch"), "Close texture of the black and gold marble-look slab", "material-study"),
      detail: img(P("monaco-after-dark", "detail"), "Close-ups of gold veining, glossy slab edge and a four-slab joint", "material-study"),
      moodboard: img(P("monaco-after-dark", "moodboard"), "Composition of black-gold marble, fluted walnut, smoked glass, ivory stone, brushed brass and linen", "material-composition"),
      board: img("/boards/board-4.webp", "Original Figma board 04 — Monaco After Dark", "board"),
    },
    applications: [
      {
        image: img(P("monaco-after-dark", "living"), "Living room with glossy black and gold marble-look floor, cognac leather sofa and textured feature wall", "interior-concept"),
        label: "Living room surface",
        caption: "Glossy black underfoot pulls the window light across the room.",
      },
    ],
    moodboardNote: "Complementary finishes are illustrative pairings, not linked Material Depot products.",
    moodboardOnBoard: true,
    hotspots: [
      { x: 45, y: 28, label: "Black & gold marble-look", note: "The hero surface." },
      { x: 86, y: 22, label: "Fluted walnut", note: "Warm vertical rhythm for joinery." },
      { x: 20, y: 52, label: "Smoked glass", note: "Softens edges on shower screens and shelving." },
      { x: 33, y: 80, label: "Ivory stone", note: "A light counterweight for counters." },
      { x: 72, y: 60, label: "Brushed brass", note: "Picks up the vein colour in hardware." },
      { x: 86, y: 86, label: "Textured linen", note: "Softness against the gloss." },
    ],
    pairing: "Black-gold marble + walnut + smoked glass + brushed brass",
    figmaUrl: figmaFrameUrl("1-7"),
    inspirationUrl:
      "https://materialdepot.com/image-gallery-details/modern-bathroom-with-black-marble-wall-tiles-fluted-walnut-vanity-and-gold-accents-e154",
  },
  {
    slug: "botanical-sanctuary",
    index: 4,
    number: "05",
    title: "Botanical Sanctuary",
    subtitle: "Let the outside find its way in.",
    narrative:
      "A gentle reconnection with nature, where organic patterns, lush greens, and earthy textures bring the serenity of the outdoors into everyday spaces.",
    statement: "Let the wall grow.",
    intro:
      "A large-format matte tile printed with monstera and palm on a soft marble ground. Across its two design variations it becomes a mural, turning a bathroom or a dining nook into a quiet garden.",
    chapters: ["Nature Finds a Way", "A Living Canvas", "Where Spaces Breathe", "Bringing the Outside In", "The Material"],
    chapterCopy: {
      applications:
        "In the bath, beside the vanity or behind a dining banquette, the leaves run across the joints, so the wall reads as one continuous canopy.",
      signature:
        "At 1200 × 600 mm, each tile holds whole leaves rather than fragments, and the pattern opens up as the wall gets larger.",
      language:
        "Jungle green and soft sage come from the leaves. White marble, sand and fluted oak ground them, and brushed brass adds the warmth of sunlight.",
    },
    palette: [
      { name: "Jungle Green", hex: "#215A49" },
      { name: "Soft Sage", hex: "#7F9D7F" },
      { name: "Wild Moss", hex: "#B9C6A1" },
      { name: "Natural Sand", hex: "#D8C4A4" },
      { name: "Chalk White", hex: "#F4F1E8" },
    ],
    theme: {
      bg: "#F2F0E6",
      surface: "#E4E7D8",
      ink: "#1D2B25",
      muted: "#4C5C53",
      accent: "#7F9D7F",
      accentInk: "#215A49",
      line: "rgba(29, 43, 37, 0.14)",
      scheme: "light",
    },
    motion: "organic",
    heroLayout: "leaf",
    galleryLayout: "organic",
    product: {
      name: "Monstera Blanco Decor Pattern 2",
      code: "TL 06127",
      size: "1200 × 600 mm",
      sizeNote: "≈ 4 × 2 ft",
      finish: "Matte",
      material: "Vitrified",
      thickness: "9 mm",
      type: "Decorative tropical wall tile",
      designs: "2 design variations",
      applications: ["Botanical bathroom", "Shower feature wall", "Vanity area", "Dining nook", "Living-room accent wall"],
      url: "https://materialdepot.com/tl-06127-tropical-wall-tile-4-ft-x-2-ft-vitrified-matte-finish-9-mm-2-random-design-ml-1677/product",
      status: "listed",
    },
    images: {
      hero: img(P("botanical-sanctuary", "bathroom"), "Warm bathroom with botanical monstera tile wall, round backlit mirror and fluted beige vanity", "interior-concept"),
      tile: img(P("botanical-sanctuary", "tile"), "Two stacked botanical tiles with monstera and palm leaves on a soft marble ground", "material-study"),
      swatch: img(P("botanical-sanctuary", "swatch"), "Close texture of the monstera and palm print", "material-study"),
      detail: img(P("botanical-sanctuary", "detail"), "Close-ups of the lily and monstera print, tile edge and a tile joint", "material-study"),
      moodboard: img(P("botanical-sanctuary", "moodboard"), "Composition of botanical tile, fluted oak, white marble, sage tile, brass, linen and foliage", "material-composition"),
      board: img("/boards/board-5.webp", "Original Figma board 05 — Botanical Sanctuary", "board"),
    },
    applications: [
      {
        image: img(P("botanical-sanctuary", "bath"), "Freestanding bathtub against a botanical tile wall with geometric black and white floor", "interior-concept"),
        label: "Shower & bath feature wall",
        caption: "A freestanding bath against the leaves feels like bathing outdoors.",
      },
      {
        image: img(P("botanical-sanctuary", "dining"), "Dining nook with botanical tile wall, travertine table and brass pendant", "interior-concept"),
        label: "Contemporary dining nook",
        caption: "Behind a banquette, the mural turns a corner into a garden room.",
      },
    ],
    moodboardNote: "Complementary finishes are illustrative pairings, not linked Material Depot products.",
    moodboardOnBoard: true,
    hotspots: [
      { x: 50, y: 45, label: "Botanical decor tile", note: "The hero surface." },
      { x: 14, y: 22, label: "Fluted oak", note: "Warm vertical texture for vanities." },
      { x: 82, y: 18, label: "White marble", note: "A calm ground for floors." },
      { x: 82, y: 56, label: "Sage tile", note: "A plain companion for adjoining walls." },
      { x: 76, y: 74, label: "Brushed brass", note: "Sunlight on fittings and lamps." },
      { x: 88, y: 88, label: "Natural linen", note: "Soft textiles in sand." },
      { x: 12, y: 62, label: "Foliage", note: "Real greenery to extend the print." },
    ],
    pairing: "Botanical print + white marble + fluted oak + brushed brass",
    figmaUrl: figmaFrameUrl("1-9"),
    inspirationUrl:
      "https://materialdepot.com/image-gallery-details/modern-bathroom-with-botanical-floral-highlighter-wall-tiles-beige-fluted-vanity-and-white-marble-floor-tiles",
  },
];

/** The single colour that identifies a story at a glance (gold for Monaco's black). */
export function signatureColor(story: Story) {
  return story.theme.scheme === "dark" ? story.palette[1].hex : story.palette[0].hex;
}

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}

export function nextStory(story: Story): Story | null {
  return stories[story.index + 1] ?? null;
}
