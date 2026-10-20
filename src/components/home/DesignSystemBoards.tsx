"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { signatureColor, stories } from "@/data/stories";
import { site } from "@/data/site";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { BoardViewer } from "@/components/boards/BoardViewer";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { ease } from "@/lib/motion";

const decisions = [
  {
    title: "Consistent editorial structure",
    text: "A shared typography system, white canvas, predictable image hierarchy and aligned margins create cohesion across all five collections.",
  },
  {
    title: "Colour-coded navigation",
    text: "Five palettes give each collection a recognisable visual signature, helping distinguish physical displays in a showroom.",
  },
  {
    title: "Lifestyle-first storytelling",
    text: "Room images show how a material family feels in context. The revision expands this from one room to three rooms per home.",
  },
  {
    title: "Material credibility",
    text: "Codes, dimensions, finishes and listed uses for every curated material connect the story to a real selection process.",
  },
  {
    title: "Physical and digital continuity",
    text: "The same visual identity translates between printed design concepts and responsive web experiences, as this site demonstrates.",
  },
];

/** Scene 07 — the actual five-board system, inspectable frame by frame. */
export function DesignSystemBoards() {
  const [viewer, setViewer] = useState<number | null>(null);
  const reduced = useReducedMotionSafe();

  return (
    <section id="boards" className="gutter scroll-mt-16 border-t hairline py-[14vh]" aria-labelledby="boards-heading">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow text-muted">Initial visual exploration</p>
          <AnimatedHeadline id="boards-heading" text="Where the Stories Began" className="display text-title mt-4" />
        </div>
        <Reveal className="self-end lg:col-span-4">
          <p className="leading-relaxed text-muted">
            The first round of boards studied one anchor tile per story. That exploration became the seed of each home&apos;s palette, and the whole-home curation now supersedes it. The boards are kept here as process.
          </p>
          <a
            href={site.figmaFile}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow group mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-current/25 px-6 transition-colors hover:bg-ink hover:text-bg"
          >
            Open the complete Figma file <ArrowUpRight size={14} aria-hidden />
          </a>
        </Reveal>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-5">
        {stories.map((s, i) => (
          <motion.li
            key={s.slug}
            className={i === 4 ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:mx-0 md:w-full" : undefined}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={reduced ? instant : { duration: 1, ease: ease.out, delay: i * 0.08 }}
          >
            <button
              type="button"
              onClick={() => setViewer(i)}
              className="group block w-full text-left"
              aria-label={`Inspect board ${s.number} — ${s.title}`}
            >
              <span className="relative block aspect-[2/3] overflow-hidden shadow-[0_24px_50px_-24px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3">
                <Image src={s.images.board.src} alt={s.images.board.alt} fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/25 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="eyebrow inline-flex items-center gap-2 bg-white px-3 py-2 text-black">
                    <Maximize2 size={12} aria-hidden /> Inspect
                  </span>
                </span>
              </span>
              <span className="mt-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5" style={{ background: signatureColor(s) }} aria-hidden />
                <span className="eyebrow tabular-nums text-muted">{s.number}</span>
                <span className="truncate text-sm">{s.title}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <p className="eyebrow mt-24 text-muted">What carries forward into the revised whole-home boards</p>
      <ol className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {decisions.map((d, i) => (
          <Reveal as="li" key={d.title} delay={(i % 3) * 0.08} className="border-t hairline pt-5">
            <p className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight">{d.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{d.text}</p>
          </Reveal>
        ))}
      </ol>

      <BoardViewer boards={stories} index={viewer} onIndex={setViewer} />
    </section>
  );
}
