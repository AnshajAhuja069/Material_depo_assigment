"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Story } from "@/data/stories";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/cn";

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;
}

/** The colour strip from the board, expanded into an inspectable palette. */
export function MaterialPalette({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotionSafe();
  const [focus, setFocus] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const t = motionTokens[story.motion];

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable — the hex is visible anyway */
    }
  };

  return (
    <div ref={ref}>
      <div className="flex h-44 gap-1.5 sm:h-56 sm:gap-2" onMouseLeave={() => setFocus(null)}>
        {story.palette.map((s, i) => {
          const light = isLight(s.hex);
          return (
            <motion.button
              key={s.hex}
              type="button"
              onClick={() => copy(s.hex)}
              onMouseEnter={() => setFocus(i)}
              onFocus={() => setFocus(i)}
              onBlur={() => setFocus(null)}
              aria-label={`${s.name}, ${s.hex}. Copy hex value`}
              className={cn(
                "relative flex min-w-0 origin-bottom flex-col justify-end overflow-hidden p-2 text-left transition-[flex-grow] duration-500 sm:p-4",
                focus === i ? "grow-[2.2]" : "grow",
                light ? "text-[#1b1b1b]" : "text-white",
              )}
              style={{ background: s.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)", flexBasis: 0 }}
              initial={{ scaleY: 0 }}
              animate={inView || reduced ? { scaleY: 1 } : undefined}
              transition={reduced ? instant : { duration: t.duration * 0.8, ease: t.ease, delay: i * t.stagger }}
            >
              <span className="eyebrow hidden truncate sm:block">{s.name}</span>
              <span className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase sm:text-xs">
                {copied === s.hex ? <Check size={12} aria-hidden /> : <Copy size={12} aria-hidden className="hidden opacity-60 sm:block" />}
                {copied === s.hex ? "Copied" : s.hex}
              </span>
            </motion.button>
          );
        })}
      </div>
      <ul className="mt-3 grid grid-cols-5 gap-1.5 sm:hidden" aria-hidden>
        {story.palette.map((s) => (
          <li key={s.hex} className="truncate text-[10px] leading-tight text-muted">
            {s.name}
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {copied ? `Copied ${copied}` : ""}
      </p>
    </div>
  );
}
