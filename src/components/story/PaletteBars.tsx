"use client";

import { motion } from "motion/react";
import type { Swatch } from "@/data/stories";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";

/**
 * The boards' signature: five colour bars hanging from the top edge.
 * Used as the quick-recognition device across web and physical display.
 */
export function PaletteBars({ palette, className, delay = 0.2 }: { palette: Swatch[]; className?: string; delay?: number }) {
  const reduced = useReducedMotionSafe();
  return (
    <div className={cn("flex gap-2 sm:gap-3", className)} role="img" aria-label={`Palette: ${palette.map((p) => p.name).join(", ")}`}>
      {palette.map((s, i) => (
        <motion.span
          key={s.hex}
          className="block h-16 w-5 origin-top sm:h-24 sm:w-8 lg:h-28 lg:w-10"
          style={{ background: s.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={reduced ? instant : { duration: 1.1, ease: ease.expo, delay: delay + i * 0.07 }}
        />
      ))}
    </div>
  );
}
