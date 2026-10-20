"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, Maximize2 } from "lucide-react";
import type { Story } from "@/data/stories";
import { RevealImage } from "@/components/motion/RevealImage";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { BoardViewer } from "@/components/boards/BoardViewer";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Shared anatomy of every board (percent positions on the 1200 × 1800 frame). */
export const boardAnatomy = [
  { x: 33, y: 37, title: "Hero application", text: "Establishes the emotion: how the material feels in a lived-in room." },
  { x: 81, y: 39, title: "Tile sample", text: "Establishes material identity: colour, pattern, scale and finish." },
  { x: 33, y: 64, title: "Supporting scenarios", text: "Establish versatility across rooms and uses." },
  { x: 32, y: 84, title: "Detail imagery", text: "Communicates texture, edge profile and joint." },
  { x: 85, y: 3, title: "Colour strip", text: "Enables quick collection recognition, even from across a showroom." },
];

/** "From Exploration to Composition" — the original board as the story's outcome. */
export function BoardPreview({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotionSafe();
  const [hover, setHover] = useState<number | null>(null);
  const [viewer, setViewer] = useState<number | null>(null);

  return (
    <section className="gutter border-t hairline py-[14vh]" aria-labelledby="board-heading">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-accent-ink">The original board</p>
          <AnimatedHeadline id="board-heading" text="From Exploration to Composition" className="display text-headline mt-5" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Everything above was unpacked from this single 1200 × 1800 editorial page. Each zone of the board has one job:
            </p>
          </Reveal>
          <ol className="mt-8 border-t hairline" onMouseLeave={() => setHover(null)}>
            {boardAnatomy.map((a, i) => (
              <li
                key={a.title}
                className="grid grid-cols-[2rem_1fr] gap-2 border-b hairline py-3"
                onMouseEnter={() => setHover(i)}
              >
                <span className={cn("eyebrow pt-0.5 tabular-nums transition-colors", hover === i ? "text-accent-ink" : "text-muted")}>
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-muted"> — {a.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setViewer(0)}
              className="eyebrow inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-bg transition-colors hover:bg-accent-ink"
            >
              <Maximize2 size={14} aria-hidden /> Inspect board
            </button>
            <a
              href={story.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow group inline-flex h-12 items-center gap-2 rounded-full border border-current/25 px-6"
            >
              View Original Figma Board <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div ref={ref} className="lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto max-w-[540px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]">
            <button type="button" onClick={() => setViewer(0)} className="block w-full" aria-label={`Inspect ${story.images.board.alt}`}>
              <RevealImage image={story.images.board} style={story.motion} sizes="540px" parallax={0} capWidth={false} />
            </button>
            {boardAnatomy.map((a, i) => (
              <motion.span
                key={a.title}
                aria-hidden
                className={cn(
                  "pointer-events-none absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-semibold tabular-nums shadow-lg transition-colors",
                  hover === i ? "bg-accent-ink text-bg" : "bg-bg text-ink",
                )}
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView || reduced ? { opacity: 1, scale: hover === i ? 1.25 : 1 } : undefined}
                transition={reduced ? instant : { duration: 0.5, ease: ease.out, delay: hover === null ? 1 + i * 0.12 : 0 }}
              >
                {i + 1}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
      <BoardViewer boards={[story]} index={viewer} onIndex={setViewer} />
    </section>
  );
}
