"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Maximize2, Sparkles } from "lucide-react";
import type { Story } from "@/data/stories";
import { getMaterial, productImage, surfaceLabel, VERIFIED_ON, type Material, type SampleForm } from "@/data/materials";
import { roomsUsing } from "@/data/homes";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { SampleImage } from "@/components/curation/SampleImage";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { Dialog } from "@/components/ui/Dialog";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Width/height of each sample form — keeps proportions plausible on the board. */
const formAspect: Record<SampleForm, number> = {
  plank: 0.42,
  "large-tile": 0.62,
  "small-tile": 1,
  kitkat: 0.8,
  sheet: 0.72,
  fluted: 0.68,
  slab: 1.35,
  chip: 1,
};
const formScale: Record<SampleForm, number> = {
  plank: 0.85,
  "large-tile": 1,
  "small-tile": 0.8,
  kitkat: 0.9,
  sheet: 0.9,
  fluted: 0.9,
  slab: 1,
  chip: 0.6,
};

type Slot = { x: number; y: number; w: number; r: number };
const desktopSlots: Slot[] = [
  { x: 4, y: 8, w: 24, r: -3 },
  { x: 26, y: 22, w: 22, r: 4 },
  { x: 47, y: 6, w: 20, r: -5 },
  { x: 64, y: 30, w: 18, r: 6 },
  { x: 44, y: 50, w: 24, r: -2 },
  { x: 80, y: 6, w: 15, r: 9 },
  { x: 77, y: 60, w: 17, r: -7 },
];
const mobileSlots: Slot[] = [
  { x: 4, y: 3, w: 40, r: -3 },
  { x: 50, y: 5, w: 36, r: 4 },
  { x: 6, y: 50, w: 32, r: 5 },
  { x: 40, y: 40, w: 28, r: -6 },
  { x: 50, y: 70, w: 44, r: -2 },
  { x: 74, y: 40, w: 22, r: 8 },
  { x: 8, y: 80, w: 30, r: -4 },
];

function Sample({
  material,
  slot,
  index,
  active,
  dimmed,
  onSelect,
  style,
  show,
  reduced,
}: {
  material: Material;
  slot: Slot;
  index: number;
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
  style: Story["motion"];
  show: boolean;
  reduced: boolean;
}) {
  const t = motionTokens[style];
  const w = slot.w * formScale[material.form];
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-pressed={active}
      aria-label={`${material.name}${material.code ? `, ${material.code}` : ""}`}
      className="group absolute block origin-center text-left focus-visible:outline-offset-4"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${w}%`, zIndex: active ? 30 : 10 + index }}
      initial={{ opacity: 0, y: 60, rotate: slot.r * 2.4, scale: 0.9 }}
      animate={
        show
          ? { opacity: dimmed ? 0.55 : 1, y: active ? -14 : 0, rotate: active ? 0 : slot.r, scale: active ? 1.06 : 1 }
          : undefined
      }
      transition={reduced ? instant : { duration: t.duration * 0.6, ease: t.ease, delay: show && !active ? index * t.stagger * 1.4 : 0 }}
    >
      <span
        className={cn(
          "relative block overflow-hidden bg-surface transition-shadow duration-500",
          material.form === "chip" ? "rounded-full" : "rounded-[2px]",
          active ? "shadow-[0_30px_50px_-18px_rgba(0,0,0,0.55)]" : "shadow-[0_14px_26px_-14px_rgba(0,0,0,0.45)]",
        )}
        style={{ aspectRatio: formAspect[material.form] }}
      >
        <SampleImage material={material} sizes="(min-width: 1024px) 22vw, 40vw" height={600} />
      </span>
      <span
        className={cn(
          "pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-80",
        )}
      >
        {material.code ?? "Concept finish"}
      </span>
    </motion.button>
  );
}

/** Section C — the home's material collection as an architectural finish board. */
export function MaterialFlatLay({ story }: { story: Story }) {
  const { home, material: traced, setMaterial, showRoom } = useHomeSelection();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotionSafe();
  const [inspect, setInspect] = useState(false);
  const curated = home.materials;
  const activeId = traced && curated.some((c) => c.material === traced) ? traced : curated[0].material;
  const activeIndex = curated.findIndex((c) => c.material === activeId);
  const active = getMaterial(activeId);
  const entry = curated[activeIndex];
  const rooms = roomsUsing(home, activeId);
  const show = inView || reduced;

  const step = (d: number) => setMaterial(curated[(activeIndex + d + curated.length) % curated.length].material);

  const verifiedCount = curated.filter((c) => getMaterial(c.material).verification === "verified").length;
  const categories = new Set(curated.map((c) => getMaterial(c.material).category.split(" · ")[0]));

  return (
    <section id="chapter-2" className="gutter scroll-mt-24 py-[14vh]" aria-labelledby="flatlay-heading">
      <ChapterHeading
        index={2}
        title="A Curated Language of Materials"
        copy={`${curated.length} materials across ${categories.size} categories (${verifiedCount} real Material Depot products) chosen to work as one family. Select a sample to see what it is, where it goes and why it is here.`}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div ref={ref} className="lg:col-span-7">
          {[
            { slots: desktopSlots, cls: "hidden aspect-[4/3] sm:block" },
            { slots: mobileSlots, cls: "aspect-[4/5] sm:hidden" },
          ].map(({ slots, cls }) => (
            <div
              key={cls}
              className={cn("relative w-full rounded-sm", cls)}
              style={{
                background: story.theme.scheme === "dark" ? "#1d1c20" : "#faf8f3",
                boxShadow: "inset 0 0 0 1px var(--line)",
              }}
            >
              {curated.map((c, i) => (
                <Sample
                  key={c.material}
                  material={getMaterial(c.material)}
                  slot={slots[i % slots.length]}
                  index={i}
                  active={c.material === activeId}
                  dimmed={!!traced && c.material !== activeId}
                  onSelect={() => setMaterial(c.material)}
                  style={story.motion}
                  show={show}
                  reduced={reduced}
                />
              ))}
              <span className="eyebrow pointer-events-none absolute bottom-3 right-4 text-[10px] text-muted">
                {home.name} · finish board
              </span>
            </div>
          ))}
          {/* Accessible, mobile-friendly index of the same samples */}
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Materials in this home">
            {curated.map((c) => {
              const m = getMaterial(c.material);
              return (
                <li key={c.material}>
                  <button
                    type="button"
                    onClick={() => setMaterial(c.material)}
                    aria-pressed={c.material === activeId}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-full border px-3 text-xs transition-colors",
                      c.material === activeId ? "border-transparent bg-ink text-bg" : "border-current/20 hover:border-current/50",
                    )}
                  >
                    <span className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: m.tone }} aria-hidden />
                    {m.code ?? "Concept"} · {surfaceLabel[c.role]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeId}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={reduced ? instant : { duration: 0.45, ease: motionTokens[story.motion].ease }}
              className="lg:sticky lg:top-[calc(var(--header-h)+3vh)]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-accent-ink">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(curated.length).padStart(2, "0")} · {surfaceLabel[entry.role]}
                </p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous material" className="grid h-10 w-10 place-items-center rounded-full border border-current/20 hover:bg-ink hover:text-bg">
                    <ArrowLeft size={15} aria-hidden />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next material" className="grid h-10 w-10 place-items-center rounded-full border border-current/20 hover:bg-ink hover:text-bg">
                    <ArrowRight size={15} aria-hidden />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex gap-5">
                <button
                  type="button"
                  onClick={() => active.image && setInspect(true)}
                  className={cn("relative h-28 w-28 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10", !active.image && "cursor-default")}
                  aria-label={active.image ? `Inspect ${active.name} product image` : undefined}
                  tabIndex={active.image ? 0 : -1}
                >
                  <SampleImage material={active} sizes="112px" height={300} />
                  {active.image ? (
                    <span className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-black">
                      <Maximize2 size={11} aria-hidden />
                    </span>
                  ) : null}
                </button>
                <div className="min-w-0">
                  <p className="text-xs text-muted">{active.category}</p>
                  <h3 className="display mt-1 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02]">{active.name}</h3>
                  {active.code ? <p className="eyebrow mt-2">{active.code}{active.brand ? ` · ${active.brand}` : ""}</p> : null}
                </div>
              </div>

              <p className="mt-6 leading-relaxed">{entry.reason}</p>

              <dl className="mt-6 grid grid-cols-2 border-t hairline text-sm">
                {(
                  [
                    ["Finish", active.finish],
                    ["Size", active.size],
                    ["Thickness", active.thickness],
                    ["Designs", active.designs],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="border-b hairline py-2.5 pr-3">
                      <dt className="eyebrow text-[10px] text-muted">{k}</dt>
                      <dd className="mt-0.5">{v}</dd>
                    </div>
                  ))}
              </dl>

              <p className="eyebrow mt-6 text-muted">Used in this home</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {rooms.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => showRoom(r.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-current/25 px-3 py-1.5 text-sm hover:bg-ink hover:text-bg"
                    >
                      {r.name}
                      <span className="text-muted">· {surfaceLabel[r.uses.find((u) => u.material === activeId)!.surface]}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted">
                {active.verification === "verified" ? (
                  <>
                    <BadgeCheck size={15} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden />
                    <span>
                      Verified on materialdepot.com, {VERIFIED_ON}
                      {active.listedUses ? `. Listed for: ${active.listedUses.join(", ")}.` : "."}
                      {active.note ? ` ${active.note}` : ""}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} className="mt-0.5 shrink-0" aria-hidden />
                    <span>{active.note}</span>
                  </>
                )}
              </div>

              {active.url ? (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-bg transition-colors hover:bg-accent-ink"
                >
                  View on Material Depot <ArrowUpRight size={14} aria-hidden />
                </a>
              ) : null}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={inspect} onClose={() => setInspect(false)} label={`${active.name} product image`} tone="dark">
        <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 py-20">
          <p className="eyebrow text-[#b6a597]">
            {active.code} {active.name} · Material Depot product image
          </p>
          {productImage(active, 1600) ? (
            <div className="relative aspect-square w-full max-w-[min(90vw,80svh)]">
              <Image src={productImage(active, 1600)!} alt={`${active.name} product image`} fill unoptimized sizes="90vw" className="object-contain" />
            </div>
          ) : null}
        </div>
      </Dialog>
    </section>
  );
}
