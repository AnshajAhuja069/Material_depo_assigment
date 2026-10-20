"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { stories, type Story } from "@/data/stories";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { useReducedMotionSafe } from "@/components/motion/hooks";

function FanBoard({ story, i, progress, reduced }: { story: Story; i: number; progress: MotionValue<number>; reduced: boolean }) {
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
      <Image src={story.images.board.src} alt={story.images.board.alt} fill sizes="22vw" className="object-cover" />
    </motion.div>
  );
}

/** Scene 02 — the brief, with the five finished boards fanning out as you scroll. */
export function AssignmentScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const copy = (
    <>
      <p className="eyebrow text-muted">The assignment</p>
      <AnimatedHeadline text="Beyond the Surface" className="display text-title mt-4" />
      <Reveal delay={0.15}>
        <p className="text-lede mt-6 max-w-xl">The challenge was simple: transform a tile display into an experience.</p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Rather than presenting materials as isolated products, the idea was to give each collection a personality, something customers
          could recognise, remember and imagine in their own spaces.
        </p>
      </Reveal>
    </>
  );

  return (
    <section id="about" className="scroll-mt-16">
      {/* Desktop — pinned fan */}
      <div ref={ref} className="relative hidden h-[240vh] md:block">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[calc(var(--header-h)+3vh)]">
          <div className="gutter grid grid-cols-12 gap-8">
            <div className="col-span-7">{copy}</div>
            <p className="col-span-4 col-start-9 self-end text-sm leading-relaxed text-muted">
              Five finished editorial boards, each 1200 × 1800 px, built on one shared system. Scroll to spread the collection.
            </p>
          </div>
          <div className="relative mx-auto mt-[4vh] h-[min(44svh,calc(100svh-26rem))] w-full">
            {stories.map((s, i) => (
              <FanBoard key={s.slug} story={s} i={i} progress={scrollYProgress} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — natural reading */}
      <div className="gutter py-[12vh] md:hidden">
        {copy}
        <div className="mt-12 grid grid-cols-2 gap-3">
          {stories.map((s, i) => (
            <RevealImage
              key={s.slug}
              image={s.images.board}
              sizes="50vw"
              parallax={0}
              delay={i * 0.06}
              className={i === 4 ? "col-span-2 mx-auto max-w-[50%]" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
