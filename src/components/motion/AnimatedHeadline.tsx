"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useRef, type ElementType } from "react";
import { ease as easings } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** Split by "word" (default) or by explicit lines separated with "\n". */
  split?: "word" | "line";
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: [number, number, number, number];
  /** Animate on mount rather than when scrolled into view. */
  immediate?: boolean;
  id?: string;
}

/**
 * Editorial mask-up reveal: every word (or line) rises from behind its own
 * clipping mask. Text stays real text for screen readers and search.
 */
export function AnimatedHeadline({
  text,
  as: Tag = "h2",
  className,
  split = "word",
  delay = 0,
  stagger = 0.06,
  duration = 1,
  ease = easings.expo,
  immediate = false,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotionSafe();
  const show = immediate || inView;

  const parts = split === "line" ? text.split("\n") : text.split(" ");

  return (
    <Tag ref={ref} className={className} id={id}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          <span className={cn("overflow-hidden pb-[0.14em] -mb-[0.14em] align-top", split === "line" ? "block" : "inline-block")}>
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              animate={show || reduced ? { y: "0%" } : undefined}
              transition={reduced ? instant : { duration, ease, delay: delay + i * stagger }}
            >
              {part}
            </motion.span>
          </span>
          {split === "word" && i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
