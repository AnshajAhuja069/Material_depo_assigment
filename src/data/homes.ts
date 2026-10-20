import { img, type Img } from "@/lib/images";
import type { MaterialId, Surface } from "@/data/materials";

/** One material, as it is applied in one room. */
export interface RoomUse {
  material: MaterialId;
  surface: Surface;
  detail: string;
  /** False when the material is specified for the room but not visible in the concept image. */
  pictured?: boolean;
}

/** A labelled point on a room image, in percent. */
export interface Annotation {
  material: MaterialId;
  x: number;
  y: number;
}

export interface Room {
  id: string;
  name: string;
  image: Img;
  focus?: string;
  uses: RoomUse[];
  rationale: string;
  annotations: Annotation[];
  /** Honest note when the concept image differs from the specification. */
  imageNote?: string;
}

export interface CuratedMaterial {
  material: MaterialId;
  /** The material's primary role in this home (drives the flat-lay layout). */
  role: Surface;
  reason: string;
}

export interface Home {
  slug: string;
  name: string;
  concept: string;
  mood: string;
  heroImage: Img;
  materials: CuratedMaterial[];
  rooms: [Room, Room, Room];
  rationale: { title: string; text: string }[];
  /** Drop the revised whole-home board here when it is ready (see docs/figma-revision-handoff.md). */
  revisedBoard: Img | null;
}

const P = (slug: string, file: string) => `/stories/${slug}/${file}.webp`;
const AI = "AI-generated concept visual for this revision. It is illustrative, and the specified materials are listed alongside.";

export const homes: Record<string, Home> = {
  "tidal-ritual": {
    slug: "tidal-ritual",
    name: "A Coastal Home",
    concept:
      "A serene coastal home where ocean colour arrives in measured doses, through stone, sea-glass cabinetry and one glossy bathroom wall, over a constant ground of pale stone and oak.",
    mood: "Pale stone · sea-glass · honey flutes · one glossy statement",
    heroImage: img(P("tidal-ritual", "living"), "Coastal living room with pale stone floor, fluted oak wall and seafoam onyx-look coffee table", "interior-concept"),
    materials: [
      { material: "tl-04445", role: "floor", reason: "A pale, matte stone-look ground laid through every room. Its latte undertone reads like dry sand, so the aqua never tips into a beach theme." },
      { material: "tl-03643-e", role: "feature", reason: "The home's one saturated statement, kept to the bathroom where gloss and water belong." },
      { material: "1e172-pu", role: "joinery", reason: "Carries the sea-glass note into the kitchen at a fraction of the saturation, in a soft PU finish rather than a shine." },
      { material: "lm-15506", role: "joinery", reason: "Honey-toned flutes repeat in all three rooms, adding warmth and a vertical rhythm that echoes the kitkat lines." },
      { material: "qr-00054", role: "counter", reason: "A white quartz with fine pebble speckle: bright and practical, and close in value to the floor so surfaces feel continuous." },
      { material: "tl-05147", role: "accent", reason: "Seafoam onyx-look, used once on the living-room console and coffee table: the jewellery of the palette." },
    ],
    rooms: [
      {
        id: "living",
        name: "Living room",
        image: img(P("tidal-ritual", "living"), "Coastal living room with pale stone floor, fluted oak media wall, cream sofa and seafoam onyx-look tables", "interior-concept"),
        uses: [
          { material: "tl-04445", surface: "floor", detail: "Continuous 1200 × 600 mm matte floor" },
          { material: "lm-15506", surface: "joinery", detail: "Full-height fluted media wall and console" },
          { material: "tl-05147", surface: "accent", detail: "Coffee-table and console tops" },
        ],
        rationale: "Mostly sand and oak. Aqua enters only through polished seafoam stone and glass, so the room feels coastal without a single blue wall.",
        annotations: [
          { material: "tl-04445", x: 20, y: 86 },
          { material: "lm-15506", x: 34, y: 24 },
          { material: "tl-05147", x: 50, y: 58 },
        ],
        imageNote: AI,
      },
      {
        id: "kitchen",
        name: "Kitchen",
        image: img(P("tidal-ritual", "kitchen"), "Coastal kitchen with frosted mint cabinets, speckled white quartz, fluted oak island and pale stone floor", "interior-concept"),
        uses: [
          { material: "tl-04445", surface: "floor", detail: "The same floor, carried through" },
          { material: "1e172-pu", surface: "joinery", detail: "Flat-panel tall and base cabinets" },
          { material: "lm-15506", surface: "joinery", detail: "Island cladding" },
          { material: "qr-00054", surface: "counter", detail: "Worktops and island top" },
        ],
        rationale: "The colour moves from accent to cabinetry, softened to a frosted mint. The honey flutes and the floor are the threads back to the living room.",
        annotations: [
          { material: "1e172-pu", x: 14, y: 64 },
          { material: "qr-00054", x: 70, y: 58 },
          { material: "lm-15506", x: 74, y: 82 },
          { material: "tl-04445", x: 38, y: 93 },
        ],
        imageNote: AI,
      },
      {
        id: "bathroom",
        name: "Bathroom",
        image: img(P("tidal-ritual", "hero"), "Bathroom with vertical aqua kitkat tile wall, stone vanity and oak shelf", "interior-concept"),
        uses: [
          { material: "tl-03643-e", surface: "feature", detail: "Vertical kitkat feature wall" },
          { material: "tl-04445", surface: "floor", detail: "Floor matching the living areas" },
          { material: "qr-00054", surface: "counter", detail: "Vanity top" },
          { material: "lm-15506", surface: "joinery", detail: "Open shelf and vanity facing" },
        ],
        rationale: "The only room with full-strength aqua and gloss, where water makes both feel natural. It is anchored by the same stone, quartz and oak used elsewhere.",
        annotations: [
          { material: "tl-03643-e", x: 64, y: 22 },
          { material: "qr-00054", x: 40, y: 62 },
          { material: "lm-15506", x: 44, y: 80 },
          { material: "tl-04445", x: 66, y: 95 },
        ],
        imageNote: "Concept visual from the original Figma board. The vanity and floor are shown as illustrative stone.",
      },
    ],
    rationale: [
      { title: "Shared undertones", text: "Floor, oak and quartz all sit on the same warm cream undertone. Against that common base the aqua accents read as intentional rather than random." },
      { title: "Colour continuity", text: "Aqua appears at three strengths: full saturation on the bathroom kitkat, a frosted mint on kitchen cabinetry and polished seafoam stone in the living room. One colour, three volumes." },
      { title: "Contrasting textures", text: "Curved, glossy kitkat against matte punch-finish floor. Smooth PU cabinetry against channelled flutes. The contrast is in texture, not colour." },
      { title: "Matte and gloss", text: "Gloss is reserved for water and light: the bathroom wall and the onyx accent. Everything walked on or touched daily is matte or soft-finish." },
      { title: "Feature restraint", text: "At 300 × 100 mm the kitkat is busy at scale, so it stays on one bathroom wall instead of following the colour into every room." },
      { title: "Repetition & variation", text: "The same honey flute appears in all three rooms at three scales: a full media wall, an island face and a bathroom shelf edge." },
    ],
    revisedBoard: null,
  },

  "nordic-daylight": {
    slug: "nordic-daylight",
    name: "A Scandinavian Home",
    concept:
      "A light, warm Scandinavian home unified by one honey-oak floor, with sage, pale oak and fluted wood used to give each room its own character.",
    mood: "Honey planks · sage matte · pale oak · fluted wood · white quartz",
    heroImage: img(P("nordic-daylight", "hero"), "Scandinavian living room with honey oak plank floor, linen sofa and pale oak furniture", "interior-concept"),
    materials: [
      { material: "tl-06117", role: "floor", reason: "One honey-oak plank floor through every room: the warm constant of the home, matte, with the 2–3 mm joint the listing requires." },
      { material: "lm-01269", role: "feature", reason: "Fluted wood-look for the kitchen uppers and the living-room media wall, adding texture without adding a colour." },
      { material: "lm-10851", role: "joinery", reason: "A matte sage that belongs to the kitchen and returns only once, as the bedroom headboard panel." },
      { material: "lm-03017", role: "joinery", reason: "A whitewashed pale oak for wardrobes and sideboards: lighter and cooler than the floor, so joinery never competes with the planks." },
      { material: "qr-00104", role: "counter", reason: "Clean white quartz keeps the kitchen bright under low northern light." },
      { material: "tl-09790-c", role: "wall", reason: "A matte ivory 600 × 300 mm backsplash: softer than white and calm beside sage." },
    ],
    rooms: [
      {
        id: "living",
        name: "Living room",
        image: img(P("nordic-daylight", "hero"), "Scandinavian living room with honey oak floor, oak sideboard and round oak coffee table", "interior-concept"),
        uses: [
          { material: "tl-06117", surface: "floor", detail: "Continuous 1200 × 200 mm planks" },
          { material: "lm-03017", surface: "joinery", detail: "Sideboard and wall shelving" },
          { material: "lm-01269", surface: "feature", detail: "Fluted media wall", pictured: false },
        ],
        rationale: "Warmth comes from the floor; the pale oak furniture keeps it light. The fluted media wall, specified opposite the sofa, ties the room to the kitchen.",
        annotations: [
          { material: "tl-06117", x: 52, y: 86 },
          { material: "lm-03017", x: 31, y: 50 },
        ],
        imageNote: "Concept visual from the original Figma board.",
      },
      {
        id: "kitchen",
        name: "Kitchen",
        image: img(P("nordic-daylight", "kitchen"), "Scandinavian kitchen with sage base cabinets, fluted wood uppers, white quartz and honey oak floor", "interior-concept"),
        uses: [
          { material: "tl-06117", surface: "floor", detail: "The same planks, carried through" },
          { material: "lm-10851", surface: "joinery", detail: "Base cabinets and island" },
          { material: "lm-01269", surface: "feature", detail: "Fluted upper shutters" },
          { material: "qr-00104", surface: "counter", detail: "Worktops" },
          { material: "tl-09790-c", surface: "wall", detail: "Backsplash", pictured: false },
        ],
        rationale: "The most colourful room, and the only one where sage is used at scale. Fluted uppers and the shared floor keep it part of the same home.",
        annotations: [
          { material: "lm-01269", x: 46, y: 16 },
          { material: "lm-10851", x: 16, y: 72 },
          { material: "qr-00104", x: 60, y: 62 },
          { material: "tl-06117", x: 50, y: 94 },
        ],
        imageNote: "Concept visual from the original Figma board, based on the Material Depot inspiration kitchen. The backsplash is shown as illustrative stone.",
      },
      {
        id: "bedroom",
        name: "Bedroom",
        image: img(P("nordic-daylight", "bedroom"), "Scandinavian bedroom with honey oak floor, pale oak wardrobe and sage green headboard panel", "interior-concept"),
        uses: [
          { material: "tl-06117", surface: "floor", detail: "The same planks, carried through" },
          { material: "lm-03017", surface: "joinery", detail: "Full-height wardrobe" },
          { material: "lm-10851", surface: "accent", detail: "Headboard wall panel" },
        ],
        rationale: "The quietest room: floor and pale oak only, plus one sage panel behind the bed. It shares the kitchen's language at a whisper.",
        annotations: [
          { material: "lm-03017", x: 12, y: 44 },
          { material: "lm-10851", x: 76, y: 28 },
          { material: "tl-06117", x: 40, y: 86 },
        ],
        imageNote: AI,
      },
    ],
    rationale: [
      { title: "Shared undertones", text: "Honey planks, pale oak and sage all carry a soft yellow-grey undertone, which is why sage sits naturally beside wood instead of reading as a separate colour scheme." },
      { title: "Colour continuity", text: "The floor runs unbroken through living room, kitchen and bedroom, so moving between rooms feels like one daylit space." },
      { title: "Contrasting textures", text: "Fluted wood against flat sage, suede oak against polished quartz: texture changes from room to room while the palette barely moves." },
      { title: "Matte and gloss", text: "Everything is matte or suede except the quartz worktop, the one polished surface where it is practical." },
      { title: "Two oaks, deliberately", text: "The joinery oak is a step paler than the floor oak. Matching them exactly would flatten the room; the small contrast lets each read as its own surface." },
      { title: "Avoiding clutter", text: "No room uses more than five materials, and the bedroom uses three. Restraint is the Scandinavian idea in practice, not just in the styling." },
    ],
    revisedBoard: null,
  },

  "casa-terracotta": {
    slug: "casa-terracotta",
    name: "A Mediterranean Home",
    concept:
      "A warm, crafted home where patterned terracotta tile is the accent, not the backdrop. It sits within a calm family of travertine floors, oak, taupe flutes and lime-plaster walls.",
    mood: "Travertine · terracotta pattern · natural oak · olive · lime plaster",
    heroImage: img(P("casa-terracotta", "living"), "Mediterranean living room with travertine-look floor, fluted taupe sideboard, oak table and lime-plaster walls", "interior-concept"),
    materials: [
      { material: "tl-04455", role: "floor", reason: "A warm travertine-look floor: the calm field that lets the pattern feel special when it appears." },
      { material: "tl-05430", role: "feature", reason: "The pattern, used twice: as the kitchen backsplash and as the balcony floor, never in the living room." },
      { material: "lm-02891", role: "joinery", reason: "Natural oak for kitchen cabinetry and living furniture, the working wood of Mediterranean homes." },
      { material: "lm-01356", role: "joinery", reason: "Taupe flutes on the living-room sideboard echo the rhythm of hand-made tile without adding a second pattern." },
      { material: "qr-00011", role: "counter", reason: "A sandstone-toned quartz that sits between floor and plaster in value." },
      { material: "tl-00778", role: "accent", reason: "A plain, matte olive stone-look tile for the balcony bench. It brings in the green of olive leaves and gives the pattern a calm partner." },
      { material: "casa-limewash", role: "wall", reason: "Lime-plaster walls in every room give the home its soft, hand-made light." },
    ],
    rooms: [
      {
        id: "living",
        name: "Living room",
        image: img(P("casa-terracotta", "living"), "Mediterranean living room with travertine floor, fluted taupe sideboard, oak coffee table and plaster arch", "interior-concept"),
        uses: [
          { material: "tl-04455", surface: "floor", detail: "Large-format travertine-look floor" },
          { material: "casa-limewash", surface: "wall", detail: "Lime-plaster walls and arch" },
          { material: "lm-01356", surface: "joinery", detail: "Fluted sideboard" },
          { material: "lm-02891", surface: "joinery", detail: "Coffee table and shelving" },
        ],
        rationale: "No pattern here. Terracotta arrives only through clay objects and textiles, so the living room stays restful while still belonging to the family.",
        annotations: [
          { material: "tl-04455", x: 22, y: 86 },
          { material: "lm-01356", x: 46, y: 46 },
          { material: "lm-02891", x: 48, y: 66 },
          { material: "casa-limewash", x: 62, y: 18 },
        ],
        imageNote: AI,
      },
      {
        id: "kitchen",
        name: "Kitchen",
        image: img(P("casa-terracotta", "kitchen"), "Mediterranean kitchen with patterned terracotta backsplash, oak cabinets and plaster hood", "interior-concept"),
        uses: [
          { material: "tl-05430", surface: "feature", detail: "Patterned backsplash" },
          { material: "lm-02891", surface: "joinery", detail: "Shaker-style cabinetry" },
          { material: "qr-00011", surface: "counter", detail: "Worktops and island" },
          { material: "tl-04455", surface: "floor", detail: "The same floor, carried through" },
          { material: "casa-limewash", surface: "wall", detail: "Plaster hood and upper walls" },
        ],
        rationale: "The pattern's first appearance, framed by oak below and plaster above so it reads as a hand-made panel rather than wallpaper.",
        annotations: [
          { material: "tl-05430", x: 52, y: 30 },
          { material: "lm-02891", x: 34, y: 62 },
          { material: "qr-00011", x: 76, y: 57 },
          { material: "casa-limewash", x: 62, y: 9 },
        ],
        imageNote: "Concept visual from the original Figma board. The backsplash pattern shown is illustrative; the specified tile is TL 05430.",
      },
      {
        id: "balcony",
        name: "Balcony",
        image: img(P("casa-terracotta", "balcony"), "Mediterranean balcony with patterned floor tiles, olive-green tiled bench and lime-plaster walls", "interior-concept"),
        uses: [
          { material: "tl-05430", surface: "floor", detail: "Patterned floor (listed for balcony use)" },
          { material: "tl-00778", surface: "accent", detail: "Bench and planter-ledge cladding" },
          { material: "casa-limewash", surface: "wall", detail: "Plaster walls" },
        ],
        rationale: "Pattern moves underfoot, where it is lived on. A plain olive bench beside it adds the palette's green without a second pattern.",
        annotations: [
          { material: "tl-05430", x: 72, y: 90 },
          { material: "tl-00778", x: 30, y: 72 },
          { material: "casa-limewash", x: 88, y: 46 },
        ],
        imageNote: `${AI} The floor pattern shown is illustrative; the specified tile is TL 05430.`,
      },
    ],
    rationale: [
      { title: "Shared undertones", text: "Travertine, oak, taupe flute, sandstone quartz and plaster all sit in the same warm, earthy value range. Only the patterned tile and the olive step out of it." },
      { title: "Pattern as accent", text: "The terracotta pattern appears in two places: a kitchen backsplash and a balcony floor. Keeping it out of the living room is what makes it feel like a memory rather than a theme." },
      { title: "Contrasting textures", text: "Punch-matte travertine, suede oak, ribbed flutes and chalky plaster: four kinds of matte that create depth without gloss." },
      { title: "Pattern and plain", text: "On the balcony the patterned floor is paired with a plain olive bench: pattern underfoot, calm at seat height. One expressive surface per eye level." },
      { title: "Practical placement", text: "Pattern goes where its matte ceramic body is listed and suited, on the kitchen wall and the balcony floor. The large-format travertine handles the main living floors." },
      { title: "Avoiding clutter", text: "Each room has one star at most: the kitchen's backsplash, the balcony's floor. The living room's star is its light." },
    ],
    revisedBoard: null,
  },

  "monaco-after-dark": {
    slug: "monaco-after-dark",
    name: "A Contemporary Luxury Home",
    concept:
      "Sophistication through contrast and restraint. Black-and-gold marble is placed only where it can be seen against light floors, deep walnut and warm ivory, with brass as the thread.",
    mood: "Black-gold marble · Carrara · dark walnut · ivory quartz · brushed brass",
    heroImage: img(P("monaco-after-dark", "living-room"), "Luxury living room with a single black and gold marble feature wall, walnut panelling and light marble floor", "interior-concept"),
    materials: [
      { material: "tl-05310-b", role: "floor", reason: "A light Carrara-look floor in the living and dining rooms, so the black marble is always seen against brightness." },
      { material: "tl-05819", role: "feature", reason: "Black-and-gold used as a feature, not a backdrop: one wall, one niche, and full immersion only in the small powder room." },
      { material: "lm-02979", role: "joinery", reason: "Extra-matt walnut panelling and sideboards absorb light and frame the gloss." },
      { material: "lm-01406", role: "joinery", reason: "Fluted walnut for the powder-room vanity: the same wood, now in relief." },
      { material: "qr-00052", role: "counter", reason: "Warm ivory quartz for sideboard and vanity tops, bridging the white floor and the gold veins." },
      { material: "monaco-brass", role: "accent", reason: "Brushed brass picks up the vein colour in lighting, taps and pulls." },
    ],
    rooms: [
      {
        id: "living",
        name: "Living room",
        image: img(P("monaco-after-dark", "living-room"), "Luxury living room with black and gold marble media wall, walnut side panels, Carrara floor and brass floor lamp", "interior-concept"),
        uses: [
          { material: "tl-05819", surface: "feature", detail: "One media wall only" },
          { material: "lm-02979", surface: "joinery", detail: "Side-wall panelling" },
          { material: "tl-05310-b", surface: "floor", detail: "Light Carrara-look floor" },
          { material: "monaco-brass", surface: "accent", detail: "Floor lamp and trims" },
        ],
        rationale: "A single dark wall reads as architecture, not decoration. The light floor doubles its drama by contrast.",
        annotations: [
          { material: "tl-05819", x: 60, y: 30 },
          { material: "lm-02979", x: 90, y: 46 },
          { material: "tl-05310-b", x: 46, y: 86 },
          { material: "monaco-brass", x: 13, y: 22 },
        ],
        imageNote: AI,
      },
      {
        id: "dining",
        name: "Dining room",
        image: img(P("monaco-after-dark", "dining"), "Luxury dining room with walnut sideboard, black marble niche, ivory quartz top and brass pendant", "interior-concept"),
        uses: [
          { material: "lm-02979", surface: "joinery", detail: "Built-in sideboard" },
          { material: "tl-05819", surface: "feature", detail: "Lit niche lining" },
          { material: "qr-00052", surface: "counter", detail: "Sideboard top" },
          { material: "tl-05310-b", surface: "floor", detail: "The same light floor" },
          { material: "monaco-brass", surface: "accent", detail: "Sculptural pendant" },
        ],
        rationale: "Here walnut leads and the marble shrinks to a lit niche: the same family at a different volume.",
        annotations: [
          { material: "tl-05819", x: 24, y: 28 },
          { material: "qr-00052", x: 30, y: 52 },
          { material: "lm-02979", x: 20, y: 74 },
          { material: "monaco-brass", x: 76, y: 26 },
          { material: "tl-05310-b", x: 30, y: 93 },
        ],
        imageNote: AI,
      },
      {
        id: "powder",
        name: "Powder room",
        image: img(P("monaco-after-dark", "powder"), "Powder room in black and gold marble with fluted walnut vanity, ivory top and brass tap", "interior-concept"),
        uses: [
          { material: "tl-05819", surface: "feature", detail: "Walls and floor, full immersion" },
          { material: "lm-01406", surface: "joinery", detail: "Floating fluted vanity" },
          { material: "qr-00052", surface: "counter", detail: "Vanity top" },
          { material: "monaco-brass", surface: "accent", detail: "Tap, pendant and mirror light" },
        ],
        rationale: "The one room allowed to go fully dark. It is small, visited briefly and made to be remembered.",
        annotations: [
          { material: "tl-05819", x: 18, y: 26 },
          { material: "monaco-brass", x: 72, y: 40 },
          { material: "qr-00052", x: 62, y: 60 },
          { material: "lm-01406", x: 60, y: 78 },
        ],
        imageNote: AI,
      },
    ],
    rationale: [
      { title: "Controlled contrast", text: "Black marble appears in all three rooms but at shrinking scale: a wall, then a niche, then a whole small room. Contrast is rationed, so it never loses its effect." },
      { title: "Shared undertones", text: "The gold in the veins, the brass, the ivory quartz and the walnut all lean warm. That shared warmth stops a black-and-white palette from feeling cold." },
      { title: "Matte and gloss", text: "High-gloss marble and floors are balanced by extra-matt walnut. Gloss reflects the light and matte absorbs it, which is where the depth comes from." },
      { title: "Repetition & variation", text: "Walnut appears flat in the living and dining rooms and fluted in the powder room: one timber, two textures." },
      { title: "Practical placement", text: "Quartz is used on surfaces that see spills: the sideboard top and the vanity. The vitrified marble-look tile is listed for living and dining use." },
      { title: "Avoiding clutter", text: "The palette is five materials and one metal. Luxury here comes from fewer, larger surfaces, not from more finishes." },
    ],
    revisedBoard: null,
  },

  "botanical-sanctuary": {
    slug: "botanical-sanctuary",
    name: "A Biophilic Home",
    concept:
      "A home that lets nature in without becoming a jungle. The botanical tile appears at three different scales, supported by soft stone, sage-grey textures and warm wood.",
    mood: "Botanical print · soft Statuario · dusty sage flutes · sand flutes · light oak",
    heroImage: img(P("botanical-sanctuary", "living"), "Biophilic living room with soft marble floor, sage storage, oak shelving and a framed botanical tile panel", "interior-concept"),
    materials: [
      { material: "tl-00797", role: "floor", reason: "A soft, matte Statuario floor that keeps every room light, so green belongs to the walls rather than the floor." },
      { material: "tl-06127", role: "feature", reason: "The botanical print at three scales: a framed panel, a full dining wall and an accent wall behind the vanity." },
      { material: "lm-15488", role: "joinery", reason: "Fine-fluted dusty sage for storage, drawn from the leaves' most muted tone." },
      { material: "1e208-cfl", role: "joinery", reason: "Sand-beige flutes for the vanity: the warm neutral between marble and leaf." },
      { material: "lm-02969", role: "joinery", reason: "A light natural oak for shelving and the dining banquette, the wood that makes green feel natural rather than cold." },
      { material: "qr-00035", role: "counter", reason: "Ivory quartz for the vanity top and dining sideboard." },
    ],
    rooms: [
      {
        id: "living",
        name: "Living room",
        image: img(P("botanical-sanctuary", "living"), "Biophilic living room with Statuario floor, sage storage units, oak shelving and a framed botanical panel", "interior-concept"),
        uses: [
          { material: "tl-00797", surface: "floor", detail: "Matte Statuario floor" },
          { material: "lm-15488", surface: "joinery", detail: "Media and storage units" },
          { material: "lm-02969", surface: "joinery", detail: "Shelving niche" },
          { material: "tl-06127", surface: "feature", detail: "One framed panel in a lit niche" },
        ],
        rationale: "The botanical tile is framed like a painting, a single panel. Sage flutes and oak shelves carry its colours across the rest of the wall.",
        annotations: [
          { material: "tl-06127", x: 30, y: 24 },
          { material: "lm-02969", x: 52, y: 30 },
          { material: "lm-15488", x: 20, y: 58 },
          { material: "tl-00797", x: 46, y: 88 },
        ],
        imageNote: AI,
      },
      {
        id: "dining",
        name: "Dining nook",
        image: img(P("botanical-sanctuary", "dining"), "Dining nook with botanical tile feature wall, pale table and brass pendant", "interior-concept"),
        uses: [
          { material: "tl-06127", surface: "feature", detail: "Full feature wall behind the banquette" },
          { material: "lm-02969", surface: "joinery", detail: "Slatted side panel and banquette base" },
          { material: "qr-00035", surface: "counter", detail: "Sideboard top", pictured: false },
        ],
        rationale: "The one room where the print goes full-scale, behind a banquette, where it is enjoyed seated and at rest.",
        annotations: [
          { material: "tl-06127", x: 55, y: 22 },
          { material: "lm-02969", x: 7, y: 42 },
        ],
        imageNote: "Concept visual from the original Figma board, shown at its native resolution.",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        image: img(P("botanical-sanctuary", "bathroom"), "Bathroom with botanical accent wall, fluted beige vanity, ivory top and light marble floor", "interior-concept"),
        uses: [
          { material: "tl-06127", surface: "feature", detail: "Accent wall behind the vanity" },
          { material: "1e208-cfl", surface: "joinery", detail: "Fluted floating vanity" },
          { material: "qr-00035", surface: "counter", detail: "Vanity top" },
          { material: "tl-00797", surface: "floor", detail: "The same soft marble floor" },
        ],
        rationale: "Leaves behind the mirror, sand flutes below and soft marble underfoot: a spa-like calm built from the same family.",
        annotations: [
          { material: "tl-06127", x: 44, y: 18 },
          { material: "qr-00035", x: 50, y: 60 },
          { material: "1e208-cfl", x: 44, y: 72 },
          { material: "tl-00797", x: 40, y: 94 },
        ],
        imageNote: "Concept visual from the original Figma board.",
      },
    ],
    rationale: [
      { title: "One print, three scales", text: "The botanical tile is a framed panel in the living room, a full wall in the dining nook and an accent behind the vanity. It is the same surface, scaled to each room's purpose." },
      { title: "Shared undertones", text: "Dusty sage, sand flute, light oak and ivory quartz are all sampled from the tile itself: the grey-green of the leaves, the cream of the ground and the warmth of the stems." },
      { title: "Contrasting textures", text: "Matte printed tile, ribbed flutes, textured laminate and soft-matte marble: tactile variety that echoes the irregularity of nature." },
      { title: "Soft sheen, not shine", text: "Floor, printed tile and sand flutes are matte. Only the smaller sage flutes and oak shelving carry a gentle gloss to catch daylight, so the home reads as soft daylight rather than polished hotel." },
      { title: "Practical placement", text: "The decorative tile is listed for wall use and stays on walls. The floor is a matte Statuario listed for bathroom, kitchen and living use." },
      { title: "Avoiding clutter", text: "Green appears as one print and one solid per room at most. Real plants do the rest." },
    ],
    revisedBoard: null,
  },
};

export function getHome(slug: string): Home {
  const h = homes[slug];
  if (!h) throw new Error(`No home data for "${slug}"`);
  return h;
}

/** Every room a material appears in, derived from room data (never hand-written). */
export function roomsUsing(home: Home, material: MaterialId) {
  return home.rooms.filter((r) => r.uses.some((u) => u.material === material));
}
