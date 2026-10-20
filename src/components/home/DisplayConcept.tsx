"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { signatureColor, stories, type Story } from "@/data/stories";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { ease } from "@/lib/motion";

/**
 * A 1:2 re-composition of a board for a 4 × 8 ft surface. Built from the same
 * assets, re-laid out rather than stretched from the 2:3 page.
 */
function DisplayPanel({ story }: { story: Story }) {
  const dark = story.theme.scheme === "dark";
  return (
    <div
      className="@container relative flex aspect-[1/2] w-full flex-col overflow-hidden shadow-[0_30px_50px_-30px_rgba(0,0,0,0.45)]"
      style={{ background: dark ? story.theme.bg : "#ffffff", color: dark ? story.theme.ink : "#151515" }}
    >
      <div className="flex justify-end gap-[2cqw] px-[6cqw]">
        {story.palette.map((p) => (
          <span key={p.hex} className="block h-[14cqw] w-[6cqw]" style={{ background: p.hex }} />
        ))}
      </div>
      <div className="px-[6cqw] pt-[4cqw]">
        <p className="font-semibold uppercase leading-none tracking-tight" style={{ fontSize: "8.5cqw" }}>
          <span style={{ color: signatureColor(story) }}>{story.number}</span> — {story.title}
        </p>
        <p className="mt-[2cqw] italic opacity-70" style={{ fontSize: "4cqw" }}>
          {story.subtitle}
        </p>
      </div>
      <div className="relative mx-[6cqw] mt-[5cqw] h-[38%]">
        <Image src={story.images.hero.src} alt="" fill sizes="240px" className="object-cover" />
      </div>
      <div className="mx-[6cqw] mt-[3cqw] grid h-[26%] grid-cols-2 gap-[3cqw]">
        <div className="relative bg-black/5">
          <Image src={story.images.tile.src} alt="" fill sizes="120px" className="object-cover" />
          <span className="absolute bottom-[2cqw] left-[2cqw] bg-white/90 px-[2cqw] py-[1cqw] font-semibold uppercase text-black" style={{ fontSize: "3cqw" }}>
            Sample
          </span>
        </div>
        <div className="relative">
          <Image src={story.images.moodboard.src} alt="" fill sizes="120px" className="object-cover" />
        </div>
      </div>
      <div className="relative mx-[6cqw] mt-[3cqw] h-[9%]">
        <Image src={story.images.detail.src} alt="" fill sizes="240px" className="object-cover" />
      </div>
      <p className="mt-auto px-[6cqw] pb-[5cqw] font-semibold uppercase tracking-wider opacity-70" style={{ fontSize: "3.2cqw" }}>
        {story.product.code} · {story.product.size}
      </p>
    </div>
  );
}

function Person() {
  // A 5′6″ figure drawn to the same scale as an 8 ft panel (66/96 ≈ 69% height).
  return (
    <svg viewBox="0 0 40 132" className="h-[69%] w-auto self-end text-ink/50" fill="currentColor" aria-hidden>
      <circle cx="20" cy="10" r="8" />
      <path d="M8 24h24l5 44h-7l-3-30v94h-8V84h-2v48h-8V38l-3 30H3z" />
    </svg>
  );
}

/** Scene 05 — the 4 × 8 ft showroom display, proposed. */
export function DisplayConcept() {
  const reduced = useReducedMotionSafe();
  const rail = useRef<HTMLDivElement>(null);
  const scrollRail = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <section id="display" className="scroll-mt-16 overflow-hidden border-t hairline py-[14vh]" aria-labelledby="display-heading">
      <div className="gutter grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-muted">The physical display concept</p>
          <AnimatedHeadline id="display-heading" text="Designed to Be Seen. Created to Be Remembered." className="display text-title mt-4" />
        </div>
        <Reveal className="space-y-4 self-end leading-relaxed text-muted lg:col-span-5">
          <p>
            The original brief called for a <strong className="font-semibold text-ink">4 ft × 8 ft showroom display</strong>. These stories were
            designed to work at that distance.
          </p>
          <p>
            Colour coding makes each collection recognisable from across the floor. A consistent editorial system lets customers scan several
            displays quickly. Large application visuals communicate the mood, while samples and complementary materials explain what creates it.
          </p>
        </Reveal>
      </div>

      {/* Showroom elevation */}
      <div className="relative mt-16">
        <div
          ref={rail}
          className="gutter flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] md:grid md:snap-none md:grid-cols-[repeat(5,minmax(0,1fr))_auto] md:items-end md:gap-6 md:overflow-visible lg:gap-8"
          aria-label="Proposed showroom wall with five display panels"
          role="region"
          tabIndex={0}
        >
          {stories.map((s, i) => (
            <motion.figure
              key={s.slug}
              className="w-[44vw] max-w-[220px] shrink-0 snap-center md:w-auto md:max-w-none"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={reduced ? instant : { duration: 1.1, ease: ease.expo, delay: i * 0.1 }}
            >
              <div className="relative">
                {i === 0 ? (
                  <>
                    <span className="eyebrow absolute -top-7 left-0 right-0 flex items-center gap-2 text-muted" aria-hidden>
                      <span className="h-px flex-1 bg-current" />4 ft<span className="h-px flex-1 bg-current" />
                    </span>
                    <span
                      className="eyebrow absolute -left-6 bottom-0 top-0 flex flex-col items-center gap-2 text-muted [writing-mode:vertical-rl]"
                      aria-hidden
                    >
                      <span className="w-px flex-1 bg-current" />
                      8 ft
                      <span className="w-px flex-1 bg-current" />
                    </span>
                  </>
                ) : null}
                <DisplayPanel story={s} />
              </div>
              <figcaption className="eyebrow mt-3 text-muted">
                {s.number} {s.title}
              </figcaption>
            </motion.figure>
          ))}
          <div className="hidden h-full items-end pb-7 md:flex">
            <Person />
          </div>
        </div>
        <div className="gutter mt-2 flex items-center justify-between md:hidden">
          <span className="eyebrow text-muted">Swipe the wall</span>
          <span className="flex gap-2">
            <button type="button" aria-label="Scroll panels left" onClick={() => scrollRail(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-current/25">
              <ArrowLeft size={16} aria-hidden />
            </button>
            <button type="button" aria-label="Scroll panels right" onClick={() => scrollRail(1)} className="grid h-11 w-11 place-items-center rounded-full border border-current/25">
              <ArrowRight size={16} aria-hidden />
            </button>
          </span>
        </div>
        <div className="gutter mt-4" aria-hidden>
          <div className="h-px bg-line" />
        </div>
      </div>

      <div className="gutter mt-12 grid gap-8 md:grid-cols-3">
        <Reveal className="border-t hairline pt-5">
          <p className="eyebrow text-accent-ink">Proposed physical installation</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A conceptual elevation, not production-ready artwork. Each panel is re-composed for the display rather than enlarged from the web or
            print page.
          </p>
        </Reveal>
        <Reveal className="border-t hairline pt-5" delay={0.08}>
          <p className="eyebrow">2 : 3 page → 1 : 2 surface</p>
          <div className="mt-4 flex items-end gap-6" aria-hidden>
            <div className="flex flex-col items-center gap-2">
              <span className="block h-[72px] w-12 border border-current/50" />
              <span className="text-[10px] text-muted">1200 × 1800 px</span>
            </div>
            <ArrowRight size={14} className="mb-8 text-muted" />
            <div className="flex flex-col items-center gap-2">
              <span className="block h-24 w-12 border border-current/50 bg-current/5" />
              <span className="text-[10px] text-muted">4 × 8 ft</span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The supplied editorial pages are 2:3. The display surface is 1:2, so the layout is rebalanced and never stretched.
          </p>
        </Reveal>
        <Reveal className="border-t hairline pt-5" delay={0.16}>
          <p className="eyebrow">Display ≠ tile size</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The 4 × 8 ft panel is a mounting surface. The products themselves range from 300 × 100 mm kitkat tiles to 1200 × 600 mm slabs, and real
            samples would be fixed to the panel at their true size.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
