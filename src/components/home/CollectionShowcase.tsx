"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { signatureColor, stories, type Story } from "@/data/stories";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { usePageTransition } from "@/components/motion/PageTransition";
import { useReducedMotionSafe } from "@/components/motion/hooks";
import { applyTheme, themeVars } from "@/lib/theme";

const cssVarsOnly = (vars: Record<string, string>) => Object.fromEntries(Object.entries(vars).filter(([k]) => k.startsWith("--")));

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function Panel({
  story,
  i,
  progress,
  stacked,
}: {
  story: Story;
  i: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const go = usePageTransition();
  const n = stories.length;
  // As later panels slide over, earlier ones recede: a layered stack of sample boards.
  const scale = useTransform(progress, [i / (n - 1), 1], stacked && i < n - 1 ? [1, 1 - (n - 1 - i) * 0.035] : [1, 1]);
  const dim = useTransform(progress, [i / (n - 1), Math.min(1, (i + 1) / (n - 1))], stacked && i < n - 1 ? [0, 0.35] : [0, 0]);
  const imgY = useTransform(progress, [(i - 1) / (n - 1), (i + 1) / (n - 1)], stacked ? ["-6%", "6%"] : ["0%", "0%"]);
  const href = `/stories/${story.slug}`;

  const enter = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go({ href, theme: story.theme, eyebrow: `Story ${story.number} / 05`, title: story.title, palette: story.palette.map((p) => p.hex) });
  };

  return (
    <div className="md:sticky md:top-0 md:h-[100svh]">
      <motion.article
        className="relative flex h-full origin-top flex-col overflow-hidden"
        style={{ ...(cssVarsOnly(themeVars(story.theme)) as React.CSSProperties), background: story.theme.bg, color: story.theme.ink, scale }}
        aria-labelledby={`collection-${story.slug}`}
      >
        <div className="gutter grid h-full items-center gap-8 pb-14 pt-16 md:grid-cols-12 md:gap-10 md:pb-10 md:pt-[calc(var(--header-h)+3vh)]">
          <div className="md:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <p className="display text-[clamp(3.5rem,7vw,6.5rem)] italic leading-none" style={{ color: story.theme.accentInk }}>
                {story.number}
              </p>
              <span className="flex gap-1.5" aria-hidden>
                {story.palette.map((p) => (
                  <span key={p.hex} className="h-12 w-3 md:h-16 md:w-4" style={{ background: p.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)" }} />
                ))}
              </span>
            </div>
            <h3 id={`collection-${story.slug}`} className="display mt-4 text-[clamp(2.6rem,5.6vw,5.4rem)]">
              {story.title}
            </h3>
            <p className="display mt-2 text-[clamp(1.25rem,2vw,1.7rem)] italic" style={{ color: story.theme.muted }}>
              {story.subtitle}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed [@media(max-height:760px)]:hidden" style={{ color: story.theme.muted }}>
              {story.narrative}
            </p>
            <div className="mt-8 flex items-center gap-5">
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 md:h-24 md:w-24">
                <Image src={story.images.swatch.src} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="text-xs leading-relaxed" style={{ color: story.theme.muted }}>
                <span className="eyebrow block" style={{ color: story.theme.ink }}>
                  {story.product.code}
                </span>
                {story.product.name}
                <br />
                {story.product.size} · {story.product.finish}
              </span>
            </div>
            <Link
              href={href}
              onClick={enter}
              className="group mt-8 inline-flex h-14 items-center gap-3 rounded-full px-7"
              style={{ background: story.theme.ink, color: story.theme.bg }}
            >
              <span className="eyebrow">Explore the story</span>
              <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Link
            href={href}
            onClick={enter}
            tabIndex={-1}
            aria-hidden
            className="relative block aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-auto md:h-[74svh]"
          >
            <motion.div className="absolute -inset-y-[7%] inset-x-0" style={{ y: imgY }}>
              <Image
                src={story.images.hero.src}
                alt=""
                fill
                sizes="(min-width: 768px) 56vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
              />
            </motion.div>
            <span className="eyebrow absolute bottom-3 left-3 bg-black/45 px-2 py-1 text-white">Concept visualization</span>
          </Link>
        </div>
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

/** Scene 06 — the centrepiece: five stacked worlds, the atmosphere shifting with each. */
export function CollectionShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotionSafe();
  const stacked = desktop && !reduced;
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(stories.length - 1, Math.max(0, Math.round(p * (stories.length - 1)))));
  });

  // The site chrome takes on the atmosphere of the story in view.
  useEffect(() => {
    applyTheme(document.documentElement, inView ? stories[active].theme : null);
  }, [inView, active]);
  useEffect(() => () => applyTheme(document.documentElement, null), []);

  return (
    <section id="collection" className="scroll-mt-0" aria-labelledby="collection-heading">
      <div className="gutter pb-[10vh] pt-[16vh]">
        <p className="eyebrow text-muted">The collection</p>
        <AnimatedHeadline id="collection-heading" text="Five Stories. Five Ways to Feel at Home." className="display text-title mt-4 max-w-5xl" />
        <Reveal delay={0.15}>
          <p className="text-lede mt-6 max-w-2xl text-muted">
            Each story pairs one real Material Depot tile with an emotion, a palette and a set of rooms. Scroll through the five worlds, then step
            inside one.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-hidden>
            {stories.map((s) => (
              <li key={s.slug} className="eyebrow flex items-center gap-2 text-muted">
                <span className="h-2.5 w-2.5" style={{ background: signatureColor(s) }} /> {s.number} {s.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div ref={ref} className="relative">
        {stories.map((s, i) => (
          <Panel key={s.slug} story={s} i={i} progress={scrollYProgress} stacked={stacked} />
        ))}
      </div>
    </section>
  );
}
