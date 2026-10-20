"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { stories } from "@/data/stories";
import { getHome } from "@/data/homes";
import { getMaterial, surfaceLabel } from "@/data/materials";
import { SampleImage } from "@/components/curation/SampleImage";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const example = stories[1];
const home = getHome(example.slug);
const anchor = getMaterial(home.materials[0].material);

/* ——— Step visuals, all generated from the Nordic home's real data ——— */
function Discover() {
  return (
    <div className="relative h-full w-full bg-white">
      <SampleImage material={anchor} sizes="45vw" height={900} />
      <span className="absolute bottom-4 left-4 bg-white px-3 py-2 text-xs">
        <b>{anchor.code}</b> {anchor.name} · {anchor.size} · {anchor.finish}
      </span>
    </div>
  );
}
function Curate() {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-2 bg-white p-6">
      {home.materials.map((c) => {
        const m = getMaterial(c.material);
        return (
          <div key={c.material} className="flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <SampleImage material={m} sizes="15vw" height={400} />
            </div>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-black">{m.code}</p>
            <p className="text-[10px] text-black/60">{surfaceLabel[c.role]}</p>
          </div>
        );
      })}
    </div>
  );
}
function Coordinate() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 bg-white p-6 text-black">
      {home.rooms.map((r) => (
        <div key={r.id} className="flex items-center gap-3">
          <span className="w-24 text-sm font-semibold">{r.name}</span>
          <div className="flex flex-1 gap-1.5">
            {r.uses.map((u) => (
              <div key={u.material} className="relative h-16 flex-1 overflow-hidden" title={surfaceLabel[u.surface]}>
                <SampleImage material={getMaterial(u.material)} sizes="8vw" height={200} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="mt-2 text-xs text-black/60">Same floor everywhere; sage in two rooms; fluted wood in two.</p>
    </div>
  );
}
function Visualize() {
  const r = home.rooms[2];
  return <Image src={r.image.src} alt={r.image.alt} fill sizes="45vw" className="object-cover" />;
}
function Present() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 bg-white p-4">
      <div className="flex flex-[2] gap-1.5">
        {home.rooms.map((r) => (
          <div key={r.id} className="relative flex-1 overflow-hidden">
            <Image src={r.image.src} alt="" fill sizes="15vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 gap-1.5">
        {home.materials.map((c) => (
          <div key={c.material} className="relative flex-1 overflow-hidden">
            <SampleImage material={getMaterial(c.material)} sizes="8vw" height={200} />
          </div>
        ))}
      </div>
    </div>
  );
}

const steps: Array<{ n: string; title: string; text: string; visual: () => ReactNode; note: string }> = [
  { n: "01", title: "Discover", text: "Find relevant materials in the catalogue: floor and wall tiles, laminates, flutes and quartz, verified for size, finish and listed use.", visual: Discover, note: "An anchor surface: the floor" },
  { n: "02", title: "Curate", text: "Edit them into one cohesive family across categories, with shared undertones and contrasting textures.", visual: Curate, note: `${home.materials.length} materials, 5 categories` },
  { n: "03", title: "Coordinate", text: "Decide where each finish goes, and where it doesn't, room by room through the home.", visual: Coordinate, note: "Room-by-room application" },
  { n: "04", title: "Visualize", text: "Show each combination in a distinct room, so the language is understood in context.", visual: Visualize, note: "The bedroom, at a whisper" },
  { n: "05", title: "Present", text: "Compose the result as a physical and digital moodboard customers can read in seconds.", visual: Present, note: "One home, one board" },
];

function Step({ step, index, onActive }: { step: (typeof steps)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  const V = step.visual;

  return (
    <li ref={ref} className="border-t hairline py-10 md:flex md:min-h-[58svh] md:flex-col md:justify-center md:py-0">
      <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-surface md:hidden">
        <V />
      </div>
      <p className="eyebrow tabular-nums text-muted">{step.n} /</p>
      <h3 className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">{step.title}</h3>
      <p className="text-lede mt-4 max-w-md text-muted">{step.text}</p>
      <p className="eyebrow mt-6 text-muted">
        Example — {example.number} {example.title} · {step.note}
      </p>
    </li>
  );
}

/** Scene 04 — the method: Discover → Curate → Coordinate → Visualize → Present. */
export function ApproachSteps() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const V = current.visual;

  return (
    <section id="process" className="gutter scroll-mt-16 py-[14vh]" aria-labelledby="approach-heading">
      <p className="eyebrow text-muted">The method</p>
      <AnimatedHeadline id="approach-heading" text="Discover. Curate. Coordinate. Visualize. Present." className="display text-title mt-4 max-w-5xl" />

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <div className="hidden md:col-span-6 md:block">
          <div className="sticky top-[calc(var(--header-h)+4vh)]">
            <div className="relative aspect-[4/5] max-h-[76svh] overflow-hidden bg-surface">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.n}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: ease.inOut }}
                >
                  <V />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.n} className={cn("h-px flex-1 transition-colors duration-500", i <= active ? "bg-ink" : "bg-line")} />
              ))}
            </div>
            <p className="mt-3 text-[11px] tracking-wide text-muted">
              {current.n} {current.title} · built from the {home.name.toLowerCase()} data
            </p>
          </div>
        </div>
        <ol className="md:col-span-5 md:col-start-8">
          {steps.map((s, i) => (
            <Step key={s.n} step={s} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}
