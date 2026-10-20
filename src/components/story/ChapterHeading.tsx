"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  index: number;
  title: string;
  copy?: string;
  className?: string;
  /** Visually larger title for opening chapters. */
  size?: "headline" | "title";
}

export function ChapterHeading({ index, title, copy, className, size = "headline" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotionSafe();

  return (
    <div ref={ref} className={className}>
      <p className="eyebrow flex items-center gap-4 text-accent-ink">
        <motion.span
          aria-hidden
          className="block h-px w-12 origin-left bg-current"
          initial={{ scaleX: 0 }}
          animate={inView || reduced ? { scaleX: 1 } : undefined}
          transition={reduced ? instant : { duration: 1, ease: ease.inOut }}
        />
        Chapter {String(index).padStart(2, "0")}
      </p>
      <AnimatedHeadline
        as="h2"
        text={title}
        className={cn("display mt-5 max-w-5xl text-balance", size === "title" ? "text-title" : "text-headline")}
      />
      {copy ? (
        <Reveal delay={0.2}>
          <p className="text-lede mt-6 max-w-2xl text-muted">{copy}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
