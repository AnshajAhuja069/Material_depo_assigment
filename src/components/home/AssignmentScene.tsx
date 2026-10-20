"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { signatureColor, stories, type Story } from "@/data/stories";
import { getHome } from "@/data/homes";
import { getMaterial } from "@/data/materials";
import { SampleImage } from "@/components/curation/SampleImage";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/hooks";

/** A home as a card: its hero room above the material family that builds it. */
function HomeCard({ story }: { story: Story }) {
  const home = getHome(story.slug);
  return (
    <div className="flex h-full flex-col bg-white p-[5%] text-[#151515]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: signatureColor(story) }}>
          {story.number}
        </span>
        <span className="flex gap-[3px]">
          {story.palette.map((p) => (
            <span key={p.hex} className="block h-3 w-1.5" style={{ background: p.hex }} />
          ))}
        </span>
      </div>
      <p className="mt-1 text-[clamp(11px,1vw,15px)] font-semibold uppercase leading-tight tracking-tight">{story.title}</p>
      <p className="text-[10px] italic opacity-60">{home.name}</p>
      <div className="relative mt-2 flex-[1.3] overflow-hidden">
        <Image src={home.heroImage.src} alt="" fill sizes="20vw" className="object-cover" />
      </div>
      <div className="mt-[3%] grid flex-1 grid-cols-3 gap-[3%]">
        {home.materials.slice(0, 6).map((c) => (
          <div key={c.material} className="relative overflow-hidden">
            <SampleImage material={getMaterial(c.material)} sizes="7vw" height={160} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FanCard({ story, i, progress, reduced }: { story: Story; i: number; progress: MotionValue<number>; reduced: boolean }) {
  const offset = i - 2;
  const x = useTransform(progress, [0.05, 0.65], reduced ? [`${offset * 15}vw`, `${offset * 15}vw`] : [`${offset * 1.2}vw`, `${offset * 15}vw`]);
  const rotate = useTransform(progress, [0.05, 0.65], reduced ? [offset * 3, offset * 3] : [offset * 1.5, offset * 3]);
  const y = useTransform(progress, [0.05, 0.65], reduced ? [Math.abs(offset) * 14, Math.abs(offset) * 14] : [0, Math.abs(offset) * 14]);
  const opacity = useTransform(progress, [0, 0.12], reduced ? [1, 1] : [0, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-0 h-full -translate-x-1/2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
      style={{ x, rotate, y, opacity, aspectRatio: "2/3", zIndex: 5 - Math.abs(offset) }}
    >
      <HomeCard story={story} />
    </motion.div>
  );
}

/** Scene 02 — the design objective: a home is a relationship between materials. */
export function AssignmentScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const copy = (
    <>
      <p className="eyebrow text-muted">The design objective</p>
      <AnimatedHeadline text="More Than a Material. A Way of Living." className="display text-title mt-4" />
      <Reveal delay={0.15}>
        <p className="text-lede mt-6 max-w-xl">
          A home is not defined by a single surface. It is the relationship between flooring, wall treatments, cabinetry, textures and accents
          that creates a recognisable design language.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Material Stories explores five distinct interior identities. Each one is developed through a coordinated selection of materials and
          shown across multiple rooms of one home.
        </p>
      </Reveal>
    </>
  );

  return (
    <section id="about" className="scroll-mt-16">
      {/* Desktop — pinned fan of five homes */}
      <div ref={ref} className="relative hidden h-[240vh] md:block">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[calc(var(--header-h)+3vh)]">
          <div className="gutter grid grid-cols-12 gap-8">
            <div className="col-span-7">{copy}</div>
            <p className="col-span-4 col-start-9 self-end text-sm leading-relaxed text-muted">
              Five homes, {stories.reduce((n, s) => n + getHome(s.slug).materials.length, 0)} curated materials and 15 rooms. Scroll to spread the
              collection.
            </p>
          </div>
          <div className="relative mx-auto mt-[4vh] h-[min(44svh,calc(100svh-28rem))] w-full">
            {stories.map((s, i) => (
              <FanCard key={s.slug} story={s} i={i} progress={scrollYProgress} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — natural reading */}
      <div className="gutter py-[12vh] md:hidden">
        {copy}
        <div className="mt-12 grid grid-cols-2 gap-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className={i === 4 ? "col-span-2 mx-auto w-1/2" : undefined}>
              <div className="aspect-[2/3] shadow-lg">
                <HomeCard story={s} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
