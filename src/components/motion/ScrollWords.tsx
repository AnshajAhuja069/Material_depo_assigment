"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ElementType } from "react";
import { useReducedMotionSafe } from "@/components/motion/hooks";

function Word({ word, range, progress, dim }: { word: string; range: [number, number]; progress: MotionValue<number>; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

/**
 * Scroll-linked reading: words brighten in sequence as the passage moves
 * through the viewport. Static and fully legible under reduced motion.
 */
export function ScrollWords({
  text,
  as: Tag = "p",
  className,
  dim = 0.16,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  dim?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={i}>
            {reduced ? w : <Word word={w} range={[start, end]} progress={scrollYProgress} dim={dim} />}
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}
