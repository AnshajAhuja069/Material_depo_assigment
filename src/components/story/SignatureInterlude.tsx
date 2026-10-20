"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import type { Story } from "@/data/stories";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { instant, useFinePointer, useReducedMotionSafe } from "@/components/motion/hooks";
import { kindLabel } from "@/lib/images";
import { motionTokens } from "@/lib/motion";

/* ——— 01 Tidal: the kitkat column drifts like a slow current; glaze catches a pointer-led highlight ——— */
function TidalDrift({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["-13%", "-13%"] : ["0%", "-26%"]);
  const gx = useSpring(useMotionValue(30), { stiffness: 60, damping: 20 });
  const gy = useSpring(useMotionValue(30), { stiffness: 60, damping: 20 });
  const scrollGloss = useTransform(scrollYProgress, [0, 1], [10, 90]);
  const pointerGloss = useTransform(
    [gx, gy],
    ([x, yy]) => `radial-gradient(260px circle at ${x}% ${yy}%, rgba(255,255,255,0.55), transparent 70%)`,
  );
  const sweepGloss = useTransform(
    scrollGloss,
    (s) => `linear-gradient(115deg, transparent ${s - 18}%, rgba(255,255,255,0.35) ${s}%, transparent ${s + 18}%)`,
  );
  const glossBg = fine ? pointerGloss : sweepGloss;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(((e.clientX - r.left) / r.width) * 100);
    gy.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12">
      <ChapterHeading index={3} title={story.chapters[2]} copy={story.chapterCopy.signature} className="lg:col-span-5" />
      <figure className="lg:col-span-6 lg:col-start-7">
        <div
          ref={ref}
          onPointerMove={fine ? onMove : undefined}
          className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-surface"
        >
          <motion.div className="absolute inset-x-0 top-0" style={{ y, aspectRatio: `${story.images.tile.width}/${story.images.tile.height}` }}>
            <Image src={story.images.tile.src} alt={story.images.tile.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </motion.div>
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glossBg }} />
        </div>
        <figcaption className="eyebrow mx-auto mt-3 max-w-[560px] text-muted">
          {kindLabel[story.images.tile.kind]} · {fine ? "Move across the glaze" : "Gloss shifts as you scroll"}
        </figcaption>
      </figure>
    </div>
  );
}

/* ——— 02 Nordic: six planks slide into place, measured and precise ——— */
const PLANK = { x: 100, y: 40, w: 780, h: 1540, count: 6 };

function NordicPlanks({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotionSafe();
  const tile = story.images.tile;
  const t = motionTokens.measured;
  const stripH = PLANK.h / PLANK.count;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12">
      <figure className="order-2 lg:order-1 lg:col-span-6">
        <div ref={ref} className="mx-auto flex w-full max-w-[min(400px,calc((100svh-12rem)*0.5))] flex-col gap-[3px]" role="img" aria-label={tile.alt}>
          {Array.from({ length: PLANK.count }, (_, k) => {
            const inner: CSSProperties = {
              width: `${(tile.width / PLANK.w) * 100}%`,
              aspectRatio: `${tile.width}/${tile.height}`,
              transform: `translate(${(-PLANK.x / tile.width) * 100}%, ${(-(PLANK.y + k * stripH) / tile.height) * 100}%)`,
            };
            return (
              <motion.div
                key={k}
                className="relative overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                style={{ aspectRatio: `${PLANK.w}/${stripH}` }}
                initial={{ x: k % 2 ? "70%" : "-70%", opacity: 0 }}
                animate={inView || reduced ? { x: "0%", opacity: 1 } : undefined}
                transition={reduced ? instant : { duration: t.duration, ease: t.ease, delay: k * 0.11 }}
              >
                <div className="absolute left-0 top-0" style={inner}>
                  <Image src={tile.src} alt="" fill sizes="(min-width: 1024px) 640px, 120vw" className="object-cover" />
                </div>
              </motion.div>
            );
          })}
        </div>
        <figcaption className="eyebrow mx-auto mt-4 max-w-[400px] text-muted">
          {kindLabel[tile.kind]} · {story.product.size} planks, {story.product.designs}
        </figcaption>
      </figure>
      <ChapterHeading index={3} title={story.chapters[2]} copy={story.chapterCopy.signature} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8" />
    </div>
  );
}

/* ——— 03 Casa: fifteen tiles assemble into one lattice ——— */
const GRID = { x: 205, y: 70, cw: 236.7, ch: 239, cols: 3, rows: 5 };

function CasaPattern({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotionSafe();
  const tile = story.images.tile;
  const t = motionTokens.geometric;
  const show = inView || reduced;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12">
      <ChapterHeading index={3} title={story.chapters[2]} copy={story.chapterCopy.signature} className="lg:col-span-5" />
      <figure className="lg:col-span-6 lg:col-start-7">
        <motion.div
          ref={ref}
          role="img"
          aria-label={tile.alt}
          className="mx-auto grid w-full max-w-[min(420px,calc((100svh-10rem)*0.6))] grid-cols-3"
          initial={{ gap: "18px" }}
          animate={show ? { gap: "3px" } : undefined}
          transition={reduced ? instant : { duration: 1.2, ease: t.ease, delay: 1.1 }}
        >
          {Array.from({ length: GRID.cols * GRID.rows }, (_, i) => {
            const c = i % GRID.cols;
            const r = Math.floor(i / GRID.cols);
            const inner: CSSProperties = {
              width: `${(tile.width / GRID.cw) * 100}%`,
              aspectRatio: `${tile.width}/${tile.height}`,
              transform: `translate(${(-(GRID.x + c * GRID.cw) / tile.width) * 100}%, ${(-(GRID.y + r * GRID.ch) / tile.height) * 100}%)`,
            };
            return (
              <motion.div
                key={i}
                className="relative overflow-hidden"
                style={{ aspectRatio: `${GRID.cw}/${GRID.ch}` }}
                initial={{ opacity: 0, scale: 0.55, rotate: (c - 1) * 6 }}
                animate={show ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                transition={reduced ? instant : { duration: 0.7, ease: t.ease, delay: (r + c) * 0.09 }}
              >
                <div className="absolute left-0 top-0" style={inner}>
                  <Image src={tile.src} alt="" fill sizes="(min-width: 1024px) 700px, 160vw" className="object-cover" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <figcaption className="eyebrow mx-auto mt-4 max-w-[460px] text-muted">
          {kindLabel[tile.kind]} · {story.product.size}, pattern variation expected
        </figcaption>
      </figure>
    </div>
  );
}

/* ——— 04 Monaco: gold veins draw across the dark as you descend ——— */
const VEINS = [
  "M-20 120 C 140 90, 220 210, 360 180 S 560 60, 700 140 S 920 260, 1020 210",
  "M-20 420 C 120 380, 260 460, 380 400 S 520 300, 640 360 S 860 520, 1020 470",
  "M180 -20 C 200 80, 150 160, 240 250 S 300 420, 260 620",
  "M760 -20 C 740 90, 820 160, 790 260 S 700 420, 760 620",
  "M420 620 C 470 540, 560 520, 600 450 S 700 380, 760 300",
];

function MonacoVeins({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.1, 0.6], reduced ? [1, 1] : [0, 1]);
  const zoom = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.18, 1]);
  const tile = story.images.tile;

  return (
    <div ref={ref} className="relative py-[6vh]">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {VEINS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--accent)"
            strokeWidth={i < 2 ? 1.2 : 0.7}
            strokeOpacity={i < 2 ? 0.75 : 0.45}
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: draw }}
          />
        ))}
      </svg>
      <div className="relative grid items-center gap-12 lg:grid-cols-12">
        <ChapterHeading index={3} title={story.chapters[2]} copy={story.chapterCopy.signature} className="lg:col-span-6" size="title" />
        <figure className="lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto w-full max-w-[400px] overflow-hidden" style={{ aspectRatio: `${tile.width}/${tile.height}` }}>
            <motion.div className="absolute inset-0" style={{ scale: zoom }}>
              <Image src={tile.src} alt={tile.alt} fill sizes="400px" className="object-cover" />
            </motion.div>
          </div>
          <figcaption className="eyebrow mx-auto mt-4 max-w-[400px] text-muted">
            {kindLabel[tile.kind]} · {story.product.size}, {story.product.finish.toLowerCase()}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

/* ——— 05 Botanical: the panel unfurls from a leaf-shaped opening; foliage layers drift ——— */
function BotanicalLeaf({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const radius = useTransform(scrollYProgress, [0, 1], reduced ? ["0% 50% 0% 50%", "0% 50% 0% 50%"] : ["50% 50% 50% 50%", "0% 50% 0% 50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.72, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-10, 0]);
  const back = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [80, -30]);
  const front = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);
  const tile = story.images.tile;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12">
      <figure className="order-2 lg:order-1 lg:col-span-6">
        <div ref={ref} className="relative mx-auto w-full max-w-[390px]">
          <motion.span
            aria-hidden
            className="absolute -left-[18%] top-[8%] h-[46%] w-[58%]"
            style={{ y: back, background: story.palette[2].hex, borderRadius: "0 70% 0 70%" }}
          />
          <motion.span
            aria-hidden
            className="absolute -right-[14%] bottom-[4%] h-[34%] w-[44%]"
            style={{ y: front, background: story.palette[1].hex, borderRadius: "70% 0 70% 0", opacity: 0.85 }}
          />
          <motion.div
            className="relative overflow-hidden"
            style={{ aspectRatio: `${tile.width}/${tile.height}`, borderRadius: radius, scale, rotate }}
          >
            <Image src={tile.src} alt={tile.alt} fill sizes="390px" className="object-cover" />
          </motion.div>
        </div>
        <figcaption className="eyebrow mx-auto mt-6 max-w-[390px] text-muted">
          {kindLabel[tile.kind]} · {story.product.size}, {story.product.designs}
        </figcaption>
      </figure>
      <ChapterHeading index={3} title={story.chapters[2]} copy={story.chapterCopy.signature} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8" />
    </div>
  );
}

/** Chapter 03 — the story's signature material moment. */
export function SignatureInterlude({ story }: { story: Story }) {
  const Variant = {
    fluid: TidalDrift,
    measured: NordicPlanks,
    geometric: CasaPattern,
    cinematic: MonacoVeins,
    organic: BotanicalLeaf,
  }[story.motion];

  return (
    <section id="chapter-3" className="gutter scroll-mt-24 overflow-hidden py-[14vh]">
      <Variant story={story} />
    </section>
  );
}
