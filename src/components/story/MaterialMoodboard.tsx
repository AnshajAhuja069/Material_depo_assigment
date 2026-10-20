"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { Story } from "@/data/stories";
import { RevealImage } from "@/components/motion/RevealImage";
import { Reveal } from "@/components/motion/Reveal";
import { kindLabel, maxDisplayWidth } from "@/lib/images";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Interactive material board derived from the Figma composition. Hotspots and
 * the material list stay in sync, so it works by hover, tap or keyboard.
 */
export function MaterialMoodboard({ story }: { story: Story }) {
  const [active, setActive] = useState<number | null>(null);
  const image = story.images.moodboard;
  const cap = maxDisplayWidth(image);

  return (
    <div className="grid items-start gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="relative mx-auto" style={{ maxWidth: cap }}>
          <RevealImage image={image} style={story.motion} sizes="(min-width: 1024px) 56vw, 100vw" parallax={0} />
          <ul className="absolute inset-0" aria-label="Material hotspots">
            {story.hotspots.map((h, i) => {
              const on = active === i;
              return (
                <li key={h.label} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <button
                    type="button"
                    aria-label={h.label}
                    aria-pressed={on}
                    onClick={() => setActive(on ? null : i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "relative -translate-x-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border transition-all duration-300",
                      on
                        ? "scale-110 border-transparent bg-accent-ink text-bg"
                        : "border-white/70 bg-black/25 text-white backdrop-blur-sm hover:bg-black/40",
                    )}
                  >
                    <Plus size={16} aria-hidden className={cn("transition-transform duration-300", on && "rotate-45")} />
                    {!on ? <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-white/40 [animation-duration:2.6s]" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
          <AnimatePresence>
            {active !== null ? (
              <motion.div
                key={active}
                role="status"
                className="pointer-events-none absolute z-10 max-w-[220px] bg-bg px-4 py-3 text-ink shadow-xl"
                style={{
                  left: `clamp(8px, calc(${story.hotspots[active].x}% - 110px), calc(100% - 228px))`,
                  top: `calc(${story.hotspots[active].y}% + 26px)`,
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3, ease: ease.out }}
              >
                <p className="eyebrow">{story.hotspots[active].label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{story.hotspots[active].note}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <p className="mx-auto mt-3 text-[11px] tracking-wide text-muted" style={{ maxWidth: cap }}>
          {kindLabel[image.kind]} · {story.moodboardOnBoard ? "From the original Figma board" : "From the Figma canvas"}
        </p>
      </div>

      <Reveal className="lg:col-span-5">
        <p className="eyebrow text-muted">The pairing</p>
        <p className="display mt-3 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">{story.pairing}</p>
        <ol className="mt-8 border-t hairline" onMouseLeave={() => setActive(null)}>
          {story.hotspots.map((h, i) => (
            <li key={h.label} className="border-b hairline">
              <button
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
                className="grid w-full grid-cols-[2rem_1fr] items-baseline gap-2 py-3 text-left"
              >
                <span className={cn("eyebrow tabular-nums transition-colors", active === i ? "text-accent-ink" : "text-muted")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className={cn("block transition-transform duration-300", active === i && "translate-x-1")}>{h.label}</span>
                  <span
                    className={cn(
                      "grid text-sm text-muted transition-all duration-300",
                      active === i ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">{h.note}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-relaxed text-muted">{story.moodboardNote}</p>
      </Reveal>
    </div>
  );
}
