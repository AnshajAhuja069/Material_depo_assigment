"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { Story } from "@/data/stories";
import { getMaterial } from "@/data/materials";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { SampleImage } from "@/components/curation/SampleImage";
import { BoardViewer } from "@/components/boards/BoardViewer";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { signatureColor } from "@/data/stories";

/**
 * A live, data-built draft of the revised whole-home board (2:3), shown until
 * the corrected Figma board is supplied via `home.revisedBoard`.
 */
function BoardDraft({ story }: { story: Story }) {
  const { home } = useHomeSelection();
  const [hero, a, b] = home.rooms;
  return (
    <div className="@container relative aspect-[2/3] w-full overflow-hidden bg-white text-[#151515] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex justify-end gap-[1.6cqw] px-[4cqw]">
        {story.palette.map((p) => (
          <span key={p.hex} className="block h-[7cqw] w-[3.6cqw]" style={{ background: p.hex }} />
        ))}
      </div>
      <div className="px-[4cqw] pt-[3cqw]">
        <p className="font-semibold uppercase leading-none tracking-tight" style={{ fontSize: "5.2cqw" }}>
          <span style={{ color: signatureColor(story) }}>{story.number}</span> — {story.title}
        </p>
        <p className="mt-[1.4cqw] italic opacity-70" style={{ fontSize: "2.4cqw" }}>
          {home.name} · {story.subtitle}
        </p>
      </div>
      <div className="mx-[4cqw] mt-[3cqw] grid grid-cols-3 gap-[1.5cqw]" style={{ height: "44%" }}>
        <div className="relative col-span-2 row-span-2">
          <Image src={hero.image.src} alt="" fill sizes="400px" className="object-cover" />
          <span className="absolute bottom-[1cqw] left-[1cqw] bg-white/90 px-[1cqw] font-semibold uppercase" style={{ fontSize: "1.6cqw" }}>{hero.name}</span>
        </div>
        {[a, b].map((r) => (
          <div key={r.id} className="relative">
            <Image src={r.image.src} alt="" fill sizes="200px" className="object-cover" />
            <span className="absolute bottom-[1cqw] left-[1cqw] bg-white/90 px-[1cqw] font-semibold uppercase" style={{ fontSize: "1.6cqw" }}>{r.name}</span>
          </div>
        ))}
      </div>
      <p className="mx-[4cqw] mt-[3cqw] font-semibold uppercase tracking-[0.18em] opacity-60" style={{ fontSize: "1.7cqw" }}>
        Material collection
      </p>
      <div className="mx-[4cqw] mt-[1.2cqw] grid gap-[1.5cqw]" style={{ gridTemplateColumns: `repeat(${home.materials.length}, minmax(0,1fr))` }}>
        {home.materials.map((c) => {
          const m = getMaterial(c.material);
          return (
            <div key={c.material}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <SampleImage material={m} sizes="90px" height={240} />
              </div>
              <p className="mt-[0.8cqw] font-semibold leading-tight" style={{ fontSize: "1.45cqw" }}>{m.code ?? "Concept"}</p>
              <p className="leading-tight opacity-60" style={{ fontSize: "1.3cqw" }}>{m.name}</p>
            </div>
          );
        })}
      </div>
      <p className="absolute bottom-[3cqw] left-[4cqw] right-[4cqw] leading-snug opacity-70" style={{ fontSize: "1.7cqw" }}>
        {home.rationale[0]?.text}
      </p>
    </div>
  );
}

/** Section G — From Material Selection to Visual Composition. */
export function MoodboardSection({ story }: { story: Story }) {
  const { home } = useHomeSelection();
  const reduced = useReducedMotionSafe();
  const [viewer, setViewer] = useState<number | null>(null);

  return (
    <section className="gutter border-t hairline py-[14vh]" aria-labelledby="moodboard-heading">
      <div className="grid items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-accent-ink">The moodboard</p>
          <AnimatedHeadline id="moodboard-heading" text="From Material Selection to Visual Composition" className="display text-headline mt-5" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              The physical board condenses the home onto one 2:3 page: the hero room, two supporting rooms, the full material collection with
              product codes, and the colour strip that identifies the collection from across a showroom.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {home.revisedBoard
                ? "Shown here: the revised whole-home board."
                : "The revised Figma board is being rebuilt from this specification. Until it is ready, the draft opposite is generated live from the same data, so it is always accurate to the curation."}
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-12 border-t hairline pt-8">
            <p className="eyebrow text-muted">Initial visual exploration</p>
            <div className="mt-4 flex gap-5">
              <button
                type="button"
                onClick={() => setViewer(0)}
                className="group relative aspect-[2/3] w-28 shrink-0 overflow-hidden shadow-lg"
                aria-label={`Inspect the initial exploration board for ${story.title}`}
              >
                <Image src={story.images.board.src} alt={story.images.board.alt} fill sizes="112px" className="object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                  <Maximize2 size={16} aria-hidden />
                </span>
              </button>
              <div className="text-sm leading-relaxed text-muted">
                <p>
                  The first round of boards explored a single anchor tile per story. They are kept here as process. The whole-home curation above
                  supersedes them.
                </p>
                <a href={story.figmaUrl} target="_blank" rel="noopener noreferrer" className="eyebrow link-line mt-3 inline-flex items-center gap-1 py-1 text-ink">
                  Original Figma frame <ArrowUpRight size={12} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="mx-auto w-full max-w-[520px] lg:col-span-6 lg:col-start-7"
          initial={{ opacity: 0, y: 60, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={reduced ? instant : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {home.revisedBoard ? (
            <div className="relative aspect-[2/3]">
              <Image src={home.revisedBoard.src} alt={home.revisedBoard.alt} fill sizes="520px" className="object-cover" />
            </div>
          ) : (
            <BoardDraft story={story} />
          )}
          <p className="mt-3 text-[11px] text-muted">
            {home.revisedBoard ? "Revised Figma board" : "Live draft of the revised 2:3 board, composed from this page's data. Not the final Figma artwork."}
          </p>
        </motion.div>
      </div>
      <BoardViewer boards={[story]} index={viewer} onIndex={setViewer} />
    </section>
  );
}
