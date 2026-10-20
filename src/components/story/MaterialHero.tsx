"use client";

import { motion } from "motion/react";
import type { Story } from "@/data/stories";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { RevealImage } from "@/components/motion/RevealImage";
import { PaletteBars } from "@/components/story/PaletteBars";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { getHome } from "@/data/homes";
import { getMaterial } from "@/data/materials";
import { SampleImage } from "@/components/curation/SampleImage";

function Eyebrow({ story }: { story: Story }) {
  return (
    <p className="eyebrow text-muted">
      Material Stories / {story.number}—05 · {getHome(story.slug).name}
    </p>
  );
}

function Subtitle({ story, className, delay = 0.7 }: { story: Story; className?: string; delay?: number }) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.p
      className={cn("display text-[clamp(1.35rem,2.4vw,2.1rem)] italic text-muted", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? instant : { duration: 1, delay }}
    >
      {story.subtitle}
    </motion.p>
  );
}

/** The home at a glance: its material family, counted. */
function HomeMeta({ story, className, delay = 0.9 }: { story: Story; className?: string; delay?: number }) {
  const reduced = useReducedMotionSafe();
  const home = getHome(story.slug);
  return (
    <motion.div
      className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? instant : { duration: 0.9, delay }}
    >
      <span className="flex -space-x-2" aria-hidden>
        {home.materials.map((c) => (
          <span key={c.material} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-bg">
            <SampleImage material={getMaterial(c.material)} sizes="36px" height={100} />
          </span>
        ))}
      </span>
      <span className="text-sm">
        <strong className="font-semibold">{home.materials.length} curated materials · {home.rooms.length} rooms</strong>
        <span className="block text-xs text-muted">{home.mood}</span>
      </span>
    </motion.div>
  );
}

function Title({ story, stacked, className }: { story: Story; stacked?: boolean; className?: string }) {
  const t = motionTokens[story.motion];
  const text = stacked ? story.title.replace(" ", "\n") : story.title;
  return (
    <h1 className={cn("display", className)}>
      <span className="sr-only">
        {story.number} — {story.title}
      </span>
      <span aria-hidden className="block">
        <AnimatedHeadline
          as="span"
          text={story.number}
          immediate
          className="mb-[0.08em] block text-[0.42em] italic text-accent-ink"
          ease={t.ease}
          duration={t.duration * 0.8}
        />
        <AnimatedHeadline
          as="span"
          text={text}
          split={stacked ? "line" : "word"}
          immediate
          className="block"
          ease={t.ease}
          duration={t.duration * 0.8}
          delay={0.12}
          stagger={t.stagger}
        />
      </span>
    </h1>
  );
}

function ScrollCue({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-muted", className)} aria-hidden>
      <span className="relative block h-10 w-px overflow-hidden bg-line">
        <span className="animate-cue absolute inset-0 bg-ink" />
      </span>
      <span className="eyebrow">Scroll to enter</span>
    </div>
  );
}

/** Five hero compositions — one per story — sharing the same parts. */
export function MaterialHero({ story }: { story: Story }) {
  const { heroLayout: layout, motion: style } = story;
  const heroImage = getHome(story.slug).heroImage;

  if (layout === "wide") {
    return (
      <section className="gutter relative pt-[calc(var(--header-h)+4vh)]" aria-labelledby="story-title">
        <div className="flex items-start justify-between gap-6">
          <div id="story-title">
            <Eyebrow story={story} />
            <Title story={story} className="text-hero mt-6" />
            <Subtitle story={story} className="mt-4" />
            <HomeMeta story={story} className="mt-6" />
          </div>
          <PaletteBars palette={story.palette} className="hidden md:flex" />
        </div>
        <RevealImage
          image={heroImage}
          style={style}
          priority
          sizes="(min-width: 1440px) 1400px, 100vw"
          frameClassName="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]"
          className="mt-10"
          parallax={1.2}
          capWidth={false}
        />
        <ScrollCue className="mt-6" />
      </section>
    );
  }

  if (layout === "framed") {
    return (
      <section className="gutter relative flex flex-col items-center pb-10 pt-[calc(var(--header-h)+5vh)] text-center" aria-labelledby="story-title">
        <Eyebrow story={story} />
        <div className="relative mt-10 w-full max-w-[min(830px,calc((100svh-17rem)*1.29))]">
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-3 border border-accent/60 sm:-inset-5"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: motionTokens.cinematic.ease, delay: 0.8 }}
          />
          <RevealImage image={heroImage} style={style} priority sizes="(min-width: 900px) 830px, 100vw" drift parallax={0.4} />
        </div>
        <div id="story-title" className="relative z-10 -mt-[0.6em] text-hero" style={{ textShadow: "0 8px 40px rgba(0,0,0,0.55)" }}>
          <Title story={story} stacked className="leading-[0.86]" />
        </div>
        <Subtitle story={story} className="mt-6" delay={1.1} />
        <HomeMeta story={story} className="mt-6 justify-center" delay={1.25} />
        <PaletteBars palette={story.palette} className="mt-10" delay={1.2} />
        <ScrollCue className="mt-10" />
      </section>
    );
  }

  // Split compositions: Nordic (image right), Casa (arched, right), Botanical (leaf, left).
  const imageFirst = layout === "leaf";
  const mask = layout === "arch" ? "arch" : layout === "leaf" ? "leaf" : "none";

  return (
    <section
      className="gutter relative grid items-end gap-10 pb-10 pt-[calc(var(--header-h)+4vh)] lg:min-h-[100svh] lg:grid-cols-12 lg:gap-12"
      aria-labelledby="story-title"
    >
      <div id="story-title" className={cn("lg:col-span-5 lg:pb-16", imageFirst && "lg:order-2")}>
        <PaletteBars palette={story.palette} className="mb-10 lg:mb-16" />
        <Eyebrow story={story} />
        <Title story={story} stacked className="text-title mt-6" />
        <Subtitle story={story} className="mt-5" />
        <HomeMeta story={story} className="mt-6" />
        <ScrollCue className="mt-10 hidden lg:flex" />
      </div>
      <div className={cn("lg:col-span-7", imageFirst && "lg:order-1", layout === "arch" && "lg:pl-8")}>
        <RevealImage
          image={heroImage}
          style={style}
          priority
          mask={mask}
          sizes="(min-width: 1024px) 58vw, 100vw"
          parallax={0.8}
          className={cn(layout !== "split" && "mx-auto")}
          frameClassName={layout === "split" ? "aspect-[4/5] sm:aspect-[4/3]" : undefined}
        />
      </div>
    </section>
  );
}
