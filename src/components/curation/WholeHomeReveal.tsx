"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { Story } from "@/data/stories";
import { getMaterial } from "@/data/materials";
import type { Room } from "@/data/homes";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { SampleImage } from "@/components/curation/SampleImage";
import { useReducedMotionSafe } from "@/components/motion/hooks";

function Panel({ room, i, p, reduced }: { room: Room; i: number; p: MotionValue<number>; reduced: boolean }) {
  const off = i - 1;
  const x = useTransform(p, [0, 0.55], reduced ? ["0%", "0%"] : [`${off * 22}%`, "0%"]);
  const y = useTransform(p, [0, 0.55], reduced ? ["0%", "0%"] : [`${Math.abs(off) * 14 + 6}%`, "0%"]);
  const rotate = useTransform(p, [0, 0.55], reduced ? [0, 0] : [off * 7, 0]);
  const scale = useTransform(p, [0, 0.55], reduced ? [1, 1] : [0.82, 1]);
  return (
    <motion.div className="relative h-full flex-1 overflow-hidden" style={{ x, y, rotate, scale, zIndex: 3 - Math.abs(off) }}>
      <Image src={room.image.src} alt={room.image.alt} fill sizes="34vw" className="object-cover" />
      <span className="eyebrow absolute bottom-3 left-3 bg-black/45 px-2 py-1 text-white">{room.name}</span>
    </motion.div>
  );
}

/** Whole-home reveal — three rooms close into one composition above the material family. */
export function WholeHomeReveal({ story }: { story: Story }) {
  const { home } = useHomeSelection();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const strip = useTransform(scrollYProgress, [0.5, 0.8], reduced ? [1, 1] : [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.55, 0.9], reduced ? [1, 1] : [0, 1]);
  const count = home.materials.length;

  const caption = (
    <p className="display text-center text-[clamp(1.8rem,3.6vw,3.2rem)] leading-tight">
      One home. {count} materials. <em>One language.</em>
    </p>
  );

  return (
    <section aria-label={`${home.name}: the whole home at a glance`}>
      <div ref={ref} className="relative hidden h-[220vh] md:block">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-8 overflow-hidden px-[var(--gutter)] pt-[var(--header-h)]">
          {caption}
          <div className="mx-auto flex h-[46svh] w-full max-w-6xl gap-2">
            {home.rooms.map((r, i) => (
              <Panel key={r.id} room={r} i={i} p={scrollYProgress} reduced={reduced} />
            ))}
          </div>
          <motion.div className="mx-auto w-full max-w-6xl" style={{ opacity: strip }}>
            <motion.span className="mb-3 block h-px origin-left bg-current/30" style={{ scaleX: lineScale }} />
            <div className="flex h-16 gap-2">
              {home.materials.map((c) => {
                const m = getMaterial(c.material);
                return (
                  <div key={c.material} className="relative flex-1 overflow-hidden rounded-[2px]">
                    <SampleImage material={m} sizes="16vw" height={240} />
                    <span className="absolute bottom-1 left-1 bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-black">{m.code ?? "Concept"}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-center text-xs text-muted">{home.mood}</p>
          </motion.div>
        </div>
      </div>

      {/* Mobile: the same composition, without pinning */}
      <div className="gutter py-[10vh] md:hidden">
        {caption}
        <div className="mt-8 grid grid-cols-3 gap-1.5">
          {home.rooms.map((r) => (
            <div key={r.id} className="relative aspect-[3/4] overflow-hidden">
              <Image src={r.image.src} alt={r.image.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-12 gap-1.5">
          {home.materials.map((c) => (
            <div key={c.material} className="relative flex-1 overflow-hidden rounded-[2px]">
              <SampleImage material={getMaterial(c.material)} sizes="15vw" height={160} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted">{home.mood}</p>
      </div>
      <span className="sr-only">{story.title}</span>
    </section>
  );
}
