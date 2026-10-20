"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { ease } from "@/lib/motion";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  as?: "div" | "li" | "p" | "section";
}

/** Quiet fade-and-rise for supporting copy and UI. */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, duration = 0.9, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotionSafe();
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={inView || reduced ? { opacity: 1, y: 0, x: 0 } : undefined}
      transition={reduced ? instant : { duration, ease: ease.out, delay }}
    >
      {children}
    </Comp>
  );
}
